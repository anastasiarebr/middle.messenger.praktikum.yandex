import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                login: resolve(__dirname, 'src/pages/Login/index.html'),
                signup: resolve(__dirname, 'src/pages/Signup/index.html'),
                chat: resolve(__dirname, 'src/pages/Chat/index.html'),
                error: resolve(__dirname, 'src/pages/Error/index.html'),
                profile: resolve(__dirname, 'src/pages/Profile/index.html'),
            }
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/styles/constants.scss";`,
            },
        },
    },
})