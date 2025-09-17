import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Quran Companion',
    short_name: 'Quran App',
    description: 'Your daily guide to the Holy Quran.',
    start_url: '/',
    display: 'standalone',
    background_color: '#E0F8F8',
    theme_color: '#008080',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: "/icon-192.png",
        type: "image/png",
        sizes: "192x192"
      },
      {
        src: "/icon-512.png",
        type: "image/png",
        sizes: "512x512"
      }
    ],
  }
}
