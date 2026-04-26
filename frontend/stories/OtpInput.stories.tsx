import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Box from "@mui/material/Box";

import { OtpInput } from "@/components/ui/otp-input";

const meta = {
  title: "UI/OtpInput",
  component: OtpInput,
  tags: ["autodocs"],
  args: {
    value: "",
    onChange: () => undefined,
    length: 6,
    separator: null,
    error: false,
    disabled: false,
  },
  argTypes: {
    onChange: { action: "changed" },
    length: {
      control: { type: "number", min: 4, max: 8, step: 1 },
    },
    separator: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Компонент для OTP-кода с отдельными ячейками. Поддерживает ввод с клавиатуры, переход стрелками, удаление, вставку полного кода и автопереход к следующему символу.",
      },
    },
  },
} satisfies Meta<typeof OtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledOtpInput(props: React.ComponentProps<typeof OtpInput>) {
  const [value, setValue] = React.useState(props.value ?? "");

  React.useEffect(() => {
    setValue(props.value ?? "");
  }, [props.value]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <OtpInput
        {...props}
        value={value}
        onChange={(nextValue) => {
          setValue(nextValue);
          props.onChange(nextValue);
        }}
      />
      <Box sx={{ fontSize: 13, color: "text.secondary" }}>
        Entered value: <strong>{value || "-"}</strong>
      </Box>
    </Box>
  );
}

export const Default: Story = {
  args: {},
  render: (args) => <ControlledOtpInput {...args} />,
};

export const WithSeparator: Story = {
  args: {
    separator: <span style={{ color: "#9ca3af", fontWeight: 600 }}>-</span>,
  },
  render: (args) => <ControlledOtpInput {...args} />,
};

export const Error: Story = {
  args: {
    error: true,
    value: "12",
  },
  render: (args) => <ControlledOtpInput {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "839201",
  },
  render: (args) => <ControlledOtpInput {...args} />,
};
