import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { usePermissions } from '@/contexts/hooks/auth';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import CAvatar from '@/components/CAvatar.jsx';
import PageNav from '@/components/layouts/PageNav.jsx';

export default function NavView({ active }) {
  const [model] = useModel();
  const [permissions] = usePermissions();

  const navs = useMemo(() => {
    return [
      {
        key: 'overview',
        name: 'Overview',
        route: appRoute(`/users/${model.id}`),
        icon: 'fa-user',
        scope: 'users:view',
      },
      {
        key: 'campaigns',
        name: 'My Campaigns',
        route: appRoute(`/users/${model.id}/campaigns`),
        icon: 'fa-key',
        scope: 'users:view',
      },
      {
        key: 'edit',
        name: 'Edit Detail',
        route: appRoute(`/users/${model.id}/edit`),
        icon: 'fa-pencil',
        scope: 'users:edit',
      },
      {
        key: 'password',
        name: 'Reset Password',
        route: appRoute(`/users/${model.id}/password`),
        icon: 'fa-key',
        scope: 'users:edit',
      },
    ].filter((d) => permissions.includes(d.scope));
  }, [model.id, permissions]);

  return (
    <PageNav navs={navs} active={active}>
      <CAvatar name={model.name} />
      <Box ml={2}>
        <Typography variant="h6" mb={0}>
          {model.name}
        </Typography>
        <Typography component="div" variant="caption" color="text.light">
          {model.email}
        </Typography>
      </Box>
    </PageNav>
  );
}
