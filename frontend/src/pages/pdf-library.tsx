import { PdfUploader } from "@/features/pdf/components/pdf-uploader";

export function PdfLibraryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">PDF Library</h1>
        <p className="text-muted-foreground">
          Upload architectural drawings for extraction + validation.
        </p>
      </div>
      <PdfUploader />
      {/* TODO: <PdfList /> once GET /pdf?list endpoint exists */}
    </div>
  );
}
