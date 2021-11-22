import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

import { AppRoutes } from "routing/AppRoutes";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Nunito';
        }
      `,
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AppRoutes />
      </CssBaseline>
    </ThemeProvider>
  );
};
