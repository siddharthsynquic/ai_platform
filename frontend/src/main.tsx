import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { apiClient } from "@/shared/api/client";
import { installAuthRefresh } from "@/shared/api/auth-refresh";
import "./styles/globals.css";
import "./styles/edifice.css";

installAuthRefresh(apiClient);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
