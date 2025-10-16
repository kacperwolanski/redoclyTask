import type { HttpMethod } from "../../types/methodType";
import type {
  OpenApiDocument,
  OpenApiPathMethod,
  OpenApiParameter,
  OpenApiResponse,
} from "../../types/openApi";
import { ParametersParser } from "./components/ParametersParser";
import { ResponsesParser } from "./components/response/ResponsesParser";

type Props = {
  method: HttpMethod;
  path: string;
  details: OpenApiPathMethod;
  document: OpenApiDocument;
};

export function PathCard({ method, path, details, document }: Props) {
  const resolveRef = (ref: string) => {
    if (!ref.startsWith("#/")) return null;

    const pathParts = ref.replace(/^#\//, "").split("/");
    let current: any = document;

    for (const part of pathParts) {
      current = current?.[part];
      if (!current) return null;
    }

    return current;
  };

  const params: OpenApiParameter[] = (details?.parameters || [])
    .map((param) => {
      if ("$ref" in param) {
        const resolved = resolveRef(param.$ref) as OpenApiParameter | null;
        return resolved ?? ({} as OpenApiParameter);
      }
      return param;
    })
    .filter((p) => !!p.name);

  const responses: Record<string, OpenApiResponse> = {};

  Object.entries(details?.responses || {}).forEach(([code, res]) => {
    if ("$ref" in res) {
      const resolved = resolveRef(res.$ref) as OpenApiResponse | null;

      if (resolved) responses[code] = resolved;
    } else {
      responses[code] = res;
    }
  });

  return (
    <div
      style={{
        border: "1px solid #cccccc6a",
        margin: "20px 0",
        padding: "20px",
        borderRadius: "11px",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>
        <span
          style={{
            color: method.toLowerCase() === "get" ? "green" : "blue",
            fontWeight: 600,
          }}
        >
          {method.toUpperCase()}
        </span>{" "}
        {path}
      </h3>

      {details?.summary && (
        <p style={{ margin: "10px 0" }}>
          <b>{details.summary}</b>
        </p>
      )}
      {details?.description && (
        <p style={{ margin: "10px 0 5px 0" }}>{details?.description}</p>
      )}

      {params.length > 0 && <ParametersParser params={params} />}
      {Object.keys(responses).length > 0 && (
        <ResponsesParser
          responses={responses}
          resolveRef={resolveRef}
          document={document}
          method={method as HttpMethod}
          path={path}
        />
      )}
    </div>
  );
}
