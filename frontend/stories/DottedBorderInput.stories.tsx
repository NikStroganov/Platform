import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Box from "@mui/material/Box";

import { DottedBorderInput } from "@/components/ui/dotted-border-input";

const meta = {
  title: "UI/DottedBorderInput",
  component: DottedBorderInput,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter nickname",
    value: "",
    disabled: false,
    error: false,
    fullWidth: false,
    "aria-label": "Nickname",
    onChange: () => undefined,
  },
  argTypes: {
    value: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    onChange: { action: "changed" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A lightweight shared input matching the Figma dashed-border nickname field. It uses a real input element, supports controlled value, disabled and error states, and keeps the 1 px dashed #1CA2D3 border, 12 px radius, 20x6 px padding, and 24/32 semibold Manrope text.",
      },
    },
  },
} satisfies Meta<typeof DottedBorderInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledDottedBorderInput(
  props: React.ComponentProps<typeof DottedBorderInput>,
) {
  const [value, setValue] = React.useState(props.value ?? "");

  React.useEffect(() => {
    setValue(props.value ?? "");
  }, [props.value]);

  return (
    <DottedBorderInput
      {...props}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
        props.onChange?.(event);
      }}
    />
  );
}

export const Default: Story = {
  render: (args) => <ControlledDottedBorderInput {...args} />,
};

export const Filled: Story = {
  args: {
    value: "andrew",
  },
  render: (args) => <ControlledDottedBorderInput {...args} />,
};

export const Error: Story = {
  args: {
    value: "bad nickname",
    error: true,
  },
  render: (args) => <ControlledDottedBorderInput {...args} />,
};

export const Disabled: Story = {
  args: {
    value: "andrew",
    disabled: true,
  },
  render: (args) => <ControlledDottedBorderInput {...args} />,
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 420 }}>
        <Story />
      </Box>
    ),
  ],
  render: (args) => <ControlledDottedBorderInput {...args} />,
};
