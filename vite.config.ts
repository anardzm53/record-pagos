import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import csp from "vite-plugin-csp-guard";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
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
})
