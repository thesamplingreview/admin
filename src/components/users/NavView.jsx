import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import CAvatar from '@/components/CAvatar.jsx';
import PageNav from '@/components/layouts/PageNav.jsx';

export default function NavView({ active }) {
  const [model] = useModel();

  const navs = [
    {
      key: 'overview',
      name: 'Overview',
      route: appRoute(`/users/${model.id}`),
      icon: 'fa-user',
    },
    {
      key: 'campaigns',
      name: 'My Campaigns',
      route: appRoute(`/users/${model.id}/campaigns`),
      icon: 'fa-key',
    },
    {
      key: 'edit',
      name: 'Edit Detail',
      route: appRoute(`/users/${model.id}/edit`),
      icon: 'fa-pencil',
    },
    {
      key: 'password',
      name: 'Reset Password',
      route: appRoute(`/users/${model.id}/password`),
      icon: 'fa-key',
    },
  ];

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
