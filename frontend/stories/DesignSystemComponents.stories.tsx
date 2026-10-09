import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { AppButton } from "@/components/ui/app-button";
import { AppChip } from "@/components/shared/app-chip";
import { AppStepper } from "@/components/shared/app-stepper";
import { ChipInput } from "@/components/shared/chip-input";
import { ChipSuggestion } from "@/components/shared/chip-suggestion";
import { CityButtons, type CityButtonItem } from "@/components/shared/city-buttons";
import { CompanyButtons, type CompanyButtonItem } from "@/components/shared/company-buttons";
import { FieldInput } from "@/components/shared/field-input";
import { GradeSelect } from "@/components/shared/grade-select";
import { SearchInput } from "@/components/shared/search-input";
import { SpecialityButtons, type SpecialityButtonItem } from "@/components/shared/speciality-buttons";
import { SwitchButtons } from "@/components/shared/switch-buttons";
import { ToggleWithLabel } from "@/components/shared/toggle-with-label";
import CoinsStackedIconAsset from "@/components/shared/icon/icons/coins-stacked-03.svg";

function logoUrl(label: string, colorHex: string) {
  const text = encodeURIComponent(label.slice(0, 2).toUpperCase());
  const color = colorHex.replace("#", "%23");

  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'><rect width='96' height='96' rx='48' fill='${color}'/><text x='48' y='56' text-anchor='middle' font-family='Arial' font-size='26' font-weight='700' fill='white'>${text}</text></svg>`;
}

const companies: CompanyButtonItem[] = [
  { value: "vk", label: "Вконтакте", colorHex: "#1ca2d3", logoUrl: logoUrl("vk", "#0877ff") },
  { value: "sber", label: "Сбербанк", colorHex: "#239e09", logoUrl: logoUrl("sb", "#21a038") },
  { value: "dzen", label: "Дзен", colorHex: "#757575", backgroundHex: "#eaeaea", logoUrl: logoUrl("dz", "#222222") },
  { value: "ozon", label: "OZON", colorHex: "#4489dd", logoUrl: logoUrl("oz", "#005bff") },
  { value: "wb", label: "WildBerries", colorHex: "#d546dc", logoUrl: logoUrl("wb", "#d70fca") },
  { value: "samokat", label: "Самокат", colorHex: "#e25050", logoUrl: logoUrl("sm", "#ff335f") },
];

const specialities: SpecialityButtonItem[] = [
  { value: "mobile", label: "Мобильный разработчик", colorHex: "#1ca2d3" },
  { value: "fullstack", label: "Fullstack-разработчик", colorHex: "#1ca2d3" },
  { value: "frontend", label: "Frontend-разработчик", colorHex: "#1ca2d3" },
  { value: "backend", label: "Backend-разработчик", colorHex: "#1ca2d3" },
  { value: "admin", label: "Системный администратор", colorHex: "#d4561e" },
  { value: "graphic", label: "Графический дизайнер", colorHex: "#b48302" },
  { value: "ui", label: "UX/UI Дизайнер", colorHex: "#b48302" },
  { value: "qa", label: "QA-инженер (тестировщик)", colorHex: "#239e09" },
  { value: "devops", label: "DevOps-инженер", colorHex: "#239e09" },
];


const cities: CityButtonItem[] = [
  {
    value: "moscow",
    label: "Москва",
    colorHex: "#e25050",
    backgroundHex: "rgba(180, 2, 2, 0.15)",
    borderHex: "rgba(180, 2, 2, 0.2)",
  },
  {
    value: "saint-petersburg",
    label: "Санкт-Петербург",
    colorHex: "#4489dd",
    backgroundHex: "rgba(28, 110, 211, 0.15)",
    borderHex: "rgba(28, 110, 211, 0.2)",
  },
  {
    value: "kazan",
    label: "Казань",
    colorHex: "#b48302",
    backgroundHex: "#f8edc4",
    borderHex: "rgba(180, 131, 2, 0.2)",
  },
  {
    value: "nizhny-novgorod",
    label: "Нижний новгород",
    colorHex: "#239e09",
    backgroundHex: "rgba(55, 211, 28, 0.15)",
    borderHex: "rgba(28, 211, 34, 0.2)",
  },
];

