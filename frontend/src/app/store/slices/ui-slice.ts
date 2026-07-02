import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark" | "system";

interface UiState {
  theme: Theme;
  sidebarOpen: boolean;
  activeProjectId: string | null;
}

const initialState: UiState = {
  theme: "system",
  sidebarOpen: true,
  activeProjectId: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    setActiveProject(state, action: PayloadAction<string | null>) {
      state.activeProjectId = action.payload;
    },
  },
});

export const { setTheme, toggleSidebar, setSidebarOpen, setActiveProject } = uiSlice.actions;
