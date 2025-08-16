import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Fixed shortcut for testing ONE file
      '/api/metadata': {
        target: 'https://meet.konn3ct.ng',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/metadata$/,
            '/presentation/6d333d16dbadc4a10293c08bbd7d6e6d19be81ff-1713508687932/metadata.xml'
          ),
      },

      // Dynamic proxy for ANY presentation
      '/api/presentation': {
        target: 'https://meet.konn3ct.ng',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/presentation/, '/presentation'),
      },
    },
  },
})
