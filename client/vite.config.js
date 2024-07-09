import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [],

  plugins: [
    replace({
      'process.env.REACT_APP_GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.REACT_APP_GOOGLE_MAPS_API_KEY),
    }),
    react()
  ],
})
