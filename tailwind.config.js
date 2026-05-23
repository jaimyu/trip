/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4a90d9",
        accent: "#66bb6a",
        teal: "#26a69a",
        bg: "#f8fafb",
        "text-main": "#333",
        "text-secondary": "#666",
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
      },
      boxShadow: {
        card: "0 4px 16px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
