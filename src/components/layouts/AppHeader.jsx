import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useAuth } from '@/contexts/hooks/auth';
import { appRoute, authRoute } from '@/helpers/route';
import CAvatar from '@/components/CAvatar.jsx';

export default function AppHeader() {
  return (
    <Box
      component="header"
      px={3}
      py={2}
      display="flex"
      alignItems="center"
      height="60px"
      backgroundColor="background.light"
      boxShadow="0 1px 15px rgba(69,65,78,.1)"
    >
      <IconButton
        sx={{
          color: 'text.light',
          fontSize: '1rem',
          display: { lg: 'none' },
        }}
      >
        <i className="fas fa-align-left" />
      </IconButton>
      <Box ml="auto">
        <UserNav />
      </Box>
    </Box>
  );
}

function UserNav() {
  const navigate = useNavigate();
  const [user] = useAuth();
  const $toggler = useRef(null);
  const [open, setOpen] = useState(false);

  const navs = [
    {
      key: 'profile',
      name: 'Edit Profile',
      route: appRoute('/my/profile'),
    },
    {
      key: 'logout',
      name: 'Logout',
      route: authRoute('/logout'),
    },
  ];

  const handleClick = (nav) => {
    navigate(nav.route);
    setOpen(false);
  };

  return (
    <Box position="relative">
      <Button
        ref={$toggler}
        variant="text"
        sx={{ textTransform: 'initial' }}
        onClick={() => setOpen(true)}
      >
        <Typography color="text.light" fontSize=".875rem">
          Howdy, {user.name}!
        </Typography>
        <Box ml={1}>
          <CAvatar
            name={user.name}
            sx={{
              fontSize: 16,
              width: 32,
              height: 32,
            }}
          />
        </Box>
      </Button>
      <Menu
        anchorEl={() => $toggler.current}
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { width: '10rem' },
        }}
        onClose={() => setOpen(false)}
      >
        {navs.map((nav) => (
          <MenuItem
            key={nav.key}
            sx={{ fontSize: '0.875rem', minWidth: '8em' }}
            onClick={() => handleClick(nav)}
          >
            {nav.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
