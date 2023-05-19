const plugin = require("tailwindcss/plugin");

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgb(var(${variableName}))`;
    }
  };
}

module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        body: ["Open Sans", "system-ui", "sans-serif"],
      },
      colors: {
        light: withOpacity("--color-light"),
        dark: withOpacity("--color-dark"),
        accent: withOpacity("--color-accent"),
        body: withOpacity("--text-base"),
        muted: withOpacity("--text-muted"),
        heading: withOpacity("--text-heading"),
        bolder: withOpacity("--text-text-bolder"),
        "sub-heading": withOpacity("--text-sub-heading"),
        "body-dark": withOpacity("--text-base-dark"),
        "muted-light": withOpacity("--text-muted-light"),
        "accent-hover": withOpacity("--color-accent-hover"),
        "accent-300": withOpacity("--color-accent-300"),
        "accent-400": withOpacity("--color-accent-400"),
        "accent-500": withOpacity("--color-accent-500"),
        "accent-600": withOpacity("--color-accent-600"),
        "accent-700": withOpacity("--color-accent-700"),
        "border-50": withOpacity("--color-border-50"),
        "border-100": withOpacity("--color-border-100"),
        "border-200": withOpacity("--color-border-200"),
        "border-base": withOpacity("--color-border-base"),
        "border-400": withOpacity("--color-border-400"),
        "gray-50": withOpacity("--color-gray-50"),
        "gray-100": withOpacity("--color-gray-100"),
        "gray-200": withOpacity("--color-gray-200"),
        "gray-300": withOpacity("--color-gray-300"),
        "gray-400": withOpacity("--color-gray-400"),
        "gray-500": withOpacity("--color-gray-500"),
        "gray-600": withOpacity("--color-gray-600"),
        "gray-700": withOpacity("--color-gray-700"),
        "gray-800": withOpacity("--color-gray-800"),
        "gray-900": withOpacity("--color-gray-900"),
        "red-500": withOpacity("--color-red-500"),
        "red-600": withOpacity("--color-red-600"),
        "red-700": withOpacity("--color-red-700"),
        "red-800": withOpacity("--color-red-800"),
        "red-900": withOpacity("--color-red-900"),

        social: {
          facebook: "#3b5998",
          "facebook-hover": "#35508a",
          twitter: "#1da1f2",
          instagram: "#e1306c",
          youtube: "#ff0000",
          google: "#4285f4",
          "google-hover": "#3574de",
        },
      },

      boxShadow: {
        base: "rgba(0, 0, 0, 0.16) 0px 4px 16px",
      },
      gridTemplateColumns: {
        fit: "repeat(auto-fit, minmax(0, 1fr))",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["even", "odd"],
      borderWidth: ["last", "focus"],
      margin: ["last", "first"],
      padding: ["last", "first"],
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    // add custom variant for expanding sidebar
    plugin(({ addVariant, e }) => {
      addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.sidebar-expanded .${e(
              `sidebar-expanded${separator}${className}`
            )}`
        );
      });
    }),
  ],
};
