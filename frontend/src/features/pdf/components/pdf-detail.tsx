import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDeletePdf, usePdfInfo, usePdfText } from "../api/pdf-queries";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { formatBytes, formatDate, truncate } from "@/shared/lib/format";

interface Props {
  fileId: string;
}

export function PdfDetail({ fileId }: Props) {
  const navigate = useNavigate();
  const info = usePdfInfo(fileId);
  const text = usePdfText(fileId);
  const del = useDeletePdf();
  const [expandedPage, setExpandedPage] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (info.isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (info.isError || !info.data) {
    return <p className="text-destructive">{info.error?.message ?? "Failed to load PDF"}</p>;
  }

  const meta = info.data.metadata;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle>{meta.filename}</CardTitle>
            <CardDescription>
              {meta.page_count} pages · {formatBytes(meta.size_bytes)} · uploaded{" "}
              {formatDate(meta.uploaded_at)}
            </CardDescription>
          </div>
          <Button
            variant="destructive"
            size="sm"
            disabled={del.isPending}
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
            <MetaField label="Title" value={meta.title} />
            <MetaField label="Author" value={meta.author} />
            <MetaField label="Creator" value={meta.creator} />
            <MetaField label="Producer" value={meta.producer} />
          </div>
          <div className="flex gap-2">
            {meta.is_encrypted && <Badge variant="destructive">Encrypted</Badge>}
            <Badge variant="secondary">{info.data.page_dimensions.length} pages</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Extracted Text</CardTitle>
          <CardDescription>
            {text.data ? `${text.data.total_chars.toLocaleString()} characters` : "Loading…"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {text.isLoading && <Skeleton className="h-40 w-full" />}
          {text.data?.pages.map((page) => (
            <button
              key={page.page_number}
              type="button"
              onClick={() =>
                setExpandedPage(expandedPage === page.page_number ? null : page.page_number)
              }
              className="w-full rounded-md border p-3 text-left transition-colors hover:bg-accent"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Page {page.page_number}</span>
                <span className="text-xs text-muted-foreground">{page.char_count} chars</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-xs text-muted-foreground">
                {expandedPage === page.page_number ? page.text : truncate(page.text, 240)}
              </p>
            </button>
          ))}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete PDF?"
        description={`"${meta.filename}" and its extracted assets will be permanently removed.`}
        variant="destructive"
        confirmLabel="Delete"
        loading={del.isPending}
        onConfirm={() =>
          del.mutate(fileId, {
            onSuccess: () => {
              setConfirmOpen(false);
              navigate("/pdf");
            },
          })
        }
      />
    </div>
  );
}

function MetaField({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value ?? "—"}</p>
    </div>
  );
}
