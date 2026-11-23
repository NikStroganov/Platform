import Typography, { type TypographyProps } from "@mui/material/Typography";

export function InputCaption({ error = false, sx, ...props }: TypographyProps & { error?: boolean }) {
  return <Typography role={error ? "alert" : undefined} sx={[
    { color: error ? "#ff4d4f" : "#adadad", fontSize: 14, fontWeight: 500, lineHeight: "18px" },
    ...(Array.isArray(sx) ? sx : [sx]),
  ]} {...props} />;
}
