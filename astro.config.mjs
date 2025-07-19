// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react'; // ← ADD THIS
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    integrations: [
        react() // ← ADD THIS
    ],
    vite: {
        plugins: [tailwindcss()]
    }
});
