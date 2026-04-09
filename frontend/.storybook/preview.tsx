import type { Preview } from "@storybook/nextjs-vite";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Manrope } from "next/font/google";

import "../app/globals.css";
import { appTheme } from "../lib/theme";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={manrope.variable}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <div style={{ padding: 24, background: "#f2f2f2", minHeight: "100vh" }}>
            <Story />
          </div>
        </ThemeProvider>
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
