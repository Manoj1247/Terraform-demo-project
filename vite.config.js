import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import path from "path";
import laravel from 'laravel-vite-plugin';

export default ({mode}) => {
    const env = loadEnv(mode, process.cwd(), "");
    const isDev = mode === 'development';
    const resolve = {
        alias: {
            "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
            "~components": path.resolve(__dirname, "./resources/js/components"),
            "~config": path.resolve(__dirname, "./resources/js/config"),
            "~context": path.resolve(__dirname, "./resources/js/context"),
            "~helpers": path.resolve(__dirname, "./resources/js/helpers"),
            "~hooks": path.resolve(__dirname, "./resources/js/hooks"),
            "~layouts": path.resolve(__dirname, "./resources/js/layouts"),
            "~pages": path.resolve(__dirname, "./resources/js/pages"),
            "~route": path.resolve(__dirname, "./resources/js/route"),
            "~styles": path.resolve(__dirname, "./resources/js/styles"),
            "./runtimeConfig": "./runtimeConfig.browser",
        },
    };
    return isDev ?
        defineConfig({
            server: {
                host: '127.0.0.1',  // Add this to force IPv4 only
            },
            plugins: [
                react(),
                svgrPlugin({
                    svgrOptions: {
                        icon: true,
                    },
                }),
                laravel({
                    input: ['resources/css/app.css', 'resources/ts/app.jsx'],
                    refresh: true,
                }),
            ],
            /* root: path.join(__dirname, "src"), */
            resolve,
            define: {
                global: {},
                exports: {},
                "process.env.NODE_ENV": `"${mode}"`,
                __APP_ENV__: `"${env.APP_ENV}"`,
            },
        }) :
        defineConfig({
            plugins: [
                react(),
                svgrPlugin({
                    svgrOptions: {
                        icon: true,
                    },
                }),
                laravel({
                    input: ['resources/css/app.css', 'resources/js/index.jsx'],
                    refresh: true,
                }),
            ],
            build: {
                outDir: "public/build",
            },
            resolve,
        });
};
