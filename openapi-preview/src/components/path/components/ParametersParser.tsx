import type { OpenApiParameter } from "../../../types/openApi";

type Props = {
  params: OpenApiParameter[];
};

export function ParametersParser({ params }: Props) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <h4
        style={{ borderBottom: "1px solid #dddddd65", paddingBottom: "0.3rem" }}
      >
        Parameters
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {params.map((p, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #dadada48",
              borderRadius: "8px",
              padding: "0.75rem",
              backgroundColor: "#1212122f",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                marginBottom: "0.3rem",
              }}
            >
              {p.name}{" "}
              <span style={{ color: "#b9b9b9ff", fontWeight: 400 }}>
                ({p.schema?.type ?? "unknown"})
              </span>
              {p.required && <span style={{ color: "red" }}> *</span>}
            </div>
            {p.description && (
              <div style={{ color: "#ffffffff", marginBottom: "0.4rem" }}>
                {p.description}
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginTop: "0.5rem",
              }}
            >
              {p.schema?.default !== undefined && (
                <div>
                  <div style={{ fontSize: "0.85rem", color: "#555" }}>
                    dfeault:
                  </div>
                  <div
                    style={{
                      backgroundColor: "#171717ff",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "0.3rem 0.6rem",
                      fontFamily: "monospace",
                      display: "inline-block",
                    }}
                  >
                    {String(p.schema.default)}
                  </div>
                </div>
              )}
              {p.schema?.example !== undefined && (
                <div>
                  <div style={{ fontSize: "0.85rem", color: "#555" }}>
                    example:
                  </div>
                  <div
                    style={{
                      backgroundColor: "#121212ff",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "0.3rem 0.6rem",
                      fontFamily: "monospace",
                      display: "inline-block",
                    }}
                  >
                    {String(p.schema.example)}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
