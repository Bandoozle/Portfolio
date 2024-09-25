/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Enable dark mode toggle via class
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem", // Reduced padding for a tighter look
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Modern neutral and vibrant tones
        background: {
          light: "#F7F8FC", // Light mode background
          dark: "#1F1F1F",  // Dark mode background
        },
        foreground: {
          light: "#222",    // Text in light mode
          dark: "#E5E7EB",  // Text in dark mode
        },
        primary: {
          DEFAULT: "#6366F1",  // A cool purple/blue accent
          foreground: "#FFFFFF", // Text color on primary background
        },
        secondary: {
          DEFAULT: "#3B82F6", // Light blue for secondary elements
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F97316", // Orange for accent items like buttons
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#6B7280", // Muted gray for subtitles
          foreground: "#D1D5DB",
        },
        card: {
          DEFAULT: "#FFFFFF",  // Light card background
          dark: "#292929",     // Dark mode card background
        },
      },
      borderRadius: {
        lg: "12px", // Softer rounded corners for elements
        md: "8px",  // Medium border radius for modern feel
        sm: "6px",
      },
      fontSize: {
        // Adjust font sizes for a modern typography scale
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      spacing: {
        // Add finer spacing options
        1.5: "0.375rem",
        2.5: "0.625rem",
        7: "1.75rem",
        9: "2.25rem",
        18: "4.5rem",
      },
      boxShadow: {
        // Modern box shadows for elevation
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)",
      },
      transitionDuration: {
        // Faster transitions for modern UI
        DEFAULT: "200ms",
        fast: "100ms",
        slow: "400ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)", // Smoother animations
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Includes Tailwind's animation plugin for smooth effects
}
