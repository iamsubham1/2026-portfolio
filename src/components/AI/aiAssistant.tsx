"use client";

import { useEffect, useState, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { X, Send } from "lucide-react";

export function AIAssistant() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<
        { role: "user" | "assistant"; content: string }[]
    >([
        {
            role: "assistant",
            content:
                "👋 Hi! I'm Subham's AI assistant.\n\nAsk me about my projects, experience, tech stack, resume or contact.",
        },
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const history = [
        ...messages,
        {
            role: "user",
            content: message,
        },
    ];
    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();

        const text = message.trim();

        if (!text || loading) return;

        const history = [
            ...messages,
            {
                role: "user" as const,
                content: text,
            },
        ];

        setMessages(history);
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: history,
                }),
            });

            if (!res.ok) {
                throw new Error("Request failed");
            }

            const data = await res.json();

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: data.message,
                },
            ]);
        } catch {
            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, something went wrong.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages, loading]);

    useEffect(() => {
        if (open && !loading) {
            inputRef.current?.focus();
        }
    }, [open, loading]);


    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(true)}
                aria-label="Open AI Assistant"
                className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 transition-transform hover:scale-105 active:scale-95 text-xs"
            >
                <DotLottieReact
                    src="https://lottie.host/004c4dbd-433b-41c5-84c4-9484724780b8/xPhZoxx17e.lottie"
                    loop
                    autoplay
                    style={{
                        width: "clamp(60px, 10vw, 90px)",
                        height: "clamp(60px, 10vw, 90px)",
                    }}
                />
                Ai Assistant
            </button>

            {open && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Chat Window */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="
        fixed z-[100]
        inset-0
        md:inset-auto
        md:bottom-6
        md:right-6
        w-full
        md:w-[420px]
        h-full
        md:h-[700px]
        md:max-h-[85vh]
        bg-[var(--card)]
        text-[var(--fg)]
        rounded-none
        md:rounded-3xl
        border border-[var(--border)]
        shadow-2xl
        flex flex-col
      "
                    >
                        {/* Header */}
                        <header className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                            <div>
                                <h2 className="text-lg font-semibold text-[var(--fg)]">
                                    AI Assistant
                                </h2>

                                <p className="text-sm text-[var(--muted)]">
                                    Ask me anything about this portfolio.
                                </p>
                            </div>

                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-full p-2 transition hover:bg-[var(--bg)]"
                            >
                                <X className="h-5 w-5 text-[var(--muted)]" />
                            </button>
                        </header>

                        {/* Messages */}
                        <div
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                            className="flex-1 overflow-y-auto overscroll-contain bg-[var(--bg)] p-5">
                            <div className="space-y-4">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                            }`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === "user"
                                                ? "bg-[var(--fg)] text-[var(--bg)]"
                                                : "border border-[var(--border)] bg-[var(--card)] text-[var(--fg)]"
                                                }`}
                                        >
                                            <p className="whitespace-pre-wrap text-sm">
                                                {msg.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3">
                                            <div className="flex gap-1">
                                                <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--muted)]" />
                                                <span
                                                    className="h-2 w-2 animate-bounce rounded-full bg-[var(--muted)]"
                                                    style={{ animationDelay: ".2s" }}
                                                />
                                                <span
                                                    className="h-2 w-2 animate-bounce rounded-full bg-[var(--muted)]"
                                                    style={{ animationDelay: ".4s" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={bottomRef} />
                            </div>
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={handleSend}
                            className="border-t border-[var(--border)] bg-[var(--card)] p-4"

                        >
                            <div className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={message}
                                    disabled={loading}

                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Ask something..."
                                    className="
              flex-1
              bg-transparent
              text-[var(--fg)]
              placeholder:text-[var(--muted)]
              outline-none
            "
                                />

                                <button
                                    type="submit"
                                    disabled={loading || !message.trim()}
                                    className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              bg-[var(--fg)]
              text-[var(--bg)]
              transition
              hover:scale-105
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}
