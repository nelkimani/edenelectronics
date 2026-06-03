import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: 'hsl(24,95%,53%)', light: 'hsl(38,100%,60%)', dark: 'hsl(20,90%,40%)' },
        navy: { DEFAULT: 'hsl(220,30%,8%)', 2: 'hsl(220,25%,11%)', 3: 'hsl(220,20%,15%)' },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
