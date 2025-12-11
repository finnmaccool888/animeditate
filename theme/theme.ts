export const theme = {
  colors: {
    lavender: '#B8A4D4',
    midnight: '#1A1A2E',
    softWhite: '#F5F5F5',
    ink: '#2E2E3A',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: 16,
  fontSizes: {
    title: 36,
    subtitle: 20,
    body: 16,
    small: 14,
  },
} as const;

export type Theme = typeof theme;
