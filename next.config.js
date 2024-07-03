/** @type {import('next').NextConfig} */
const withImages = require('next-images')
const { withNextVideo } = require('next-video/process')

const nextConfig = {
    async redirects() {
        return [
            {
                source: '/accountMember',
                destination: '/accountMember/addNewMember',
                permanent: true,
            },
        ]
    },
    reactStrictMode: true,
    env: {
        REACT_APP_DOMAIN: 'http://localhost:3000',
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'loremflickr.com',
                port: '',
                pathname: '/350/**',
            },
            {
                protocol: 'https',
                hostname: 'netflix-static.s3.us-west-2.amazonaws.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'assets.nflxext.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3002',
                pathname: '/**',
            },
        ],
        domains: ['netflix-static.s3.us-west-2.amazonaws.com'],
    },
}

module.exports = withNextVideo(nextConfig, {
    provider: 'amazon-s3',
    providerConfig: {
        'amazon-s3': {
            endpoint: 'netflix-static.s3.us-west-2.amazonaws.com',
        },
    },
})
