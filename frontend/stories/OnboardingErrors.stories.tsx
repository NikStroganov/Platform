import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Box from "@mui/material/Box";

import { ChipInput } from "@/components/shared/chip-input";
import { FieldInput, type FieldInputProps } from "@/components/shared/field-input";
import { AppButton } from "@/components/ui/app-button";
import { DottedBorderInput } from "@/components/ui/dotted-border-input";
import { InputCaption } from "@/components/ui/input-caption";
import { amountError, companyGradeError, experienceError, nicknameError } from "@/features/profile-completion/model/onboarding-validation";

const frame = { width: 3956, height: 1490 };
const firstSkills = ["Figma", "Adobe Photoshop", "Гений дизайна"];
const fullSkills = [...firstSkills, ...Array.from({ length: 17 }, (_, index) => `Навык ${index + 4}`)];
type Zoom = "fit" | "100" | "75" | "50" | "25";

function Slot({ x, y, width = 800, nodeId, children }: React.PropsWithChildren<{ x: number; y: number; width?: number; nodeId: string }>) {
  return <Box data-node-id={nodeId} sx={{ position: "absolute", left: x, top: y, width }}>{children}</Box>;
}

function ComparisonField({ id, ...props }: FieldInputProps) {
  return <FieldInput id={id} slotProps={{ input: { readOnly: true } }} {...props} />;
}

function MoneyField({ kind, value = "", id }: { kind: "salary" | "bonus"; value?: string; id: string }) {
  const error = amountError(value, kind, "RUB");
  return <ComparisonField id={id} value={value} error={Boolean(error)} helperText={error || undefined}
    placeholder={kind === "salary" ? "Зарплата" : "Сумма бонусов за год"}
    prefixImageSrc={kind === "salary" ? "/onboarding/compensation-coins.svg" : "/onboarding/compensation-gift-01.svg"}
    postfix="₽" sx={{ "& .MuiOutlinedInput-root": { gap: 2 }, "& .MuiInputAdornment-positionStart, & .MuiInputAdornment-positionStart img": { width: 28, height: 28 } }} />;
}

