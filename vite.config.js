import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      proxy: {
        '/rapidapi': {
          target: 'https://airbnb19.p.rapidapi.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/rapidapi/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('x-rapidapi-key', env.VITE_RAPID_API_KEY)
              proxyReq.setHeader('x-rapidapi-host', 'airbnb19.p.rapidapi.com')
            })
            proxy.on('proxyRes', (res) => {
              console.log('📥 Response:', res.statusCode)
            })
          },
        },
      },
    },
  }
})