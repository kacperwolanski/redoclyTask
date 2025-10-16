import { useState } from "react";
import PathGroup from "./components/path/PathGroup.tsx";
import type { OpenApiDocument } from "./types/openApi.ts";
import GeneralInfoParser from "./components/GeneralInfoParser.tsx";
import YAML from "js-yaml";
import { OpenApiEditor } from "./components/OpenApiEditor.tsx";

function App() {
  const [openApi, setOpenApi] = useState<OpenApiDocument | null>(null);

  const handleEditorChange = (text: string) => {
    try {
      const doc = YAML.load(text) as OpenApiDocument;
      setOpenApi(doc);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1500px", margin: "0 auto" }}>
      <div
        style={{
          padding: "2rem",
          backgroundColor: "#1b1b1bff",
          color: "white",
          borderRadius: "15px",
        }}
      >
        <h1>OpenAPI Preview for Redocly by KW</h1>

        <div style={{ marginTop: "1rem" }}>
          <OpenApiEditor onChange={handleEditorChange} />
        </div>
      </div>

      {openApi && (
        <>
          <GeneralInfoParser info={openApi?.info} />
          {openApi.paths && <PathGroup openApi={openApi} />}
        </>
      )}
    </div>
  );
}

export default App;
