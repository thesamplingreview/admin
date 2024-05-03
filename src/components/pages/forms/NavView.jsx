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
        key: 'edit',
        name: 'Edit Detail',
        route: appRoute(`/forms/${model.id}`),
        icon: 'fa-pencil',
        scope: 'forms:edit',
      },
      {
        key: 'fields',
        name: 'Edit Fields',
        route: appRoute(`/forms/${model.id}/fields`),
        icon: 'fa-list',
        scope: 'forms:edit',
      },
      {
        key: 'delete',
        name: 'Delete',
        route: appRoute(`/forms/${model.id}/delete`),
        icon: 'fa-trash-can',
        scope: 'forms:delete',
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
