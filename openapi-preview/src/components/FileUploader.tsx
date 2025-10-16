type FileUploaderProps = {
  onFileLoaded: (content: string) => void;
};

export function FileUploader({ onFileLoaded }: FileUploaderProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result?.toString() ?? "";
      onFileLoaded(text);
    };
    reader.readAsText(file);
  };

  return (
    <input type="file" accept=".yaml,.yml,.json" onChange={handleFileUpload} />
  );
}
