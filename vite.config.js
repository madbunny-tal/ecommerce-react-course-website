import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";


const manifestForPlugin = {
  registerType:"prompt",
  includeAssets: ["favicon.ico", "icon-180x180.png", "icon-225x225.png"],
  manifest:{
    name: "E-Commerce",
    short_name: "E-Comm",
    description: "An app that can show weather forecast for your city.",
    icons: [
      {
        src:"/icon-192x192.png",
        sizes:"192x192",
        type:"image/png",
        purpose:"any",
      },
      {
        src:"/icon-512x512.png",
        sizes:"512x512",
        type:"image/png",
        purpose:"any",
      },
      {
        src:"/icon-180x180.png",
        sizes:"180x180",
        type:"image/png",
        purpose:"apple touch icon",
      },
      {
        src:"/icon-225x225.png",
        sizes:"225x225",
        type:"image/png",
        purpose:"any maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#e8ebf2",
    display:"standalone",
    scope:"/",
    start_url:"/",
    orientation: "portrait",
    devOptions: {
      enabled: true // Allows you to see the manifest & icons in DevTools under Localhost
    },
  },
};


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
})
