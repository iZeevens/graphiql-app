'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
  },
  typography: {
    h1: {
      fontSize: '1.6rem',
    },
  },
});
