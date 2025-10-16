import { PathCard } from "./PathCard";
import type { OpenApiDocument } from "../../types/openApi";
import type { HttpMethod } from "../../types/methodType";

interface Props {
  openApi: OpenApiDocument;
}
const PathGroup = ({ openApi }: Props) => {
  return (
    <div>
      {Object.entries(openApi.paths).map(([path, methods]) => (
        <div key={path}>
          <p style={{ fontSize: "30px", fontWeight: 800 }}>{path}</p>
          {Object.entries(methods).map(([method, details]) => (
            <PathCard
              key={method + path}
              method={method.toUpperCase() as HttpMethod}
              path={path}
              details={details}
              document={openApi}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PathGroup;
