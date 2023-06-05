/** @type {import('next').NextConfig} */
const nextConfig = {
    // async headers() {
    //     return [
    //       {
    //         source: '/public/fonts/Poppins-Regular.ttf',
    //         headers: [
    //           {
    //             key: 'Cache-Control',
    //             value: 'public, max-age=31536000, immutable'
    //           }
    //         ]
    //       },
    //       {
    //         source: '/public/fonts/Poppins-Medium.ttf',
    //         headers: [
    //           {
    //             key: 'Cache-Control',
    //             value: 'public, max-age=31536000, immutable'
    //           }
    //         ]
    //       },
    //       {
    //         source: '/public/fonts/Poppins-Bold.ttf',
    //         headers: [
    //           {
    //             key: 'Cache-Control',
    //             value: 'public, max-age=31536000, immutable'
    //           }
    //         ]
    //       },
    //     ]
    // },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
