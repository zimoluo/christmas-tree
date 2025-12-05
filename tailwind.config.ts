import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["var(--font-main)"],
        tabular: ["var(--font-open-sans)"],
        mono: ["var(--font-roboto-mono)"],
        serif: ["var(--font-lora)"],
        fancy: ["var(--font-pacifico)"],
      },
      backdropBlur: {
        reading: "var(--reading-blur)",
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        saturated: "rgb(var(--color-saturated) / <alpha-value>)",
        pastel: "rgb(var(--color-pastel) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
        "highlight-primary":
          "rgb(var(--color-highlight-primary) / <alpha-value>)",
        "highlight-saturated":
          "rgb(var(--color-highlight-saturated) / <alpha-value>)",
        "highlight-pastel":
          "rgb(var(--color-highlight-pastel) / <alpha-value>)",
        "highlight-light": "rgb(var(--color-highlight-light) / <alpha-value>)",
        highlight: "rgb(248 248 248 / <alpha-value>)",
        "darklight-primary":
          "rgb(var(--color-darklight-primary) / <alpha-value>)",
        "darklight-saturated":
          "rgb(var(--color-darklight-saturated) / <alpha-value>)",
        "darklight-pastel":
          "rgb(var(--color-darklight-pastel) / <alpha-value>)",
        "darklight-light": "rgb(var(--color-darklight-light) / <alpha-value>)",
      },
      backgroundImage: {
        page: "var(--bg-page)",
        "page-minimal": "var(--bg-page-minimal, var(--bg-page))",
      },
      rotate: {
        "22.5": "22.5deg",
        "360": "360deg",
        "135": "135deg",
      },
      boxShadow: {
        xs: "0 0 2px rgb(var(--color-darklight-light) / 0.02), 0 2px 4px rgb(var(--color-darklight-light) / 0.04)",
        sm: "0 0 5px rgb(var(--color-darklight-light) / 0.025), 0 2px 10px rgb(var(--color-darklight-light) / 0.05)",
        DEFAULT:
          "0 1px 8px rgb(var(--color-darklight-light) / 0.028), 0 3px 16px rgb(var(--color-darklight-light) / 0.055)",
        md: "0 1px 10px rgb(var(--color-darklight-light) / 0.03), 0 4px 20px rgb(var(--color-darklight-light) / 0.065)",
        lg: "0 1px 14px rgb(var(--color-darklight-light) / 0.03), 0 4px 28px rgb(var(--color-darklight-light) / 0.073)",
        xl: "0 2px 20px rgb(var(--color-darklight-light) / 0.035), 0 5px 40px rgb(var(--color-darklight-light) / 0.085)",
        "2xl":
          "0 2px 30px rgb(var(--color-darklight-light) / 0.04), 0 5px 60px rgb(var(--color-darklight-light) / 0.1)",
        none: "none",
      },
      zIndex: {
        "60": "60",
        "5": "5",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
        "7": "7",
      },
      translate: {
        "1/6": "16.666667%",
        "2.25": "0.5625rem",
        "0.75": "0.15625rem",
      },
      maxWidth: {
        "60": "15rem",
        "96": "24rem",
        "80": "20rem",
        screen: "100vw",
      },
      spacing: {
        "26": "6.5rem",
        "13": "3.25rem",
        "42": "10.5rem",
        "1.3": "0.325rem",
        "18": "4.5rem",
        "38": "9.5rem",
      },
      padding: {
        "0.25": "0.0625rem",
      },
      margin: {
        "0.25": "0.0625rem",
      },
      width: {
        "9/10": "90%",
      },
      scale: {
        "135": "1.35",
        "85": "0.85",
      },
      borderWidth: {
        "0.8": "0.8px",
        "0.4": "0.4px",
        "0.6": "0.6px",
      },
      height: {
        screen: "100svh",
      },
      minHeight: {
        screen: "100svh",
      },
      maxHeight: {
        screen: "100svh",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const opacities = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);
      const newUtilities = opacities.reduce((acc: any, opacity) => {
        acc[`.bg-widget-${opacity}`] = {
          backgroundImage: `var(--bg-widget-${opacity})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
        return acc;
      }, {});

      addUtilities(newUtilities, {
        variants: ["responsive"],
      });
    },
    function ({ addUtilities, matchUtilities }: any) {
      const variants = {
        primary: {
          "--reflect-color":
            "color-mix(in srgb, rgb(var(--color-highlight-primary) / 1.0) 90%, rgb(253 253 253 / 1.0))",
        },
        saturated: {
          "--reflect-color":
            "color-mix(in srgb, rgb(var(--color-highlight-saturated) / 1.0) 90%, rgb(253 253 253 / 1.0))",
        },
        pastel: {
          "--reflect-color":
            "color-mix(in srgb, rgb(var(--color-highlight-pastel) / 1.0) 90%, rgb(253 253 253 / 1.0))",
        },
        light: {
          "--reflect-color":
            "color-mix(in srgb, rgb(var(--color-highlight-light) / 1.0) 90%, rgb(253 253 253 / 1.0))",
        },
      };

      const baseEffect = {
        position: "relative",
        "--reflect-bright": "0.9",
        "--reflect-dim": "0.1",
        "--reflect-blur": "1.5px",
        "--reflect-spread": "0.75px",
        "&::before": {
          content: "''",
          pointerEvents: "none",
          userSelect: "none",
          position: "absolute",
          inset: "0",
          borderRadius: "inherit",
          padding: "0",
          boxShadow: `inset 0 0 var(--reflect-blur, 1px) var(--reflect-spread, 1px) var(--reflect-color)`,
          background: "transparent",
          mask: `linear-gradient(to bottom right,rgba(0,0,0,var(--reflect-bright,1)) 0%,rgba(0,0,0,var(--reflect-dim,0.15)) 40%,rgba(0,0,0,var(--reflect-dim,0.15)) 60%,rgba(0,0,0,var(--reflect-bright,1)) 100%) content-box`,
          WebkitMask: `linear-gradient(to bottom right,rgba(0,0,0,var(--reflect-bright,1)) 0%,rgba(0,0,0,var(--reflect-dim,0.15)) 40%,rgba(0,0,0,var(--reflect-dim,0.15)) 60%,rgba(0,0,0,var(--reflect-bright,1)) 100%) content-box`,
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          opacity: "1",
        },
      };

      const utilities = Object.fromEntries(
        Object.entries(variants).map(([name, vars]) => [
          `.border-reflect-${name}`,
          { ...baseEffect, ...vars },
        ])
      );
      addUtilities(utilities, ["responsive"]);

      matchUtilities(
        {
          "border-reflect": (value: any) => ({
            "--reflect-spread": value,
          }),
        },
        { values: {} }
      );
    },
  ],
};
export default config;
