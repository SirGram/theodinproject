import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/theodinproject/react/digidex/",
  build: {
    outDir: "../../docs/react/digidex",
  },
});
