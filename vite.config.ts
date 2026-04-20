import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        namespace: 'https://danbooru.donmai.us/forum_topics/8502',
        author: 'shemingwan_wen',
        description: '18/04/2026, 21.17.26',
        match: [
          '*://*.danbooru.donmai.us/tags*',
          '*://*.danbooru.donmai.us/artists*',
        ],
        license: 'MIT',
      },
    }),
  ],
  build: {
    minify: true
  }
});
