import type { HttpMethod } from "../../../../types/methodType";
import type {
  OpenApiDocument,
  OpenApiResponse,
} from "../../../../types/openApi";
import { ContentBlock } from "./ContentBlock";

type Props = {
  code: string;
  response: OpenApiResponse;
  resolveRef: <T>(ref: string) => T | null;
  document: OpenApiDocument;
  method: HttpMethod;
  path: string;
};

export function ResponseItem({
  code,
  response,
  resolveRef,
  document,
  method,
  path,
}: Props) {
  const content = (response as any).content;

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "10px",
        backgroundColor: "#c4c4c4df",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <b style={{ color: "#333" }}>{code}</b>{" "}
        <span style={{ color: "#555" }}>— {response.description}</span>
      </div>
      {content && (
        <div>
          {Object.entries(content).map(([type, value]) => (
            <ContentBlock
              key={type}
              contentType={type}
              contentValue={value}
              resolveRef={resolveRef}
              document={document}
              path={path}
              method={method}
            />
          ))}
        </div>
      )}
    </div>
  );
}
