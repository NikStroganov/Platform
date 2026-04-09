import { createTheme } from "@mui/material/styles";

const inputTokens = {
  background: "#f8f7fc",
  border: "#e6e6e6",
  borderInteractive: "#000000",
  borderError: "#ff4d4f",
  text: "#000000",
  placeholder: "#c4c2be",
  helper: "#c4c2be",
  adornment: "#c4c2be",
  disabledBackground: "#f3f2f7",
  disabledText: "#c4c2be",
};

const buttonTokens = {
  primary: "#3d82ff",
  primaryHover: "#528fff",
  primaryActive: "#1f6eff",
  disabledBackground: "#f2f2f2",
  disabledBorder: "#e6e6e6",
  disabledText: "#c4c2be",
};

export const appTheme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: buttonTokens.primary,
      light: buttonTokens.primaryHover,
      dark: buttonTokens.primaryActive,
      contrastText: "#ffffff",
    },
    text: {
      primary: inputTokens.text,
      secondary: inputTokens.placeholder,
    },
    error: {
      main: inputTokens.borderError,
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "var(--font-manrope), sans-serif",
    body1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: "20px",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
        size: "medium",
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 48,
          borderRadius: 12,
          padding: "14px 16px",
          fontFamily: "Manrope, var(--font-manrope), sans-serif",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "20px",
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
          },
        },
      },
      variants: [
        {
          props: {
            variant: "contained",
            color: "primary",
          },
          style: {
          backgroundColor: buttonTokens.primary,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: buttonTokens.primaryHover,
          },
          "&:active": {
            backgroundColor: buttonTokens.primaryActive,
          },
          "&.Mui-disabled": {
            backgroundColor: buttonTokens.disabledBackground,
            border: `1px solid ${buttonTokens.disabledBorder}`,
            color: buttonTokens.disabledText,
          },
          },
        },
      ],
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: inputTokens.placeholder,
          fontFamily: "Manrope, var(--font-manrope), sans-serif",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "20px",
          transform: "translate(12px, 14px) scale(1)",
          transformOrigin: "top left",
          maxWidth: "calc(100% - 24px)",
          "&.Mui-focused": {
            color: inputTokens.placeholder,
          },
          "&.Mui-error": {
            color: inputTokens.placeholder,
          },
          "&.MuiInputLabel-shrink": {
            color: inputTokens.placeholder,
            fontFamily: "Manrope, var(--font-manrope), sans-serif",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "12px",
            transform: "translate(12px, 7px) scale(1)",
          },
          "&.Mui-disabled": {
            color: inputTokens.disabledText,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // alignItems: "flex-end",
          minHeight: 48,
          color: inputTokens.text,
          backgroundColor: inputTokens.background,
          borderRadius: 12,
          boxShadow: "none",
          transition: "border-color 160ms ease",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: inputTokens.border,
            borderRadius: 12,
            borderWidth: 1,
            top: 0,
          },
          "& .MuiOutlinedInput-notchedOutline legend": {
            display: "none",
          },
          "&:hover": {
            boxShadow: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: inputTokens.borderInteractive,
          },
          "&.Mui-focused": {
            boxShadow: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: inputTokens.borderInteractive,
            borderWidth: 1,
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: inputTokens.borderError,
            borderWidth: 1,
          },
          "&.Mui-error:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: inputTokens.borderError,
          },
          "&.Mui-disabled": {
            backgroundColor: inputTokens.disabledBackground,
            color: inputTokens.disabledText,
            boxShadow: "none",
          },
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: inputTokens.border,
          },
          "& .MuiSvgIcon-root": {
            fontSize: 20,
            color: inputTokens.adornment,
          },
          "& .MuiOutlinedInput-input.MuiInputBase-inputAdornedEnd": {
            paddingRight: 8,
          },
        },
        input: {
          alignSelf: "end",
          padding: "7px 12px",
          fontFamily: "Manrope, var(--font-manrope), sans-serif",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "18px",
          color: inputTokens.text,
          "&::placeholder": {
            color: inputTokens.placeholder,
            fontFamily: "Manrope, var(--font-manrope), sans-serif",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "20px",
            opacity: 1,
          },
          "&:focus::placeholder": {
            opacity: 0,
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          marginRight: 0,
          color: inputTokens.adornment,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginTop: 8,
          color: inputTokens.helper,
          fontSize: "0.875rem",
          fontWeight: 500,
          lineHeight: "18px",
          "&.Mui-error": {
            color: inputTokens.borderError,
          },
        },
      },
    },
  },
});




