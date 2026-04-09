import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Box from "@mui/material/Box";

import { AppButton } from "@/components/ui/app-button";

const stateButtonWidth = 175;

const meta = {
  title: "UI/AppButton",
  component: AppButton,
  tags: ["autodocs"],
  args: {
    children: "Войти",
  },
  argTypes: {
    children: {
      control: "text",
    },
    onClick: { action: "clicked" },
    color: {
      control: false,
    },
    variant: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: stateButtonWidth }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Проектная кнопка поверх MUI Button. Визуальные параметры и интерактивные состояния вынесены в `theme.ts`: default `#3D82FF`, hover `#528FFF`, active `#1F6EFF`, disabled с фоном `#F2F2F2`, бордером `#E6E6E6` и текстом `#C4C2BE`.",
      },
    },
  },
} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const FigmaStates: Story = {
  parameters: {
    layout: "padded",
    controls: {
      disable: true,
    },
    docs: {
      description: {
        story:
          "Сводка состояний из Figma. Hover и Click показаны принудительно, чтобы их можно было сравнить с макетом без интерактивного наведения.",
      },
    },
  },
  render: (args) => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "88px 1fr",
        alignItems: "center",
        columnGap: 4,
        rowGap: 3,
        width: 336,
      }}
    >
      <Box sx={{ fontSize: 16, fontWeight: 500, lineHeight: "22px" }}>Default</Box>
      <AppButton {...args} sx={{ width: stateButtonWidth }} />

      <Box sx={{ fontSize: 16, fontWeight: 500, lineHeight: "22px" }}>Hover</Box>
      <AppButton
        {...args}
        sx={{
          width: stateButtonWidth,
          backgroundColor: "primary.light",
          "&:hover": { backgroundColor: "primary.light" },
        }}
      />

      <Box sx={{ fontSize: 16, fontWeight: 500, lineHeight: "22px" }}>Click</Box>
      <AppButton
        {...args}
        sx={{
          width: stateButtonWidth,
          backgroundColor: "primary.dark",
          "&:hover": { backgroundColor: "primary.dark" },
          "&:active": { backgroundColor: "primary.dark" },
        }}
      />

      <Box sx={{ fontSize: 16, fontWeight: 500, lineHeight: "22px" }}>Disabled</Box>
      <AppButton {...args} disabled sx={{ width: stateButtonWidth }} />
    </Box>
  ),
};
