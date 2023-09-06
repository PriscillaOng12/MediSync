const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary:"#419DB7",
        content: "#333333",
        secondary:"#4F7284",
        "accent":"#333333",
        tertiary: "#FFC642",
        status: {
          shipped:"rgb(234 179 8)",
          pending:"rgb(239 68 68)",
          confirmed: "rgb(34 197 94)",
          closed:'#242526',
          cancelled: "#CDB37B",
          active: "rgb(34 197 94)",
          disabled: "rgb(239 68 68)",
          not_approved:"rgb(240,173,78)"
        }
      },
      screens: {
        // ...defaultTheme.screens,
        'xss': '350px',
        'very-extra': '385px',
        'extra-small': '475px',
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
