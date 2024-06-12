import Box from '@mui/material/Box';

export default function SplashCover({ theme = 'design' }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'background.main',
      }}
    >
      <Box
        component="img"
        src={`https://unsplash.qutebox.com?topic=${theme}`}
        alt=""
        width="1440"
        height="1440"
        loading="lazy"
        display="block"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          textAlign: 'center',
        }}
      />
    </Box>
  );
}
