import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from "@originjs/vite-plugin-federation"
// import csp from "vite-plugin-csp-guard";

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(),tailwindcss(),
    federation({
      name: "remote-app",
      filename: "remoteEntry.js",
      //Modules to use
      exposes: {
        "./App": "./src/App.tsx",
      },
      shared: ["react"],
    })
    // csp({
    //   algorithm: "sha256", // The algorithm to use for hashing
    //   dev: {
    //     run: true, // If you want to run the plugin in `vite dev` mode
    //   },
    //   policy: {
    //     // Specify the policy here.
    //     "script-src": ["'self'", "https://www.google-analytics.com"], // Example: Allow Google Analytics
    //     "style-src": ["'self'", "https://fonts.googleapis.com"], // Example: Allow Google Fonts
    //   },
    // })
  ],
  server: {
      proxy: {
        "/src/main.tsx": {
          target: "https://github.com/anardzm53/record-pagos/blob/main/src/main.tsx",
          changeOrigin: true
        },
        "mirute/entry.js": {
          target: "dist/assets/remoteEntry.js"
        }
      }
    }
})