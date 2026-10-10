const hexColorPattern = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

export function resolveHexColor(value: string | undefined, fallback: string) {
  return value && hexColorPattern.test(value) ? value : fallback;
}

function hexToRgb(hex: string) {
  const normalized =
    hex.length === 4 ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex;
  const value = Number.parseInt(normalized.slice(1, 7), 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

export function alphaHex(hex: string | undefined, fallback: string, alpha: number) {
  const color = resolveHexColor(hex, fallback);
  const { r, g, b } = hexToRgb(color);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
