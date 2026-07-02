export interface PdfUploadResponse {
  file_id: string;
  filename: string;
  size_bytes: number;
  page_count: number;
  stored_path: string;
}

export interface PdfMetadata {
  file_id: string;
  filename: string;
  size_bytes: number;
  page_count: number;
  title: string | null;
  author: string | null;
  subject: string | null;
  keywords: string | null;
  creator: string | null;
  producer: string | null;
  creation_date: string | null;
  modification_date: string | null;
  is_encrypted: boolean;
  uploaded_at: string;
}

export interface PdfPageDim {
  page: number;
  width: number;
  height: number;
}

export interface PdfInfoResponse {
  file_id: string;
  filename: string;
  metadata: PdfMetadata;
  page_dimensions: PdfPageDim[];
}

export interface PdfPageText {
  page_number: number;
  text: string;
  char_count: number;
}

export interface PdfTextResponse {
  file_id: string;
  filename: string;
  page_count: number;
  total_chars: number;
  pages: PdfPageText[];
}

export interface PdfImageInfo {
  page_number: number;
  image_index: number;
  width: number;
  height: number;
  format: string;
  saved_path: string;
}

export interface PdfImagesResponse {
  file_id: string;
  filename: string;
  image_count: number;
  images: PdfImageInfo[];
}
