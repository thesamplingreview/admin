import Box from '@mui/material/Box';
import FasIcon from '@/components/FasIcon.jsx';

export default function AssetItem({
  src,
  type = 'image', // image, video, file
  size = '80px',
  itemProps = {},
  onClick,
  ...props
}) {
  return (
    <Box
      {...props}
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={size}
      height={size}
      color="text.main"
      overflow="hidden"
      bgcolor="var(--bg-500)"
      border="1px solid transparent"
      borderRadius=".5em"
      sx={{
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
          color: 'primary.main',
          borderColor: 'text.light',
        },
      }}
      onClick={onClick}
    >
      {type === 'image' && (
        <img
          src={src}
          alt=""
          width="100"
          height="100"
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          {...itemProps}
        />
      )}
      {type === 'video' && (
        <video
          width="100"
          height="100"
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
          {...itemProps}
        >
          <source src={src} />
          Video
        </video>
      )}
      {type === 'file' && (
        <FasIcon
          name="fa-file-lines"
          color="primary.main"
          fontSize="1.5em"
          {...itemProps}
        />
      )}
    </Box>
  );
}
