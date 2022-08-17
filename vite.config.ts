import { resolve } from "path";
import { ProxyOptions, UserConfig } from "vite";

const proxy: Record<string, string | ProxyOptions> = {
	"/api": {
		target: "http://localhost:8080",
		changeOrigin: true,
		rewrite: (path) => path.replace(/^\/api/, ""),
	},
};

const configuration: UserConfig = {
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
