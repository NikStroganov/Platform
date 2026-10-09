"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { useForkRef } from "@mui/material/utils";

import { Icon } from "@/components/shared/icon";
import SearchClearCircleIcon from "@/components/shared/icon/icons/search-clear-circle.svg";
import SearchOutlinedIcon from "@/components/shared/icon/icons/search-outlined-a.svg";
import { AppTextField, type AppTextFieldProps } from "@/components/ui/app-text-field";

export type SearchInputOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

export type SearchInputProps<TOption extends SearchInputOption = SearchInputOption> = AppTextFieldProps & {
  clearable?: boolean;
  clearButtonAriaLabel?: string;
  getOptionLabel?: (option: TOption) => string;
  maxVisibleOptions?: number;
  noOptionsText?: React.ReactNode;
  onClear?: () => void;
  onOptionSelect?: (option: TOption) => void;
  options?: readonly TOption[];
  showOptionsOnFocus?: boolean;
};

export function SearchInput<TOption extends SearchInputOption = SearchInputOption>({
  placeholder = "Поиск",
  slotProps,
  sx,
  clearable = false,
  clearButtonAriaLabel = "Очистить поиск",
  getOptionLabel = (option) => option.label,
  maxVisibleOptions = 6,
  noOptionsText = "Ничего не найдено",
  onClear,
  onOptionSelect,
  options,
  showOptionsOnFocus = false,
  value,
  defaultValue,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  inputRef,
  ...props
}: SearchInputProps<TOption>) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const inputElementRef = React.useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const handleInputRef = useForkRef(inputElementRef, inputRef);
  const isControlled = value !== undefined;
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    defaultValue === undefined || defaultValue === null ? "" : String(defaultValue),
  );
  const inputSlotProps = typeof slotProps?.input === "function" ? undefined : slotProps?.input;
  const currentValue = String(isControlled ? (value ?? "") : uncontrolledValue);
  const normalizedValue = currentValue.trim().toLowerCase();
  const shouldShowClearButton = clearable && currentValue.length > 0 && !props.disabled;
  const hasOptions = options !== undefined;

  const filteredOptions = React.useMemo(() => {
    if (!options) {
      return [];
    }

    const filtered = normalizedValue
      ? options.filter((option) => getOptionLabel(option).toLowerCase().includes(normalizedValue))
      : [...options];

    return filtered.slice(0, maxVisibleOptions);
  }, [getOptionLabel, maxVisibleOptions, normalizedValue, options]);

  const shouldShowDropdown =
    hasOptions &&
    isDropdownOpen &&
    !props.disabled &&
    (showOptionsOnFocus || currentValue.length > 0);

  function emitChange(nextValue: string) {
    onChange?.({
      target: { value: nextValue },
      currentTarget: { value: nextValue },
    } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
  }

  function setInputValue(nextValue: string) {
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }

    if (inputElementRef.current) {
      inputElementRef.current.value = nextValue;
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!isControlled) {
      setUncontrolledValue(event.target.value);
    }

    if (hasOptions) {
      setIsDropdownOpen(true);
    }

    onChange?.(event);
  }

  function handleClear() {
    setInputValue("");
    inputElementRef.current?.focus();
    setIsDropdownOpen(false);
    onClear?.();
    emitChange("");
  }

  function handleOptionSelect(option: TOption) {
    if (option.disabled) {
      return;
    }

    const nextValue = getOptionLabel(option);
    setInputValue(nextValue);
    setIsDropdownOpen(false);
    inputElementRef.current?.focus();
    onOptionSelect?.(option);
    emitChange(nextValue);
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (hasOptions) {
      setIsDropdownOpen(true);
    }

    onFocus?.(event);
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    window.setTimeout(() => {
      if (!rootRef.current?.contains(document.activeElement)) {
        setIsDropdownOpen(false);
      }
    }, 0);

    onBlur?.(event);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      setIsDropdownOpen(false);
    }

    if (event.key === "Enter" && shouldShowDropdown && filteredOptions[0] && !filteredOptions[0].disabled) {
      event.preventDefault();
      handleOptionSelect(filteredOptions[0]);
    }

    onKeyDown?.(event);
  }

  const clearButton = shouldShowClearButton ? (
    <ButtonBase
      aria-label={clearButtonAriaLabel}
      onClick={handleClear}
      sx={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        flexShrink: 0,
        color: "#adadad",
      }}
    >
      <Icon component={SearchClearCircleIcon} sx={{ width: 24, height: 24, display: "block" }} />
    </ButtonBase>
  ) : null;

  const endAdornment =
    inputSlotProps?.endAdornment || clearButton ? (
      <InputAdornment position="end">
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, flex: "none" }}>
          {inputSlotProps?.endAdornment}
          {clearButton}
        </Box>
      </InputAdornment>
    ) : undefined;

  return (
    <ClickAwayListener onClickAway={() => setIsDropdownOpen(false)}>
      <Box ref={rootRef} sx={{ position: "relative", width: props.fullWidth === false ? "auto" : "100%" }}>
        <AppTextField
          type="search"
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          inputRef={handleInputRef}
          sx={[
            {
              "& .MuiOutlinedInput-root": {
                height: 64,
                minHeight: 64,
                gap: 2,
                alignItems: "center",
                borderRadius: "64px",
                bgcolor: "#ffffff",
                p: "0 24px",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: 0,
                  borderRadius: "64px",
                },
                "&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: 0,
                },
                "&.Mui-disabled": {
                  bgcolor: "#ffffff",
                },
              },
              "& .MuiInputAdornment-positionStart": {
                width: 32,
                height: 32,
                maxHeight: "none",
                m: 0,
                color: "#adadad",
              },
              "& .MuiInputAdornment-positionEnd": {
                width: "auto",
                height: 24,
                maxHeight: "none",
                m: 0,
                color: "#adadad",
              },
              "& .MuiOutlinedInput-input": {
                alignSelf: "center",
                flex: 1,
                minWidth: 0,
                height: 28,
                p: 0,
                fontFamily: "Manrope, var(--font-manrope), sans-serif",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#111111",
                "&::placeholder": {
                  color: "#adadad",
                  fontFamily: "Manrope, var(--font-manrope), sans-serif",
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "28px",
                  opacity: 1,
                },
                "&:focus::placeholder": {
                  opacity: 1,
                },
                "&::-webkit-search-cancel-button": {
                  display: "none",
                },
              },
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
          slotProps={{
            ...slotProps,
            input: {
              ...inputSlotProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Icon component={SearchOutlinedIcon} sx={{ width: 32, height: 32, display: "block" }} />
                </InputAdornment>
              ),
              endAdornment,
            },
          }}
          {...props}
        />
        {shouldShowDropdown ? (
          <Popper
            open
            anchorEl={rootRef.current}
            placement="bottom-start"
            sx={{ width: rootRef.current?.clientWidth, zIndex: (theme) => theme.zIndex.modal }}
          >
            <Paper
              elevation={0}
              role="listbox"
              sx={{
                mt: 1,
                maxHeight: 280,
                overflowY: "auto",
                borderRadius: "16px",
                border: "1px solid #e6e6e6",
                boxShadow: "0 16px 40px rgba(17, 17, 17, 0.12)",
              }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <ButtonBase
                    key={option.value}
                    role="option"
                    disabled={option.disabled}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleOptionSelect(option)}
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 0.5,
                      p: "12px 24px",
                      textAlign: "left",
                      color: "#111111",
                      "&:hover, &:focus-visible": {
                        bgcolor: "#f8f7fc",
                      },
                      "&.Mui-disabled": {
                        color: "#adadad",
                      },
                    }}
                  >
                    <Box sx={{ fontSize: 16, fontWeight: 600, lineHeight: "22px" }}>{getOptionLabel(option)}</Box>
                    {option.description ? (
                      <Box sx={{ color: "#757575", fontSize: 14, fontWeight: 500, lineHeight: "18px" }}>
                        {option.description}
                      </Box>
                    ) : null}
                  </ButtonBase>
                ))
              ) : (
                <Box sx={{ color: "#adadad", fontSize: 16, fontWeight: 500, lineHeight: "22px", p: "16px 24px" }}>
                  {noOptionsText}
                </Box>
              )}
            </Paper>
          </Popper>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}
