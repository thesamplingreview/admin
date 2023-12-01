import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CBox from '@/components/CBox.jsx';
import FasIcon from '@/components/FasIcon.jsx';

export default function NavView({
  navs = [],
  active = '',
  children,
}) {
  return (
    <CBox noPadding>
      <Box display="flex" alignItems="center" px={3} py={2}>
        {children}
      </Box>

      <MenuList>
        {navs.map((nav) => (
          <MenuItem
            {...nav.props}
            key={nav.key}
            component={Link}
            to={nav.route}
            selected={nav.key === active}
            sx={[
              nav.props?.sx,
              {
                px: 2,
                py: 1.5,
                borderTop: '1px solid var(--border-500)',
              },
            ]}
          >
            <ListItemIcon>
              <FasIcon name={nav.icon} />
            </ListItemIcon>
            <ListItemText>{nav.name}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </CBox>
  );
}