const skillOptions = [
  { value: "figma", label: "Figma" },
  { value: "photoshop", label: "Adobe Photoshop" },
  { value: "skill-3", label: "Навык 3" },
  { value: "skill-4", label: "Навык 4" },
  { value: "skill-5", label: "Навык 5" },
];
const searchResults = [
  { value: "vk", label: "Вконтакте", description: "Компания" },
  { value: "sber", label: "Сбербанк", description: "Компания" },
  { value: "frontend", label: "Frontend-разработчик", description: "Специальность" },
  { value: "designer", label: "UX/UI Дизайнер", description: "Специальность" },
  { value: "figma", label: "Figma", description: "Навык" },
  { value: "photoshop", label: "Adobe Photoshop", description: "Навык" },
];

const meta = {
  title: "UI/DesignSystemComponents",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Компоненты из Figma-фрейма 1970-5263. Реализация опирается на MUI, динамические цвета принимает hex-пропсами, а изображения — URL-строками. Если состояние отсутствует в макете, оно импровизируется по общему стилю проекта.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;
type ComponentPreviewPanelProps = React.PropsWithChildren<{
  sx?: React.ComponentProps<typeof Box>["sx"];
}>;

function ComponentPreviewPanel({ children, sx }: ComponentPreviewPanelProps) {
  return (
    <Box
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          maxWidth: "none",
          boxSizing: "border-box",
          p: 3,
          bgcolor: "#f6f7f9",
          borderRadius: "8px",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}

export const Stepper: Story = {
  render: () => {
    const [value, setValue] = React.useState(3);

    return (
      <ComponentPreviewPanel>
        <Typography>1. Stepper</Typography>
        <AppStepper count={8} value={value} onChange={setValue} />
      </ComponentPreviewPanel>
    );
  },
};

export const ButtonStyle: Story = {
  render: () => (
    <ComponentPreviewPanel>
      <Typography>2. Button</Typography>
      <AppButton appStyle="figma" sx={{ width: 548 }}>Далее</AppButton>
      <AppButton appStyle="figma" disabled sx={{ width: 548 }}>Далее</AppButton>
    </ComponentPreviewPanel>
  ),
};

export const SearchInputStory: Story = {
  name: "Search input",
  render: () => (
    <ComponentPreviewPanel>
      <Typography>3. Search input</Typography>
      <SearchInput placeholder="Поиск компании или навыка" sx={{ maxWidth: 548 }} />
      <SearchInput clearable defaultValue="Бали" placeholder="Поиск компании или навыка" sx={{ maxWidth: 548 }} />
      <SearchInput disabled placeholder="Поиск компании или навыка" sx={{ maxWidth: 548 }} />
    </ComponentPreviewPanel>
  ),
};

export const SearchInputWithResults: Story = {
  name: "Search input / Results",
  parameters: {
    docs: {
      description: {
        story:
          "Опциональный пример выпадающих результатов без отдельного Figma-макета. Передайте options, чтобы включить список; onOptionSelect вызывается при выборе результата, showOptionsOnFocus открывает список при фокусе, а noOptionsText задает empty state.",
      },
    },
  },
  render: () => {
    const [value, setValue] = React.useState("");

    return (
      <ComponentPreviewPanel>
        <Typography>3.1 Search input results</Typography>
        <SearchInput
          clearable
          value={value}
          onChange={(event) => setValue(event.target.value)}
          options={searchResults}
          onOptionSelect={(option) => setValue(option.label)}
          showOptionsOnFocus
          noOptionsText="Ничего не найдено"
          placeholder="Поиск компании или навыка"
          sx={{ maxWidth: 548 }}
        />
      </ComponentPreviewPanel>
    );
  },
};

export const FieldInputStory: Story = {
  name: "Field input",
  parameters: {
    docs: {
      description: {
        story:
          "FieldInput повторяет два Figma-состояния: prefixImageSrc добавляет изображение слева 32x32, postfix выводит текст справа. Разделитель показывается только в варианте с prefixImageSrc и postfix, как в salary-макете; postfix без prefixImageSrc отображается без разделителя, как в years-макете.",
      },
    },
  },
  render: () => (
    <ComponentPreviewPanel>
      <Typography>3.2 Field input</Typography>
      <FieldInput
        prefixImageSrc={(CoinsStackedIconAsset as unknown as { src: string }).src}
        prefixImageAlt=""
        postfix="₽"
        type="number"
        placeholder="Зарплата"
        sx={{ width: 800, maxWidth: "100%" }}
      />
      <FieldInput postfix="лет" placeholder="Например, 5" sx={{ width: 800, maxWidth: "100%" }} />
    </ComponentPreviewPanel>
  ),
};

export const CompanyButtonsStory: Story = {
  name: "Company buttons",
  render: () => {
    const [value, setValue] = React.useState("vk");

    return (
      <ComponentPreviewPanel>
        <Typography>4. Company buttons</Typography>
        <CompanyButtons items={companies} value={value} onChange={setValue} />
        <CompanyButtons
          items={[{ value: "fallback", label: "Без лого", colorHex: "#3d82ff" }]}
          value="fallback"
        />
      </ComponentPreviewPanel>
    );
  },
};

export const SwitchButtonsStory: Story = {
  name: "Switch buttons",
  render: () => {
    const [value, setValue] = React.useState("office");

    return (
      <ComponentPreviewPanel>
        <Typography>5. Switch buttons</Typography>
        <SwitchButtons
          value={value}
          onChange={setValue}
          options={[
            { value: "office", label: "Офис" },
            { value: "hybrid", label: "Гибрид" },
            { value: "remote", label: "Удаленно" },
          ]}
        />
      </ComponentPreviewPanel>
    );
  },
};

export const SpecialityButtonsStory: Story = {
  name: "Speciality buttons",
  render: () => {
    const [value, setValue] = React.useState<string[]>(["mobile", "qa"]);

    return (
      <ComponentPreviewPanel>
        <Typography>6. Speciality buttons</Typography>
        <SpecialityButtons
          items={specialities}
          value={value}
          onChange={(nextValue) =>
            setValue((current) =>
              current.includes(nextValue)
                ? current.filter((item) => item !== nextValue)
                : [...current, nextValue],
            )
          }
        />
      </ComponentPreviewPanel>
    );
  },
};


export const CityButtonsStory: Story = {
  name: "City buttons",
  parameters: {
    docs: {
      description: {
        story:
          "CityButtons повторяет Figma-вариант 1958:6261: компактные MUI ButtonBase-чипы с gap 16, radius 12, padding 16/4 и Manrope Semibold 16/28. Цвета можно задавать для каждой кнопки через colorHex, backgroundHex и borderHex.",
      },
    },
  },
  render: () => {
    const [value, setValue] = React.useState("moscow");

    return (
      <ComponentPreviewPanel>
        <Typography>6.1 City buttons</Typography>
        <CityButtons items={cities} value={value} onChange={setValue} />
      </ComponentPreviewPanel>
    );
  },
};
export const GradeSelectStory: Story = {
  name: "Grade select",
  render: () => {
    const [value, setValue] = React.useState("Джун");

    return (
      <ComponentPreviewPanel>
        <Typography>7. Grade select</Typography>
        <GradeSelect
          options={["Стажер", "Джун", "Джун +", "Мидл", "Сеньор"]}
          value={value}
          onChange={setValue}
        />
      </ComponentPreviewPanel>
    );
  },
};

export const ToggleWithLabelStory: Story = {
  name: "Toggle with label",
  render: () => {
    const [checked, setChecked] = React.useState(true);

    return (
      <ComponentPreviewPanel>
        <Typography>8. Toggle with label</Typography>
        <ToggleWithLabel label="Показывать только подходящие вакансии" checked={checked} onChange={setChecked} />
        <ToggleWithLabel label="Disabled" checked={false} disabled />
      </ComponentPreviewPanel>
    );
  },
};

export const ChipStory: Story = {
  name: "Chip",
  render: () => (
    <ComponentPreviewPanel>
      <Typography>9. Chip</Typography>
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <AppChip label="Навык 6" onDelete={() => undefined} />
        <AppChip label="Figma" colorHex="#3d82ff" backgroundHex="#e6efff" onDelete={() => undefined} />
        <AppChip label="Disabled" disabled onDelete={() => undefined} />
      </Stack>
    </ComponentPreviewPanel>
  ),
};

export const ChipInputStory: Story = {
  name: "Chip input",
  render: () => {
    const [value, setValue] = React.useState([
      "Figma",
      "Adobe Photoshop",
      "Гений дизайна",
      "Навык 4",
      "Навык 5",
      "Навык 6",
      "Навык 7",
      "Навык 8",
      "Навык 9",
      "Навык 10",
    ]);

    return (
      <ComponentPreviewPanel>
        <Typography>10. Chip input</Typography>
        <ChipInput value={value} onChange={setValue} />
      </ComponentPreviewPanel>
    );
  },
};


const chipInputOverflowValues = [
  "Figma",
  "Adobe Photoshop",
  ...Array.from({ length: 20 }, (_, index) => `Design skill ${index + 3}`),
];

const chipInputOverflowOptions = chipInputOverflowValues.map((value) => ({ value, label: value }));

export const ChipInputOverflowStory: Story = {
  name: "Chip input / Overflow",
  parameters: {
    docs: {
      description: {
        story:
          "Overflow state from Figma 1958:6550, combined with the active search mode. The result list contains the same skills as the selected-chip overflow area; selection is synchronized in both directions. Selected chips stay in a 124px viewport; when their content exceeds it, the component exposes a 18px Figma scrollbar with 6px thumb and scroll buttons.",
      },
    },
  },
  render: () => {
    const [value, setValue] = React.useState(chipInputOverflowValues);

    return (
      <ComponentPreviewPanel>
        <Typography>10.1 Chip input overflow</Typography>
        <ChipInput active options={chipInputOverflowOptions} value={value} onChange={setValue} />
      </ComponentPreviewPanel>
    );
  },
};


export const ChipInputActiveStory: Story = {
  name: "Chip input / Active search",
  parameters: {
    docs: {
      description: {
        story:
          "Active state из Figma 1958:6735: selected chips сверху синхронизированы с чекбоксами в списке. Поле ввода фильтрует options по label, клик по строке или чекбоксу добавляет/удаляет навык, удаление chip снимает чекбокс.",
      },
    },
  },
  render: () => {
    const [value, setValue] = React.useState(["figma", "photoshop"]);

    return (
      <ComponentPreviewPanel>
        <Typography>10.1 Chip input active search</Typography>
        <ChipInput active options={skillOptions} value={value} onChange={setValue} />
      </ComponentPreviewPanel>
    );
  },
};
export const ChipSuggestionStory: Story = {
  name: "Chip suggestion",
  render: () => (
    <ComponentPreviewPanel>
      <Typography>11. Chip suggestion</Typography>
      <ChipSuggestion
        items={[
          { value: "figma", label: "Figma" },
          { value: "photoshop", label: "Photoshop", imageUrl: logoUrl("ps", "#31a8ff") },
          { value: "illustrator", label: "Illustrator", imageUrl: logoUrl("ai", "#ff9a00") },
          { value: "research", label: "Research" },
        ]}
      />
    </ComponentPreviewPanel>
  ),
};

export const FigmaOverview: Story = {
  render: () => (
    <ComponentPreviewPanel>
      <AppStepper count={8} value={0} />
      <Box sx={{ width: 548 }}><AppButton appStyle="figma" fullWidth>Далее</AppButton></Box>
      <SearchInput placeholder="Поиск" sx={{ maxWidth: 548 }} />
      <FieldInput prefixImageSrc={(CoinsStackedIconAsset as unknown as { src: string }).src} postfix="₽" type="number" inputMode="numeric" placeholder="Зарплата" sx={{ maxWidth: 548 }} />
      <CompanyButtons items={companies} value="vk" />
      <SwitchButtons
        value="office"
        options={[
          { value: "office", label: "Офис" },
          { value: "hybrid", label: "Гибрид" },
          { value: "remote", label: "Удаленно" },
        ]}
      />
      <SpecialityButtons items={specialities} value={["mobile", "qa"]} />
      <CityButtons items={cities} value="moscow" />
      <GradeSelect options={["Стажер", "Джун", "Джун +"]} value="Джун" />
      <ToggleWithLabel label="Показывать только подходящие вакансии" checked />
      <AppChip label="Навык 6" onDelete={() => undefined} />
      <ChipInput value={["Figma", "Adobe Photoshop", "Гений дизайна"]} />
      <ChipSuggestion items={["Figma", "Photoshop", "Illustrator", "Research"].map((label) => ({ value: label, label }))} />
    </ComponentPreviewPanel>
  ),
};