function NicknameExample({ value = "", taken = false, id }: { value?: string; taken?: boolean; id: string }) {
  const error = nicknameError(value) || (taken ? "Никнейм уже занят" : "");
  return (
    <Box sx={{ display: "grid", gap: 1, "& input": { height: 44, minHeight: 44 } }}>
      <DottedBorderInput id={id} value={value} readOnly placeholder="Введи свой никнейм" error={Boolean(error)}
        aria-label="Никнейм" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-caption` : undefined} />
      {error ? <InputCaption id={`${id}-caption`} error sx={{ textAlign: "center" }}>{error}</InputCaption> : null}
    </Box>
  );
}

function SkillsExample({ full = false }: { full?: boolean }) {
  const [value, setValue] = React.useState(full ? fullSkills : firstSkills);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    // The reference shows the final rows, with the first row partially scrolled out.
    if (full) {
      const viewport = ref.current?.querySelector('[data-testid="chip-input-chips-viewport"]');
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [full]);

  return (
    <Box ref={ref} sx={{ display: "grid", gap: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 30 }}>
        <InputCaption>{value.length}/20</InputCaption>
        <AppButton variant="text" onClick={() => setValue([])} sx={{ color: "#ff4d4f", fontSize: 14, fontWeight: 500, lineHeight: "22px", px: 1.5, py: 0.5, minWidth: 0, minHeight: 30 }}>Очистить</AppButton>
      </Box>
      <ChipInput active value={value} onChange={setValue} maxItems={20} hideInputAtLimit maxVisibleHeight={124}
        helperText={value.length >= 20 ? "Уберите навык, чтобы добавить другой" : undefined}
        deleteIconSrc="/onboarding/skills-x-close.svg" sx={{ width: "100%", minWidth: 0 }} />
    </Box>
  );
}

function ErrorFrame({ zoom }: { zoom: Zoom }) {
  const viewport = React.useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = React.useState(frame.width);

  React.useLayoutEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setAvailableWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const scale = zoom === "fit" ? Math.min(availableWidth / frame.width, 1) : Number.parseInt(zoom) / 100;
  const gradeError = companyGradeError("!?orkgm32");

  return (
    <Box ref={viewport} data-testid="figma-errors-viewport" sx={{ width: "100%", overflow: "auto", bgcolor: "#fff3f3" }}>
      <Box sx={{ position: "relative", width: frame.width * scale, height: frame.height * scale, overflow: "hidden" }}>
        <Box data-node-id="2075:6381" data-scale={scale} sx={{ position: "absolute", width: frame.width, height: frame.height,
          transform: `scale(${scale})`, transformOrigin: "top left", bgcolor: "#fff3f3", boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.1)" }}>
          <Slot x={100} y={100} width={280} nodeId="2075:6043"><NicknameExample id="comparison-nickname-empty" /></Slot>
          <Slot x={100} y={230} width={280} nodeId="2075:6019"><NicknameExample id="comparison-nickname-taken" value="Skannek" taken /></Slot>
          <Slot x={100} y={360} width={280} nodeId="2075:6020"><NicknameExample id="comparison-nickname-long" value="ывпмыфвпывфпвапиваиваив" /></Slot>
          <Slot x={100} y={490} width={280} nodeId="2075:6025"><NicknameExample id="comparison-nickname-short" value="1" /></Slot>

          <Slot x={423} y={100} nodeId="2075:6036"><ComparisonField id="comparison-years-empty" placeholder="Например, 5" postfix="лет" helperText="Если работаете меньше года, то указывайте «1»" /></Slot>
          {[
            { y: 230, value: "100", nodeId: "2074:5979" },
            { y: 360, value: "0", nodeId: "2074:5993" },
            { y: 490, value: "0.", nodeId: "2074:6001" },
          ].map(({ y, value, nodeId }) => <Slot key={nodeId} x={423} y={y} nodeId={nodeId}><ComparisonField id={`comparison-years-${y}`} value={value} postfix="лет" error helperText={experienceError(value)} /></Slot>)}

          <Slot x={1331} y={100} nodeId="2075:6052"><ComparisonField id="comparison-grade-empty" placeholder="Название или обозначение грейда" /></Slot>
          <Slot x={1331} y={230} nodeId="2075:6030"><ComparisonField id="comparison-grade-invalid" value="!?orkgm32" error helperText={gradeError} /></Slot>

          <Slot x={2200} y={100} nodeId="2075:6079"><MoneyField id="comparison-salary-empty" kind="salary" /></Slot>
          <Slot x={2200} y={230} nodeId="2075:6083"><MoneyField id="comparison-salary-max" kind="salary" value="5 000 000" /></Slot>
          <Slot x={2200} y={386} nodeId="2075:6094"><MoneyField id="comparison-salary-min" kind="salary" value="5 000" /></Slot>
          <Slot x={2200} y={542} nodeId="2075:6105"><MoneyField id="comparison-salary-integer" kind="salary" value="120 000, 28" /></Slot>

          <Slot x={3056} y={100} nodeId="2075:6063"><MoneyField id="comparison-bonus-empty" kind="bonus" /></Slot>
          <Slot x={3056} y={230} nodeId="2075:6116"><MoneyField id="comparison-bonus-max" kind="bonus" value="100 000 000" /></Slot>
          <Slot x={3056} y={386} nodeId="2075:6130"><MoneyField id="comparison-bonus-integer" kind="bonus" value="600 000, 28" /></Slot>

          <Slot x={100} y={928} nodeId="2075:6357"><SkillsExample /></Slot>
          <Slot x={100} y={1154} nodeId="2075:6248"><SkillsExample full /></Slot>
        </Box>
      </Box>
    </Box>
  );
}

const meta = {
  title: "Onboarding/Errors — Figma comparison",
  component: ErrorFrame,
  args: { zoom: "fit" },
  argTypes: { zoom: { name: "Масштаб", control: { type: "select", labels: { fit: "Вписать", "100": "100%", "75": "75%", "50": "50%", "25": "25%" } }, options: ["fit", "100", "75", "50", "25"] } },
  parameters: {
    layout: "fullscreen",
    figmaCanvas: true,
    docs: { description: { component: "Фрейм «Ошибки» 2075:6381: исходное полотно 3956 × 1490, координаты и значения из Figma. Используются компоненты и тексты валидации интерфейса. Масштаб 100% позволяет сравнить пиксель в пиксель; «Вписать» показывает весь фрейм. Поля зафиксированы для сравнения, навыки можно удалять и добавлять." } },
    design: { type: "figma", url: "https://www.figma.com/design/LW6thDHSXIyMXU4KHBK0Zc/Startup-Team?node-id=2075-6381" },
  },
} satisfies Meta<typeof ErrorFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FigmaFrame: Story = { name: "Ошибки — как в макете" };
