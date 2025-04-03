import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	base: '/react-todo-list-poc/',
	plugins: [react()],
	publicDir: path.resolve(__dirname, "public"),
	build: {
		// distフォルダに出力
		outDir: path.resolve(__dirname, "dist"),
		// 存在しないときはフォルダを作成する
		emptyOutDir: true,
		copyPublicDir: true,
		rollupOptions: {
			// entry pointがあるindex.htmlのパス
			input: {
				"": path.resolve(__dirname, "index.html"),
			},
			// bundle.jsを差し替えする
			output: {
				entryFileNames: "assets/bundle.js",
			},
		},
	},
});