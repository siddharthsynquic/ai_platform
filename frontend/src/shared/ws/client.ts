/**
 * Lightweight WebSocket client with:
 * - Exponential backoff reconnect
 * - Auth token on connect (via URL query — matches FastAPI ws Depends)
 * - Typed pub/sub over channels
 *
 * Use for: ingestion pipeline progress, Site Agent live dashboard, chatbot streams.
 */

import { env } from "@/env";
import { getAccessToken } from "@/shared/api/client";

export type WsMessage<T = unknown> = { channel: string; event: string; payload: T };
type Listener = (msg: WsMessage) => void;

export interface WsClientOptions {
  path?: string;                  // e.g. "/ws" — appended to derived base
  reconnectBaseMs?: number;
  reconnectMaxMs?: number;
  maxRetries?: number;
}

export class WsClient {
  private socket: WebSocket | null = null;
  private listeners = new Map<string, Set<Listener>>();
  private retries = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private manualClose = false;
  private readonly url: string;
  private readonly opts: Required<WsClientOptions>;

  constructor(options: WsClientOptions = {}) {
    this.opts = {
      path: options.path ?? "/ws",
      reconnectBaseMs: options.reconnectBaseMs ?? 500,
      reconnectMaxMs: options.reconnectMaxMs ?? 15_000,
      maxRetries: options.maxRetries ?? Infinity,
    };
    this.url = this.buildUrl();
  }

  private buildUrl(): string {
    const httpBase = env.VITE_API_BASE_URL.replace(/\/api\/v\d+\/?$/, "");
    const wsBase = httpBase.replace(/^http/, "ws");
    return `${wsBase}${this.opts.path}`;
  }

  connect(): void {
    if (this.socket && this.socket.readyState !== WebSocket.CLOSED) return;
    this.manualClose = false;

    const token = getAccessToken();
    const url = token ? `${this.url}?token=${encodeURIComponent(token)}` : this.url;

    const socket = new WebSocket(url);
    socket.onopen = () => {
      this.retries = 0;
    };
    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data) as WsMessage;
        this.dispatch(msg);
      } catch (err) {
        console.warn("WsClient: malformed message", err);
      }
    };
    socket.onerror = (err) => {
      console.warn("WsClient: error", err);
    };
    socket.onclose = () => {
      this.socket = null;
      if (this.manualClose) return;
      this.scheduleReconnect();
    };

    this.socket = socket;
  }

  private scheduleReconnect(): void {
    if (this.retries >= this.opts.maxRetries) return;
    const delay = Math.min(
      this.opts.reconnectMaxMs,
      this.opts.reconnectBaseMs * 2 ** this.retries,
    );
    this.retries += 1;
    this.reconnectTimer = setTimeout(() => this.connect(), delay);
  }

  send<T>(channel: string, event: string, payload: T): void {
    if (this.socket?.readyState !== WebSocket.OPEN) return;
    this.socket.send(JSON.stringify({ channel, event, payload }));
  }

  subscribe(channel: string, listener: Listener): () => void {
    let set = this.listeners.get(channel);
    if (!set) {
      set = new Set();
      this.listeners.set(channel, set);
    }
    set.add(listener);
    return () => {
      set!.delete(listener);
    };
  }

  private dispatch(msg: WsMessage): void {
    const set = this.listeners.get(msg.channel);
    if (!set) return;
    set.forEach((fn) => fn(msg));
  }

  close(): void {
    this.manualClose = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.socket?.close();
    this.socket = null;
  }
}

// Singleton — most apps only need one connection.
export const wsClient = new WsClient();
