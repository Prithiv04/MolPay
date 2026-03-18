import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        // Split large vendor libraries into separate cached chunks
        manualChunks: (id: string) => {
          // React core
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-is')) {
            return 'vendor-react'
          }
          // Stacks blockchain libraries
          if (id.includes('node_modules/@stacks')) {
            return 'vendor-stacks'
          }
          // Charts
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3')) {
            return 'vendor-charts'
          }
          // Animation
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'
          }
          // Remaining node_modules → general vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})
