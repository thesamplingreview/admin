import { useMemo, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { appRoute } from '@/helpers/route';
import LayoutContext from '@/contexts/LayoutContext.jsx';
import FasIcon from '@/components/FasIcon.jsx';

export default function AppSidenav() {
  const { currModule, sidenav, setSidenav } = useContext(LayoutContext);

  const navs = useMemo(() => [
    {
      group: '',
      childs: [
        {
          key: 'dashboard',
          route: appRoute('/dashboard'),
          name: 'Dashboard',
          icon: 'fa-chart-line',
          group: '',
        },
      ],
    },
    {
      group: 'CONTENT',
      childs: [
        {
          key: 'campaigns',
          route: appRoute('/campaigns'),
          name: 'Campaigns',
          icon: 'fa-fire',
          group: 'CONTENT',
        },
        {
          key: 'products',
          route: appRoute('/products'),
          name: 'Products',
          icon: 'fa-tag',
          group: 'CONTENT',
        },
        {
          key: 'users',
          route: appRoute('/users'),
          name: 'Users',
          icon: 'fa-users',
          group: 'CONTENT',
        },
        {
          key: 'vendors',
          route: appRoute('/vendors'),
          name: 'Vendors',
          icon: 'fa-shop',
          group: 'CONTENT',
        },
        {
          key: 'forms',
          route: appRoute('/forms'),
          name: 'Forms',
          icon: 'fa-rectangle-list',
          group: 'CONTENT',
        },
      ],
    },
    {
      group: 'ADMIN',
      childs: [
        {
          key: 'admins',
          route: appRoute('/admins'),
          name: 'Admins',
          icon: 'fa-user-gear',
          group: 'CONTENT',
        },
      ],
    },
  ], []);

  const handleToggleNav = () => {
    setSidenav((state) => (state === 'minimize' ? '' : 'minimize'));
  };

  return (
    <Box
      component="nav"
      display="flex"
      flexDirection="column"
      height="100vh"
      className={classNames('sidenav', sidenav)}
      sx={[
        {
          '--color': '#8593b2',
          '--bg': '#212734',
          '--width': '13rem',
          position: 'sticky',
          top: '0',
          zIndex: '10',
          flex: '0 0 auto',
          width: 'var(--width)',
          fontSize: '.875rem',
          color: 'var(--color)',
          bgcolor: 'var(--bg)',
          transition: 'width .3s',
        },
        (theme) => ({
          [theme.breakpoints.up('lg')]: {
            '&.minimize': {
              '--width': '4rem',
              '& .sidenav-label': {
                display: 'none',
              },
              '& .sidenav-logo': {
                display: 'none',
              },
              '& .sidenav-item': {
                flexDirection: 'column',
                pl: 0,
                pr: 1,
              },
              '& .sidenav-item-ic': {
                mr: 0,
              },
              '& .sidenav-item-txt': {
                fontSize: '.5em',
                mt: 1,
              },
            },
          },
        }),
      ]}
    >
      {/* header */}
      <Box
        component="header"
        p={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="60px"
        bgcolor="rgba(0,0,0,.2)"
      >
        <a href="#" className="sidenav-logo">
          <img
            src=""
            alt="App name"
            width="130"
            height="36"
          />
        </a>
        <IconButton
          sx={{ color: 'var(--color)', fontSize: '1rem' }}
          onClick={handleToggleNav}
        >
          <FasIcon name="fa-align-left" />
        </IconButton>
      </Box>

      {/* body */}
      <Box
        pt={2}
        pb={4}
        flexGrow="1"
        sx={{
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        {navs.map((nav, index) => (
          <Fragment key={index}>
            {nav.group && <SidenavLabel label={nav.group} />}
            {nav.childs.map((child) => (
              <SidenavItem
                key={child.key}
                route={child.route}
                name={child.name}
                icon={child.icon}
                active={currModule === child.key}
              />
            ))}
          </Fragment>
        ))}
      </Box>
    </Box>
  );
}

function SidenavLabel({ label }) {
  return (
    <Box
      className="sidenav-label"
      fontSize=".75em"
      fontWeight="400"
      textTransform="uppercase"
      px={2}
      pt={2}
      pb={1}
    >
      {label}
    </Box>
  );
}

function SidenavItem({
  icon,
  name,
  route,
  active = false,
}) {
  return (
    <Box position="relative">
      <Box
        component={Link}
        to={route}
        className="sidenav-item"
        display="flex"
        alignItems="center"
        px={2}
        py={1.75}
        lineHeight="1.2"
        fontWeight="500"
        title={name}
        sx={[
          {
            textDecoration: 'none',
            outline: 'none',
            color: 'var(--color)',
            borderLeft: '3px solid transparent',
            transition: 'background .3s, color .3s',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,.05)',
            },
          },
          active && {
            color: 'var(--main-300)',
            borderLeftColor: 'var(--main-300)',
          },
        ]}
      >
        <FasIcon
          name={icon}
          fontSize="1.25em"
          width="1.25em"
          textAlign="center"
          mr={2}
        />
        <span className="sidenav-item-txt truncate">
          {name}
        </span>
      </Box>
    </Box>
  );
}
