import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // 빌드 모드에 따라 다른 진입점 사용
    const isStore = mode === 'store';
    const htmlEntry = isStore ? 'index-store.html' : 'index-landing.html';
    const outDir = isStore ? 'dist-store' : 'dist-landing';
    
    return {
      root: '.',
      build: {
        outDir,
        rollupOptions: {
          input: path.resolve(__dirname, htmlEntry),
          output: {
            entryFileNames: 'assets/[name]-[hash].js',
          },
        },
      },
      publicDir: 'public',
      server: {
        port: isStore ? 3001 : 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
