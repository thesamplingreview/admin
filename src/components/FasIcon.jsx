import classNames from 'classnames';
import Box from '@mui/material/Box';

export default function FasIcon({ name, className, ...props }) {
  return (
    <Box
      component="i"
      variant="inherit"
      className={classNames(className, 'fas', name)}
      {...props}
    />
  );
}
