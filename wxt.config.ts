import {defineConfig} from 'wxt';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: (env) => ({
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue"],
        resolvers: [ElementPlusResolver()],
        dts: true
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: true
      })
    ]
  }),
  manifestVersion: 3,
  srcDir: 'src',
  entrypointsDir: 'entries',
  manifest: {
    permissions: ["contextMenus", "activeTab", "storage"],
    web_accessible_resources: [
      {
        resources: ["bilibiliApiInject.js"],
        matches: ["*://search.bilibili.com/*"]
      }
    ]
  }
});
