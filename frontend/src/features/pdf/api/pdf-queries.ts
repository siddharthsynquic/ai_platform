import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/shared/lib/query-keys";
import { pdfApi } from "./pdf-api";

export function usePdfInfo(fileId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.pdf.detail(fileId ?? "none"),
    queryFn: () => pdfApi.getInfo(fileId!),
    enabled: Boolean(fileId),
  });
}

export function usePdfText(fileId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.pdf.text(fileId ?? "none"),
    queryFn: () => pdfApi.getText(fileId!),
    enabled: Boolean(fileId),
  });
}

export function usePdfImages(fileId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.pdf.images(fileId ?? "none"),
    queryFn: () => pdfApi.getImages(fileId!),
    enabled: Boolean(fileId),
  });
}

export function useUploadPdf(onProgress?: (percent: number) => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => pdfApi.upload(file, onProgress),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.pdf.lists() });
      toast.success("PDF uploaded");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Upload failed");
    },
  });
}

export function useDeletePdf() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (fileId: string) => pdfApi.delete(fileId),
    onSuccess: (_, fileId) => {
      qc.invalidateQueries({ queryKey: queryKeys.pdf.all });
      qc.removeQueries({ queryKey: queryKeys.pdf.detail(fileId) });
      toast.success("PDF deleted");
    },
    onError: (err: Error) => toast.error(err.message || "Delete failed"),
  });
}
