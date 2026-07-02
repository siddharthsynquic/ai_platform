import { useEffect } from "react";
import { wsClient, type WsMessage } from "./client";

/**
 * React hook — subscribe to a channel while component mounted.
 * Example:
 *   useWsChannel("ingestion:file-123", (msg) => {
 *     if (msg.event === "progress") setProgress(msg.payload.percent);
 *   });
 */
export function useWsChannel<T = unknown>(
  channel: string,
  handler: (msg: WsMessage<T>) => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return;
    wsClient.connect();
    const unsubscribe = wsClient.subscribe(channel, (msg) => handler(msg as WsMessage<T>));
    return unsubscribe;
  }, [channel, handler, enabled]);
}
