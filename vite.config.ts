import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      fileName: "index",
      formats: ["es"],
      name: "CustomDatepicker", // или только 'es' если нужен ESM
    },
    outDir: "dist",
    rollupOptions: {
      external: ["react", "react-dom"], // чтобы не включались в сборку
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  plugins: [react(), dts()],
  server: {
    open: "/playground/index.html",
  },
});
