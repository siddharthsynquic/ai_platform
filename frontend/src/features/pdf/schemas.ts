import { z } from "zod";

const MAX_UPLOAD_MB = 50;

export const uploadSchema = z.object({
  file: z
    .instanceof(File, { message: "PDF file required" })
    .refine((f) => f.type === "application/pdf", "Only PDF files accepted")
    .refine((f) => f.size <= MAX_UPLOAD_MB * 1024 * 1024, `Max ${MAX_UPLOAD_MB} MB`),
});

export type UploadFormValues = z.infer<typeof uploadSchema>;
