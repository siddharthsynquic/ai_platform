import { useParams } from "react-router-dom";
import { PdfDetail } from "@/features/pdf/components/pdf-detail";

export function PdfDetailPage() {
  const { fileId } = useParams<{ fileId: string }>();
  if (!fileId) return <p>Invalid file id</p>;

  return (
    <div className="space-y-4">
      <PdfDetail fileId={fileId} />
    </div>
  );
}
