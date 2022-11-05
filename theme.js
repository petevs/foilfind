import { TypographyStylesProvider } from "@mantine/core";

export const theme = {
  cursorType: 'pointer',
  globalStyles: (theme) => ({
    'a': {
      color: theme.colors.dark,
    },
    'a:hover' : {
        textDecoration: 'none !important',
      },
  }),
  headings: {
    sizes: {
      h1: {
        marginTop: 0,
        marginBottom: 0,
      },
      h2: {
        marginTop: 0
      },
    }
  },
  other: {
    headerHeight: 100
  },
}