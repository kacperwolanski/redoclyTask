import type { HttpMethod } from "../../../../types/methodType";
import type { OpenApiDocument } from "../../../../types/openApi";
import { ExamplesBlock } from "./ExamplesBlock";

type Props = {
  contentType: string;
  contentValue: any;
  resolveRef: <T>(ref: string) => T | null;
  document: OpenApiDocument;
  method: HttpMethod;
  path: string;
};

export function ContentBlock({
  contentType,
  contentValue,
  resolveRef,
  document,
  method,
  path,
}: Props) {
  return (
    <div style={{ marginBottom: "0.6rem" }}>
      <div
        style={{
          fontWeight: 600,
          marginBottom: "0.2rem",
        }}
      >
        <span style={{ color: "#626262ff" }}> Body: </span>
        <span style={{ color: "#0070f3" }}>{contentType}</span>
      </div>

      {"examples" in contentValue && contentValue.examples && (
        <ExamplesBlock
          path={path}
          method={method}
          examples={contentValue.examples}
          resolveRef={resolveRef}
          document={document}
        />
      )}
    </div>
  );
}
