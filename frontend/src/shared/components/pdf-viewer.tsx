import { useState, type ReactNode } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";

// Configure pdf.js worker — bundled by Vite.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface Props {
  /** Absolute URL, blob URL, or Uint8Array of the PDF file. */
  source: string | { data: Uint8Array } | { url: string };
  /** Overlay drawn on top of each rendered page (for pin placement). */
  overlay?: (args: { pageNumber: number; width: number; height: number }) => ReactNode;
  /** Optional click handler — receives normalized 0-1 coords. Useful for placing pins. */
  onPageClick?: (args: { pageNumber: number; xRatio: number; yRatio: number }) => void;
  initialPage?: number;
}

/**
 * Render architectural PDF drawings with page navigation + zoom.
 * Site Agent will drop pins here — see `overlay` + `onPageClick`.
 */
export function PdfViewer({ source, overlay, onPageClick, initialPage = 1 }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(initialPage);
  const [scale, setScale] = useState<number>(1.0);
  const [pageSize, setPageSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border bg-muted/40 p-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm tabular-nums">
            {pageNumber} / {numPages || "—"}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm tabular-nums">{Math.round(scale * 100)}%</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScale((s) => Math.min(3, s + 0.25))}
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative flex justify-center overflow-auto rounded-md border bg-muted/20 p-4">
        <Document
          file={source}
          onLoadSuccess={(d) => setNumPages(d.numPages)}
          loading={<Skeleton className="h-96 w-72" />}
          error={<p className="p-8 text-destructive">Failed to load PDF</p>}
        >
          <div
            className="relative"
            onClick={(e) => {
              if (!onPageClick || !pageSize.width) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const xRatio = (e.clientX - rect.left) / rect.width;
              const yRatio = (e.clientY - rect.top) / rect.height;
              onPageClick({ pageNumber, xRatio, yRatio });
            }}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              onLoadSuccess={(page) =>
                setPageSize({ width: page.width, height: page.height })
              }
            />
            {overlay && pageSize.width > 0 && (
              <div className="pointer-events-none absolute inset-0">
                {overlay({
                  pageNumber,
                  width: pageSize.width * scale,
                  height: pageSize.height * scale,
                })}
              </div>
            )}
          </div>
        </Document>
      </div>
    </div>
  );
}
