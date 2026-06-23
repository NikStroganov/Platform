import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { SegmentedTabs } from "@/components/ui/segmented-tabs";

const tabLabels = ["Profile", "Team", "Equity", "Documents", "Finish"];

const meta = {
  title: "UI/SegmentedTabs",
  component: SegmentedTabs,
  tags: ["autodocs"],
  args: {
    value: 0,
    count: 5,
    ariaLabel: "Startup setup sections",
    getTabLabel: (index: number) => tabLabels[index] ?? `Tab ${index + 1}`,
    onChange: () => undefined,
  },
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 4, step: 1 },
    },
    count: {
      control: { type: "number", min: 1, max: 8, step: 1 },
    },
    onChange: { action: "changed" },
    getTabLabel: { control: false },
    sx: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Segmented tabs matching the Figma component: horizontal clickable 100x8 px indicators with a 12 px gap. The component is controlled and supports clicks plus ArrowLeft, ArrowRight, Home, and End keyboard navigation.",
      },
    },
  },
} satisfies Meta<typeof SegmentedTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledSegmentedTabs(props: React.ComponentProps<typeof SegmentedTabs>) {
  const [value, setValue] = React.useState(props.value);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <SegmentedTabs
      {...props}
      value={value}
      onChange={(event, nextValue) => {
        setValue(nextValue);
        props.onChange(event, nextValue);
      }}
    />
  );
}

export const Default: Story = {
  render: (args) => <ControlledSegmentedTabs {...args} />,
};

export const WithContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Example usage as a tab switcher: the active segment controls the panel below.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value);

    React.useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 548 }}>
        <SegmentedTabs
          {...args}
          value={value}
          onChange={(event, nextValue) => {
            setValue(nextValue);
            (args.onChange as React.ComponentProps<typeof SegmentedTabs>["onChange"])(
              event,
              nextValue,
            );
          }}
        />

        <Box
          role="tabpanel"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {tabLabels[value] ?? `Tab ${value + 1}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The current tab panel changes by clicking a segment or using keyboard arrows.
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const Compact: Story = {
  args: {
    segmentWidth: 52,
  },
  render: (args) => <ControlledSegmentedTabs {...args} />,
};