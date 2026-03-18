import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
      output: {
        manualChunks: (id: string) => {
          // React core runtime
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-is/')
          ) {
            return 'vendor-react'
          }

          // Stacks blockchain libraries + core crypto primitives
          if (
            id.includes('node_modules/@stacks/') ||
            id.includes('node_modules/@noble/') ||
            id.includes('node_modules/@scure/') ||
            id.includes('node_modules/secp256k1/') ||
            id.includes('node_modules/elliptic/') ||
            id.includes('node_modules/sha.js/') ||
            id.includes('node_modules/hash.js/') ||
            id.includes('node_modules/hash-base/') ||
            id.includes('node_modules/hmac-drbg/') ||
            id.includes('node_modules/fast-sha256/') ||
            id.includes('node_modules/create-hash/') ||
            id.includes('node_modules/create-hmac/') ||
            id.includes('node_modules/buffer/') ||
            id.includes('node_modules/safe-buffer/')
          ) {
            return 'vendor-stacks-core'
          }

          // Wallet & EVM Interop (very large) - Split further
          if (
            id.includes('node_modules/viem/') ||
            id.includes('node_modules/abitype/') ||
            id.includes('node_modules/@adraffy/')
          ) {
            return 'vendor-viem'
          }

          if (id.includes('node_modules/@reown/')) {
            return 'vendor-reown'
          }

          if (id.includes('node_modules/@walletconnect/')) {
            return 'vendor-walletconnect'
          }

          if (
            id.includes('node_modules/ox/') ||
            id.includes('node_modules/@bitcoinerlab/')
          ) {
            return 'vendor-wallet'
          }

          // Bitcoin specific & more crypto
          if (
            id.includes('node_modules/bitcoinjs-lib/') ||
            id.includes('node_modules/c32check/') ||
            id.includes('node_modules/bs58') ||
            id.includes('node_modules/bech32/') ||
            id.includes('node_modules/base-x/')
          ) {
            return 'vendor-bitcoin'
          }

          // Lit (Web components / Modal UI)
          if (
            id.includes('node_modules/lit-html/') ||
            id.includes('node_modules/@lit/') ||
            id.includes('node_modules/@lit-labs/')
          ) {
            return 'vendor-lit'
          }

          // UI Utilities (Motion, Table, Icons)
          if (id.includes('node_modules/framer-motion/') || id.includes('node_modules/motion-dom/')) {
            return 'vendor-motion'
          }
          if (id.includes('node_modules/lucide-react/')) return 'vendor-icons'
          if (id.includes('node_modules/@tanstack/')) return 'vendor-table'

          // Charts
          if (
            id.includes('node_modules/recharts/') ||
            id.includes('node_modules/d3') ||
            id.includes('node_modules/victory-vendor/')
          ) {
            return 'vendor-charts'
          }

          // General Utilities
          if (
            id.includes('node_modules/zod/') ||
            id.includes('node_modules/zustand/') ||
            id.includes('node_modules/react-hook-form/') ||
            id.includes('node_modules/lodash/') ||
            id.includes('node_modules/es-toolkit/') ||
            id.includes('node_modules/react-hot-toast/') ||
            id.includes('node_modules/react-router/')
          ) {
            return 'vendor-utils'
          }

          // Everything else in node_modules
          if (id.includes('node_modules/')) {
            return 'vendor-misc'
          }
        },
      },
    },
  },
})
