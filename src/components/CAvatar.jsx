import { useMemo } from 'react';
import Avatar from '@mui/material/Avatar';

// @ref: https://mui.com/material-ui/react-avatar/#letter-avatars
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function CAvatar({ name, src, ...props }) {
  const stringProps = useMemo(() => {
    return {
      ...props,
      sx: {
        ...props.sx,
        bgcolor: stringToColor(name),
      },
      children: name.trim().charAt(0).toUpperCase(),
    };
  }, [name, props]);

  return (
    <Avatar {...stringProps} src={src} />
  );
}
