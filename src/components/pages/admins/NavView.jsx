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
      key: 'edit',
      name: 'Edit Detail',
      route: appRoute(`/admins/${model.id}`),
      icon: 'fa-user',
    },
    {
      key: 'password',
      name: 'Change Password',
      route: appRoute(`/admins/${model.id}/password`),
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
