import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.tsx',
        './src/components/**/*.tsx',
        './src/app/**/*.tsx',
        './src/features/**/*.tsx',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        fontFamily: {
            netflix: [
                'Netflix Sans',
                'Helvetica Neue',
                'Segoe UI',
                'Roboto',
                'Ubuntu',
                'sans-serif',
            ],
        },
        extend: {
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
            animation: {
                fade: 'fadeOut 0.5s ease-in-out',
                scroll: 'scroll 40s linear infinite',
                cursorHide: 'cursorHide 0.3s linear easy-in ',
            },

            colors: {
                white: '#e5e5e5',
                link: '#0080ff',
                primary: '#333',
                secondary: '#bcbcbc',
                black: '#393536',
                red: '#c82f27',
                subtitle: '#777',
            },

            boxShadow: {
                field: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02), 0 0 0 3px hsla(210, 96%, 45%, 25%) , 0 1px 1px 0 rgba(0, 0, 0, 0.08)',
            },

            keyframes: (theme) => ({
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(calc(-250px * 14))' },
                },
                fadeSize: {
                    '0%': {
                        height: '0',
                    },
                    '100%': {
                        opacity: '100%',
                    },
                },
                cursorHide: {
                    '0%': {
                        cursor: 'pointer',
                    },
                    '100%': {
                        cursor: 'none',
                    },
                },
            }),

            backgroundImage: {
                linearGradient:
                    'linear-gradient(180deg, rgba(20, 20, 20, 0) 0%, rgba(20, 20, 20, 0.15) 15%, rgba(20, 20, 20, 0.35) 29%, rgba(20, 20, 20, 0.68) 44%, rgb(20, 20, 20) 68%, rgb(20, 20, 20) 100%)',
                previewGradient:
                    'linear-gradient(0deg,#181818,transparent 50%)',
                playGradient:
                    'linear-gradient(195deg, hsla(0, 0%, 9%, .7), hsla(0, 0%, 9%, .5) 10%, transparent 25%)',
                bannerGradient:
                    "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414), url('/images/main-bg-lg.png')",
            },

            fontFamily: {
                sans: ['var(--font-netflix)'],
                netflix:
                    'Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif',
                nkufi: 'NKufi,Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif',
                graphikth:
                    'GraphikTH,Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif',
            },
        },
    },
    plugins: [require('daisyui'), require('flowbite/plugin')],
}
export default config
