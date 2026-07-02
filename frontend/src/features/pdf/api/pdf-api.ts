import { apiClient, unwrap } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/types";
import type {
  PdfImagesResponse,
  PdfInfoResponse,
  PdfTextResponse,
  PdfUploadResponse,
} from "../types";

export const pdfApi = {
  upload(file: File, onProgress?: (percent: number) => void): Promise<PdfUploadResponse> {
    const form = new FormData();
    form.append("file", file);
    return apiClient
      .post<ApiResponse<PdfUploadResponse>>("/pdf/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (onProgress && e.total) onProgress(Math.round((e.loaded * 100) / e.total));
        },
      })
      .then(unwrap);
  },

  getInfo(fileId: string): Promise<PdfInfoResponse> {
    return apiClient.get<ApiResponse<PdfInfoResponse>>(`/pdf/${fileId}/info`).then(unwrap);
  },

  getText(fileId: string): Promise<PdfTextResponse> {
    return apiClient.get<ApiResponse<PdfTextResponse>>(`/pdf/${fileId}/text`).then(unwrap);
  },

  getImages(fileId: string): Promise<PdfImagesResponse> {
    return apiClient.get<ApiResponse<PdfImagesResponse>>(`/pdf/${fileId}/images`).then(unwrap);
  },

  delete(fileId: string): Promise<{ file_id: string; deleted: boolean }> {
    return apiClient
      .delete<ApiResponse<{ file_id: string; deleted: boolean }>>(`/pdf/${fileId}`)
      .then(unwrap);
  },
};
