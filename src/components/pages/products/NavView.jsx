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
      route: appRoute(`/products/${model.id}`),
      icon: 'fa-file-lines',
    },
    {
      key: 'edit',
      name: 'Edit Detail',
      route: appRoute(`/products/${model.id}/edit`),
      icon: 'fa-pencil',
    },
    {
      key: 'delete',
      name: 'Delete',
      route: appRoute(`/products/${model.id}`),
      icon: 'fa-trash-can',
    },
  ];

  return (
    <PageNav navs={navs} active={active}>
      <CAvatar name={model.name} src={model.image_url} />
      <Box ml={2}>
        <Typography variant="h6" mb={0}>
          {model.name}
        </Typography>
      </Box>
    </PageNav>
  );
}
