import { createTheme } from '@mui/material/styles';

// @ref: https://mui.com/material-ui/customization/theming/
const theme = createTheme({
  palette: {
    primary: {
      main: '#716aca',
      // main: '#62e2e7',
    },
    secondary: {
      main: '#FB8F34',
      contrastText: '#fff',
    },
    success: {
      main: '#2ea782',
    },
    error: {
      main: '#f4516c',
    },
    warning: {
      main: '#ffb822',
    },
    info: {
      main: '#36a3f7',
    },
    background: {
      light: '#ffffff',
      main: '#edefff',
      dark: '#dddddd',
    },
    text: {
      light: '#828ea2',
      main: '#3f4047',
      dark: '#0f0f11',
    },
    border: {
      main: '#dee2e6',
    },
  },
  typography: {
    fontFamily: "'Poppins', STXihei, Helvetica, Arial, sans-serif",
    fontSize: 15,
    h1: {
      fontSize: '2.25rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    label: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          padding: '0.5em 1.5em',
          textTransform: 'none',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          fontSize: '1em',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '1em',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1em',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '1em',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
        },
        label: {
          fontSize: '.875em',
        },
      },
    },
  },
});

export default theme;
