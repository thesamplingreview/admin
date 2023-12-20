import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import PageNav from '@/components/layouts/PageNav.jsx';

export default function NavView({ active }) {
  const [model] = useModel();

  const navs = [
    {
      key: 'overview',
      name: 'Overview',
      route: appRoute(`/enrolments/${model.id}`),
      icon: 'fa-file-lines',
    },
    {
      key: 'edit',
      name: 'Admin Setting',
      route: appRoute(`/enrolments/${model.id}/edit`),
      icon: 'fa-pencil',
    },
    {
      key: 'delete',
      name: 'Delete',
      route: appRoute(`/enrolments/${model.id}/delete`),
      icon: 'fa-trash-can',
    },
  ];

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
