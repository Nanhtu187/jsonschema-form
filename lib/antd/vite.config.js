import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
export default defineConfig({
    plugins: [
        react(),
        libInjectCss(),
        dts({
            include: ["src"],
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "@nanhtu/antd",
            fileName: function (format) { return "index.".concat(format, ".js"); },
        },
        rollupOptions: {
            external: ["react"],
            output: {
                globals: {
                    react: "React",
                },
            },
        },
        minify: true,
    },
});