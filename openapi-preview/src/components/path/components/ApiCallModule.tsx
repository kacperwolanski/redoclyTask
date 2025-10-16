import { useState } from "react";
import { mockURL } from "../../../consts/urls";
import type { HttpMethod } from "../../../types/methodType";

type ApiCallModalProps = {
  url: string;
  method: HttpMethod;
  body?: any;
};

export function ApiCallModal({ url, method, body }: ApiCallModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPath = mockURL + url;

  const handleRun = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch(requestPath, {
        method,
        headers: {
          "Content-Type": "application/json",
        },

        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json().catch(() => ({}));
      setResponse({ status: res.status, data });
    } catch (err: any) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
      setIsOpen(true);
    }
  };

  return (
    <div style={{ marginTop: "0.5rem" }}>
      <button
        onClick={handleRun}
        style={{
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        Run Example
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "1.2rem",
              maxWidth: "600px",
              width: "90%",
              color: "#333",
            }}
          >
            <h3>API respoze</h3>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}> {error}</p>}
            {response && (
              <pre
                style={{
                  background: "#f6f6f6",
                  padding: "0.8rem",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  overflowX: "auto",
                }}
              >
                {JSON.stringify(response, null, 2)}
              </pre>
            )}

            <button
              onClick={() => setIsOpen(false)}
              style={{
                marginTop: "1rem",
                backgroundColor: "#ccc",
                border: "none",
                borderRadius: "8px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              quit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
