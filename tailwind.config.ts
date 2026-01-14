import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        'primary-foreground': '#FFFFFF',
        secondary: '#1E293B',
        accent: '#10B981',
        card: {
          DEFAULT: 'rgba(15, 23, 42, 0.95)',
          foreground: '#F1F5F9',
        },
        muted: {
          DEFAULT: '#1E293B',
          foreground: '#94A3B8',
        },
        border: '#1E293B',
        input: '#0F172A',
        footer: {
          DEFAULT: '#0A0E1A',
          foreground: '#94A3B8',
          heading: '#F1F5F9',
          link: '#64748B',
          'link-hover': '#E2E8F0',
          border: '#1E293B',
        },
      },
    },
  },
  plugins: [],
};

export default config;
