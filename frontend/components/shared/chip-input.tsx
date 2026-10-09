"use client";

import * as React from "react";

import Box, { type BoxProps } from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Checkbox from "@mui/material/Checkbox";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";

import { AppChip } from "@/components/shared/app-chip";
import { AppTextField } from "@/components/ui/app-text-field";

export type ChipInputOption = {
  value: string;
  label: string;
};

export type ChipInputProps = Omit<BoxProps, "onChange"> & {
  value: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  maxVisibleHeight?: number;
  options?: ChipInputOption[];
  active?: boolean;
  noOptionsText?: string;
};

const defaultPlaceholder = "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0432\u044b\u043a";
const defaultNoOptionsText = "\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e";
const skillsListLabel = "\u041d\u0430\u0432\u044b\u043a\u0438";
const deleteLabel = "\u0423\u0434\u0430\u043b\u0438\u0442\u044c";

const browserScrollbarSx = {
  scrollbarWidth: "thin",
  scrollbarColor: "#c4c2be #ffffff",
  "&::-webkit-scrollbar": { width: 18 },
  "&::-webkit-scrollbar-track": { bgcolor: "#ffffff" },
  "&::-webkit-scrollbar-thumb": {
    bgcolor: "#c4c2be",
    border: "6px solid #ffffff",
    borderRadius: "8px",
    backgroundClip: "padding-box",
  },
};

function optionLabelByValue(options: ChipInputOption[] | undefined, value: string) {
  return options?.find((option) => option.value === value)?.label ?? value;
}

function SelectedSkillChip({ label, onDelete }: { label: string; onDelete: () => void }) {
  return (
    <Box
      data-testid="chip-input-active-chip"
      sx={{
        height: 36,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        px: 2,
        py: 0.75,
        borderRadius: "32px",
        bgcolor: "#f2f2f2",
        color: "#111111",
        flexShrink: 0,
      }}
    >
      <Typography sx={{ fontSize: 16, fontWeight: 500, lineHeight: "24px" }}>{label}</Typography>
      <ButtonBase
        disableRipple
        aria-label={`${deleteLabel} ${label}`}
        onClick={onDelete}
        sx={{
          width: 16,
          height: 16,
          minWidth: 16,
          borderRadius: "50%",
          color: "#8c8c8c",
          fontSize: 20,
          fontWeight: 400,
          lineHeight: "16px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          "&:focus-visible": { outline: "2px solid #3d82ff", outlineOffset: 2 },
        }}
      >
        {"\u00d7"}
      </ButtonBase>
    </Box>
  );
}

function CheckboxIcon({ checked }: { checked?: boolean }) {
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        borderRadius: "4px",
        border: checked ? 0 : "1px solid #dedede",
        bgcolor: checked ? "#3d82ff" : "#ffffff",
        position: "relative",
        boxSizing: "border-box",
        "&::after": checked
          ? {
              content: '""',
              position: "absolute",
              left: "6px",
              top: "3px",
              width: "6px",
              height: "10px",
              border: "solid #ffffff",
              borderWidth: "0 2px 2px 0",
              transform: "rotate(45deg)",
            }
          : undefined,
      }}
    />
  );
}

