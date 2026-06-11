import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

type Message = {
  sender: "user" | "ai";
  text: string;
  createdAt?: string;
};

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem("sessionId")
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionId) return;

  const loadHistory = async () => {
  try {
const response = await axios.get(
  `${API_URL}/chat/${sessionId}`
);

    setMessages(
      response.data.map(
        (msg: {
          sender: "user" | "ai";
          text: string;
        }) => ({
          sender: msg.sender,
          text: msg.text,
        })
      )
    );
  } catch (error) {
    console.error(error);
  }
};

    loadHistory();
  }, [sessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendAiReq = async () => {
    if (!message.trim() || loading) return;

    try {
      setLoading(true);

      const userMessage = message;

      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          text: userMessage,
        },
      ]);

      setMessage("");

      const response = await axios.post(
        `${API_URL}/chat/message`,
        {
          message: userMessage,
          sessionId,
        }
      );

      if (!sessionId) {
        localStorage.setItem(
          "sessionId",
          response.data.conversationId
        );

        setSessionId(
          response.data.conversationId
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

return (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      background: "#f5f7fb",
      padding: "20px",
      boxSizing: "border-box",
      fontFamily: "Inter, Arial, sans-serif",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "1000px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>
            Spur Support Assistant
          </h1>

          <p
            style={{
              margin: "4px 0",
              color: "#666",
            }}
          >
            Customer support powered by AI
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("sessionId");
            setSessionId(null);
            setMessages([]);
          }}
          style={{
            padding: "10px 14px",
            border: "none",
            borderRadius: "8px",
            background: "#ef4444",
            color: "white",
            cursor: "pointer",
          }}
        >
          New Chat
        </button>
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          background: "white",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "#666",
            }}
          >
<div
  style={{
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  }}
>
  <h2>👋 Hi! How can I help you today?</h2>

  <p>Ask me about our store policies.</p>

  <div
    style={{
      display: "grid",
      gap: "12px",
      marginTop: "24px",
      width: "100%",
      maxWidth: "500px",
    }}
  >
    {[
      "What is your shipping policy?",
      "How do returns work?",
      "When will I receive my refund?",
      "What are your support hours?",
    ].map((question) => (
      <button
        key={question}
        onClick={() => setMessage(question)}
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          background: "white",
          cursor: "pointer",
        }}
      >
        {question}
      </button>
    ))}
  </div>
</div>

          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "12px 16px",
                    borderRadius: "14px",
                    background:
                      msg.sender === "user"
                        ? "#2563eb"
                        : "#f3f4f6",
                    color:
                      msg.sender === "user"
                        ? "white"
                        : "#111827",
                  }}
                >
                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div
                style={{
                  marginTop: "8px",
                }}
              >
                🤖 Agent is typing...
              </div>
            )}

            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "16px",
        }}
      >
        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendAiReq();
            }
          }}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            fontSize: "16px",
          }}
        />

        <button
          onClick={sendAiReq}
          disabled={loading}
          style={{
            padding: "14px 22px",
            borderRadius: "10px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  </div>
);
}

export default App;