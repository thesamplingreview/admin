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
      route: appRoute(`/forms/${model.id}`),
      icon: 'fa-pencil',
    },
    {
      key: 'fields',
      name: 'Edit Fields',
      route: appRoute(`/forms/${model.id}/fields`),
      icon: 'fa-list',
    },
    {
      key: 'delete',
      name: 'Delete',
      route: appRoute(`/forms/${model.id}/delete`),
      icon: 'fa-trash-can',
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
