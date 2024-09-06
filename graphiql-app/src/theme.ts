'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#10608F',
      dark: '#041B33',
      light: '#1A9ED6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF3C82',
      light: '#F6F1F3',
      dark: '#C42C5F',
      contrastText: '#041B33',
    },
    text: {
      primary: '#041B33',
      secondary: '#6B6B6B',
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'secondary',
        position: 'sticky',
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 8px rgba(255, 60, 130, 0.05)',
          transition: '0.3s',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          alignItems: 'start',
          paddingLeft: '0px',
          width: 'auto',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '0px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#FF3C82',
          transition: 'opacity 0.3s',
          padding: '4px 16px',
          '@media (any-hover: hover)': {
            '&:hover': {
              backgroundColor: '#FF3C82',
              opacity: 0.8,
            },
          },
        },
      },
    },
  },

  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    h1: {
      fontSize: '1.6rem',
    },
    h2: {
      fontSize: '1.4rem',
    },
  },
});