export function ChipInput({
  value,
  onChange,
  placeholder = defaultPlaceholder,
  maxVisibleHeight = 168,
  options,
  active = false,
  noOptionsText = defaultNoOptionsText,
  sx,
  ...props
}: ChipInputProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [draft, setDraft] = React.useState("");
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
  const selectedValues = React.useMemo(() => new Set(value), [value]);
  const normalizedDraft = draft.trim().toLowerCase();
  const filteredOptions = React.useMemo(
    () => options?.filter((option) => option.label.toLowerCase().includes(normalizedDraft)) ?? [],
    [normalizedDraft, options],
  );


  React.useEffect(() => {
    if (!active || !isOptionsOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOptionsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [active, isOptionsOpen]);
  const updateValue = (nextValue: string[]) => onChange?.(nextValue);

  const addDraft = () => {
    const next = draft.trim();

    if (!next || value.includes(next)) {
      setDraft("");
      return;
    }

    updateValue([...value, next]);
    setDraft("");
  };

  const handleActiveBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOptionsOpen(false);
    }
  };

  const toggleValue = (nextValue: string) => {
    if (selectedValues.has(nextValue)) {
      updateValue(value.filter((current) => current !== nextValue));
      return;
    }

    updateValue([...value, nextValue]);
  };


  if (active) {
    return (
      <Box
        ref={rootRef}
        data-testid="chip-input-active"
        onFocus={() => setIsOptionsOpen(true)}
        onBlur={handleActiveBlur}
        sx={[{ width: 800, maxWidth: "100%" }, ...(Array.isArray(sx) ? sx : [sx])]}
        {...props}
      >
        <Box
          data-testid="chip-input-active-top"
          sx={{
            width: "100%",
            bgcolor: "#ffffff",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            borderBottomLeftRadius: isOptionsOpen ? 0 : "24px",
            borderBottomRightRadius: isOptionsOpen ? 0 : "24px",
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ position: "relative", width: "100%" }}>
            <Box
              data-testid="chip-input-chips-viewport"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                alignItems: "flex-start",
                alignContent: "flex-start",
                width: "100%",
                maxHeight: Math.min(maxVisibleHeight, 124),
                overflowY: "auto",
                ...browserScrollbarSx,
              }}
            >
              {value.map((item) => (
                <SelectedSkillChip
                  key={item}
                  label={optionLabelByValue(options, item)}
                  onDelete={() => updateValue(value.filter((current) => current !== item))}
                />
              ))}
            </Box>
            <InputBase
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addDraft();
                }
              }}
              placeholder={placeholder}
              inputProps={{ "aria-label": placeholder }}
              sx={{
                width: "100%",
                mt: 2,
                color: "#111111",
                fontFamily: "Manrope, var(--font-manrope), sans-serif",
                fontSize: 20,
                fontWeight: 500,
                lineHeight: "28px",
                "& .MuiInputBase-input": {
                  height: 28,
                  p: 0,
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: "28px",
                  "&::placeholder": {
                    color: "#adadad",
                    opacity: 1,
                  },
                },
              }}
            />
          </Box>
        </Box>
        {options && isOptionsOpen ? (
          <Box
            data-testid="chip-input-active-list"
            role="listbox"
            aria-label={skillsListLabel}
            sx={{
              width: "100%",
              bgcolor: "#ffffff",
              borderTop: "1px solid #dedede",
              borderBottomLeftRadius: "48px",
              borderBottomRightRadius: "48px",
              maxHeight: 301,
              overflowY: "auto",
              boxSizing: "border-box",
              ...browserScrollbarSx,
            }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const checked = selectedValues.has(option.value);

                return (
                  <ButtonBase
                    key={option.value}
                    data-testid="chip-input-active-option"
                    role="option"
                    aria-selected={checked}
                    disableRipple
                    onClick={() => toggleValue(option.value)}
                    sx={{
                      width: "100%",
                      minHeight: 60,
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 2,
                      px: 3,
                      py: 2,
                      bgcolor: "#ffffff",
                      color: "#323233",
                      textAlign: "left",
                      "&:focus-visible": { outline: "2px solid #3d82ff", outlineOffset: -2 },
                    }}
                  >
                    <Checkbox
                      checked={checked}
                      tabIndex={-1}
                      disableRipple
                      icon={<CheckboxIcon />}
                      checkedIcon={<CheckboxIcon checked />}
                      sx={{ width: 20, height: 20, p: 0, flexShrink: 0 }}
                    />
                    <Typography sx={{ fontSize: 20, fontWeight: 500, lineHeight: "28px", color: "#323233" }}>
                      {option.label}
                    </Typography>
                  </ButtonBase>
                );
              })
            ) : (
              <Typography sx={{ px: 3, py: 2, fontSize: 20, fontWeight: 500, lineHeight: "28px", color: "#adadad" }}>
                {noOptionsText}
              </Typography>
            )}
          </Box>
        ) : null}
      </Box>
    );
  }

  return (
    <Box sx={[{ bgcolor: "#ffffff", borderRadius: "24px", p: 3, width: "100%", maxWidth: 800 }, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
      <Box sx={{ position: "relative" }}>
        <Box
          data-testid="chip-input-chips-viewport"
          sx={{ display: "flex", flexWrap: "wrap", alignContent: "flex-start", gap: 1, height: Math.min(maxVisibleHeight, 124), overflowY: "auto", mb: 2, ...browserScrollbarSx }}
        >
          {value.map((item) => (
            <AppChip key={item} label={optionLabelByValue(options, item)} onDelete={() => updateValue(value.filter((current) => current !== item))} />
          ))}
        </Box>
      </Box>
      <AppTextField
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            addDraft();
          }
        }}
        placeholder={placeholder}
        sx={{ "& .MuiOutlinedInput-root": { bgcolor: "transparent" }, "& .MuiOutlinedInput-notchedOutline": { border: 0 } }}
      />
    </Box>
  );
}