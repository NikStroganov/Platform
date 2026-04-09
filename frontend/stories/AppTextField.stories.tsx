import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Box from "@mui/material/Box";

import { AppTextField } from "@/components/ui/app-text-field";

const meta = {
  title: "UI/AppTextField",
  component: AppTextField,
  tags: ["autodocs"],
  args: {
    label: "Почта",
    placeholder: "Почта",
  },
  argTypes: {
    onChange: { action: "changed" },
    type: {
      control: "select",
      options: ["text", "password", "email", "search"],
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 320 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Проектная обертка над MUI TextField. Наследует глобальную MUI theme и используется как единая точка входа для инпутов в приложении. Для `type=\"password\"` автоматически показывает кнопку переключения видимости пароля с иконками из `public/eye-on.svg` и `public/eye-off.svg`. В error-состоянии компонент добавляет иконку из `public/input-error.svg`.",
      },
    },
  },
} satisfies Meta<typeof AppTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    label: "Почта",
    defaultValue: "Input",
  },
};

export const Error: Story = {
  args: {
    label: "Почта",
    placeholder: "Почта",
    error: true,
    helperText: "Неверный формат почты",
  },
};

export const Disabled: Story = {
  args: {
    label: "Почта",
    placeholder: "Почта",
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    type: "password",
    label: "Пароль",
    defaultValue: "Password123",
    placeholder: "Введите пароль",
    helperText: "Нажмите на иконку, чтобы показать или скрыть пароль",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Состояние пароля использует встроенный toggle видимости. Компонент сам добавляет кнопку в правый adornment и меняет `type` между `password` и `text`.",
      },
    },
  },
};

export const ErrorPassword: Story = {
  args: {
    type: "password",
    label: "Пароль",
    defaultValue: "Password123",
    error: true,
    helperText: "Минимум 8 символов",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Если поле пароля находится в error-состоянии, справа одновременно показываются иконка ошибки и переключатель видимости пароля.",
      },
    },
  },
};

export const Showcase: Story = {
  render: () => (
    <Box sx={{ display: "grid", gap: 2, width: 320 }}>
      <AppTextField label="Почта" placeholder="Почта" />
      <AppTextField label="Почта" defaultValue="Input" />
      <AppTextField
        label="Почта"
        error
        helperText="Неверный формат почты"
        defaultValue="Input"
      />
      <AppTextField
        type="password"
        label="Пароль"
        defaultValue="Password123"
        helperText="Переключатель справа показывает и скрывает пароль"
      />
      <AppTextField
        type="password"
        label="Пароль"
        defaultValue="Password123"
        error
        helperText="Минимум 8 символов"
      />
    </Box>
  ),
};
