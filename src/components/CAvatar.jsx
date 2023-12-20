import { useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import { stringToColor } from '@/helpers/utils';

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
