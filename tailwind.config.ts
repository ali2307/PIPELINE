import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // screens: { sm: { max: "640px" } },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        // Add custom fonts or override existing fonts
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        optima: ["Optima", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        montecarlo: ['"MonteCarlo"', 'cursive'], 
        raleway: ['Raleway', 'sans-serif'],
       
      },
      screens: {
        sm: { max: "640px" },

        "custom-3xl": "1500px", // Example custom breakpoint
        "custom-lg": "1700px", // Example custom breakpoint
      },
    },
  },
  plugins: [],
};
export default config;
