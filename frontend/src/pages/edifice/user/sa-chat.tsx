import { useEffect, useRef, useState } from "react";
import { Send, Loader2, Trash2, MessageSquare, Bot, User } from "lucide-react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { AI_REPLIES } from "@/features/site-agent/mock-data";
import type { ChatMessage } from "@/features/site-agent/mock-data";
import { useSiteData } from "@/features/site-agent/data-source";

export function SaChatPage() {
  const { chatHistory } = useSiteData();
  const [messages, setMessages] = useState<ChatMessage[]>(chatHistory);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(chatHistory);
  }, [chatHistory]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const msg = input.trim();
    if (!msg || sending) return;
    setInput("");
    setSending(true);

    const userMsg: ChatMessage = {
      role: "user",
      text: msg,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const reply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)];
      const aiMsg: ChatMessage = {
        role: "assistant",
        text: reply,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setSending(false);
    }, 800);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <EdifiShell system="site-agent" activeNav="chat" section="user">
      <div
        className="animate-in fade-in flex flex-col"
        style={{ height: "calc(100vh - 220px)" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare size={22} /> AI Assistant
            </h2>
            <p className="text-sm text-gray-400">
              BEM Engineer & Construction Project Management Specialist
            </p>
          </div>
          <button
            onClick={clearChat}
            className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-all"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto rounded-2xl border border-gray-100 bg-gray-50/50 p-4 space-y-3 mb-3">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-4">
                <Bot size={24} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Site Intelligence Assistant</h3>
              <p className="text-sm text-gray-400 max-w-sm">
                Ask about site queries, construction standards, resolution suggestions, or project status.
              </p>
              <div className="flex flex-wrap gap-2 mt-6 justify-center">
                {[
                  "What are the top open issues?",
                  "Summarize site progress",
                  "Any safety concerns?",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full hover:border-black transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={14} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-black text-white rounded-br-md"
                    : "bg-white border border-gray-100 text-gray-800 rounded-bl-md"
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    m.role === "user" ? "text-white/40" : "text-gray-300"
                  }`}
                >
                  {new Date(m.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {m.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <User size={14} className="text-gray-500" />
                </div>
              )}
            </div>
          ))}

          {sending && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shrink-0">
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about site queries, standards, recommendations..."
            disabled={sending}
            className="flex-1 px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={sending || !input.trim()}
            className="p-3 bg-black text-white rounded-xl hover:opacity-80 disabled:opacity-20 transition-all"
          >
            {sending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
      </div>
    </EdifiShell>
  );
}
