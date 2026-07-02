import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_API_BASE_URL: z.string().url(),
    VITE_APP_NAME: z.string().default("AI Platform"),
    VITE_APP_ENV: z.enum(["development", "staging", "production"]).default("development"),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
