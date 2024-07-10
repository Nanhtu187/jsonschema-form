import { defineConfig } from "vite";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), libInjectCss(), dts({ include: ["lib"] })],
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, "lib/main.ts"),
            formats: ["es"],
        },
        rollupOptions: {
            external: ["react", "react/jsx-runtime", "@ant-design/charts"],
            input: Object.fromEntries(glob.sync("lib/**/*.{ts,tsx}").map(function (file) { return [
                // The name of the entry point
                // lib/nested/foo.ts becomes nested/foo
                relative("lib", file.slice(0, file.length - extname(file).length)),
                // The absolute path to the entry file
                // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
                fileURLToPath(new URL(file, import.meta.url)),
            ]; })),
            output: {
                assetFileNames: "assets/[name][extname]",
                entryFileNames: "[name].js",
            },
        },
        copyPublicDir: false,
    },
});
