/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      animation: {
        fade: "fadeOut 0.5s ease-in-out",
        scroll: "scroll 40s linear infinite",
      },
      fontFamily: {
        netflixMedium: ["Netflix-Medium"],
        netflixLight: ["Netflix-Light"],
      },
      fontFamily: {
        netflix: ["var(--font-netflix)"],
      },

      keyframes: (theme) => ({
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-250px * 14))" },
        },
      }),
      backgroundImage: {
        linearGradient:
          "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.68) 44%,#141414 68%,#141414)",
        bannerGradient:
          "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414), url('/images/main-bg-lg.png')",
      },
    },
  },
  plugins: [],
};
