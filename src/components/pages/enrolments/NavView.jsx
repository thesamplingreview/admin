import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { usePermissions } from '@/contexts/hooks/auth';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import PageNav from '@/components/layouts/PageNav.jsx';

export default function NavView({ active }) {
  const [model] = useModel();
  const [permissions] = usePermissions();

  const navs = useMemo(() => {
    return [
      {
        key: 'overview',
        name: 'Overview',
        route: appRoute(`/enrolments/${model.id}`),
        icon: 'fa-file-lines',
        scope: 'enrolments:view',
      },
      {
        key: 'edit',
        name: 'Admin Setting',
        route: appRoute(`/enrolments/${model.id}/edit`),
        icon: 'fa-pencil',
        scope: 'enrolments:edit',
      },
      {
        key: 'delete',
        name: 'Delete',
        route: appRoute(`/enrolments/${model.id}/delete`),
        icon: 'fa-trash-can',
        scope: 'enrolments:delete',
      },
    ].filter((d) => permissions.includes(d.scope));
  }, [model.id, permissions]);

  return (
    <PageNav navs={navs} active={active}>
      <Box>
        <Typography variant="h6" mb={1}>
          {model.campaign?.name || '-'}
        </Typography>
        <Typography variant="h6" mb={0}>
          {model.user?.name || '-'}
        </Typography>
        <Typography variant="body2" color="text.light" mb={0}>
          {model.user?.email}
        </Typography>
      </Box>
    </PageNav>
  );
}
