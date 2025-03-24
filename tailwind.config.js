/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			peach: '#FFE8DF',
  			white: '#FFFFFF',
  			lightgray: '#F0F0F0',
  			gray: '#888888',
  			black: '#242424',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
  			xs: '0.75rem',
  			base: '1rem',
  			lg: '1.125rem',
  			xl: '1.25rem',
  			'2xl': '1.5rem'
  		},
  		spacing: {
  			xs: '0.25rem',
  			sm: '0.5rem',
  			md: '0.75rem',
  			lg: '1rem',
  			xl: '1.5rem',
  			'2xl': '2rem'
  		},
  		borderRadius: {
  			sm: 'calc(var(--radius) - 4px)',
  			md: 'calc(var(--radius) - 2px)',
  			lg: 'var(--radius)',
  			xl: '1rem',
  			full: '9999px'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'Arial',
  				'sans-serif'
  			]
  		},
  		boxShadow: {
  			sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  			md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  			lg: '0 10px 15px -3px rgba(0, 0, 0, 0.15)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
