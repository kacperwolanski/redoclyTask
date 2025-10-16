import { useState } from "react";
import type { OpenApiDocument } from "../../../../types/openApi";
import { ApiCallModal } from "../ApiCallModule";
import type { HttpMethod } from "../../../../types/methodType";

type Props = {
  examples: Record<string, any>;
  resolveRef: <T>(ref: string) => T | null;
  document: OpenApiDocument;
  path: string;
  method: HttpMethod;
};

export function ExamplesBlock({ examples, resolveRef, path, method }: Props) {
  const MAX_LENGTH = 300;
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ marginTop: "0.5rem" }}>
      <div
        style={{ fontWeight: 600, marginBottom: "0.3rem", color: "#0070f3" }}
      >
        Examples:
      </div>

      {Object.entries(examples).map(([name, ex]) => {
        let exampleValue = ex;
        if ("$ref" in ex && ex.$ref) {
          const resolved = resolveRef<any>(ex.$ref);
          if (resolved) exampleValue = resolved;
        }

        const jsonString = JSON.stringify(exampleValue.value, null, 2);
        const isLong = jsonString.length > MAX_LENGTH;

        const displayedText =
          !isLong || expanded
            ? jsonString
            : jsonString.slice(0, MAX_LENGTH) + "...";

        return (
          <div
            key={name}
            style={{
              border: "1px solid #80808081",
              borderRadius: "6px",
              padding: "0.5rem 0.8rem",
              marginBottom: "0.4rem",
              color: "#333",
            }}
          >
            <b>{exampleValue.summary ?? name}</b>
            {exampleValue.value && (
              <>
                <pre
                  style={{
                    marginTop: "0.4rem",
                    backgroundColor: "#ffffff2c",
                    padding: "0.6rem",
                    borderRadius: "6px",
                    overflowX: "auto",
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                    border: "1px solid #e0e0e0",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {displayedText}
                </pre>

                <ApiCallModal
                  url={path}
                  method={method}
                  body={method !== "GET" ? exampleValue.value : undefined}
                />

                {isLong && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    style={{
                      marginTop: "0.3rem",
                      background: "none",
                      border: "1px solid #00000049",
                      color: "#000000ff",
                      padding: "5px 10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    {expanded ? "Hide" : "Show more"}
                  </button>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
