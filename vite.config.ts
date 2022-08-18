import reactPlugin from "@vitejs/plugin-react";
import { ProxyOptions, UserConfig } from "vite";

import { resolve } from "path";

const proxy: Record<string, string | ProxyOptions> = {
	"/api": {
		target: "http://localhost:8080",
		changeOrigin: true,
		rewrite: (path) => path.replace(/^\/api/, ""),
	},
	"/socket.io": {
		target: "ws://localhost:8080",
		ws: true,
	},
};

const configuration: UserConfig = {
	plugins: [reactPlugin()],
	build: {
		outDir: "dist/client",
	},
	base: "./",
	resolve: {
		alias: {
			"@client": resolve(__dirname, "client"),
			"@global": resolve(__dirname, "global"),
		},
	},
	server: {
		port: Number(process.env.PORT) || 3000,
		host: true,
		strictPort: true,
		proxy,
	},
	preview: {
		port: Number(process.env.PORT) || 3000,
		host: true,
		strictPort: true,
		proxy,
	},
};

export default configuration;
