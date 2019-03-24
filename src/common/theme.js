const colors = {
  white: '#e8edf3',
  blue: '#1E106C',
  yellow: '#fdd835',
  lightYellow: '#ffeb3b',
  amber: '#ffc107',
  green: '#8bc34a',
  red: '#f44336',
  azure: '#3f51b5',
  brown: '#6f4e37',
};

const theme = {
  ...colors,
  background: colors.white,
  accent: colors.blue,

  screen: {
    small: '768px',
    medium: '992px',
    large: '1200px',
  },
};

export default theme;
