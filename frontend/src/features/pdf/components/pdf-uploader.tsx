import { useCallback, useState } from "react";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUploadPdf } from "../api/pdf-queries";
import { uploadSchema } from "../schemas";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { formatBytes } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import { toast } from "sonner";

export function PdfUploader() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const upload = useUploadPdf(setProgress);

  const handleFile = useCallback(
    (file: File) => {
      const parsed = uploadSchema.safeParse({ file });
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? "Invalid file");
        return;
      }
      upload.mutate(file, {
        onSuccess: (data) => navigate(`/pdf/${data.file_id}`),
      });
    },
    [upload, navigate],
  );

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload PDF</CardTitle>
      </CardHeader>
      <CardContent>
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-10 transition-colors",
            dragging ? "border-primary bg-accent" : "border-input hover:border-primary/60",
          )}
        >
          <UploadCloud className="h-10 w-10 text-muted-foreground" />
          <div className="text-center">
            <p className="text-sm font-medium">Drop a PDF here or click to select</p>
            <p className="text-xs text-muted-foreground">Max 50 MB</p>
          </div>
          <input type="file" accept="application/pdf" onChange={onInput} className="hidden" />
        </label>

        {upload.isPending && (
          <div className="mt-4 space-y-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">Uploading {progress}%</p>
          </div>
        )}

        {upload.isSuccess && upload.data && (
          <div className="mt-4 rounded-md bg-muted p-3 text-sm">
            <p className="font-medium">{upload.data.filename}</p>
            <p className="text-xs text-muted-foreground">
              {upload.data.page_count} pages · {formatBytes(upload.data.size_bytes)}
            </p>
          </div>
        )}

        <div className="mt-4">
          <Button variant="outline" disabled={upload.isPending}>
            Choose file
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
