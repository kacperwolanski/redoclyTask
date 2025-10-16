import type { HttpMethod } from "../../../../types/methodType";
import type {
  OpenApiDocument,
  OpenApiResponse,
} from "../../../../types/openApi";
import { ResponseItem } from "./ResponseItem";

type Props = {
  responses: Record<string, OpenApiResponse>;
  resolveRef: <T>(ref: string) => T | null;
  document: OpenApiDocument;
  method: HttpMethod;
  path: string;
};

export function ResponsesParser({
  responses,
  resolveRef,
  document,
  method,
  path,
}: Props) {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h4 style={{ borderBottom: "1px solid #ddd", paddingBottom: "0.3rem" }}>
        Responses
      </h4>

      {Object.entries(responses).map(([code, res]) => (
        <ResponseItem
          key={code}
          code={code}
          response={res}
          resolveRef={resolveRef}
          document={document}
          method={method}
          path={path}
        />
      ))}
    </div>
  );
}
