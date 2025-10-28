import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      srcDir: "src",
      filename: "sw.ts",
      registerType: "autoUpdate",
      injectRegister: null,
      devOptions: {
        enabled: true,
        type: "module",
      },
      strategies: "injectManifest",
      manifest: {
        name: "TubeAlert",
        short_name: "TubeAlert",
        description:
          "Get the latest status of the London Underground (The Tube) and receive notifications when your line is disrupted",
        lang: "en-GB",
        theme_color: "#3a3a3f",
        background_color: "#3a3a3f",
        icons: [
          {
            src: "/imgs/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/imgs/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
