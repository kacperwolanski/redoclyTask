import { useState } from "react";
import Editor from "@monaco-editor/react";
import { FileUploader } from "./FileUploader";

type Props = {
  onChange: (content: string) => void;
};

export function OpenApiEditor({ onChange }: Props) {
  const [content, setContent] = useState("");
  const [mode, setMode] = useState<"file" | "editor">("file");

  const handleEditorChange = (value: string | undefined) => {
    const newValue = value ?? "";
    setContent(newValue);
    onChange(newValue);
  };

  const handleFileLoaded = (text: string) => {
    setContent(text);
    onChange(text);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        <button
          onClick={() => setMode("file")}
          style={{
            marginRight: "0.5rem",
            padding: "0.4rem 0.8rem",
            backgroundColor: mode === "file" ? "#0070f3" : "#eee",
            color: mode === "file" ? "#fff" : "#333",
            border: "none",
            borderRadius: "5px",
            cursor: mode === "file" ? "default" : "pointer",
          }}
        >
          File uploader
        </button>
        <button
          onClick={() => setMode("editor")}
          style={{
            padding: "0.4rem 0.8rem",
            backgroundColor: mode === "editor" ? "#0070f3" : "#eee",
            color: mode === "editor" ? "#fff" : "#333",
            border: "none",
            borderRadius: "5px",
            cursor: mode === "editor" ? "default" : "pointer",
          }}
        >
          Text editor
        </button>
      </div>

      {mode === "file" && <FileUploader onFileLoaded={handleFileLoaded} />}

      {mode === "editor" && (
        <Editor
          height="400px"
          defaultLanguage="yaml"
          value={content}
          onChange={handleEditorChange}
          theme="vs-light"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
          }}
        />
      )}
    </div>
  );
}
