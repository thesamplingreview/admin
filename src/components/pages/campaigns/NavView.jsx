import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useModel } from '@/contexts/hooks/module';
import { appRoute, publicRoute } from '@/helpers/route';
import CAvatar from '@/components/CAvatar.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import PageNav from '@/components/layouts/PageNav.jsx';

export default function NavView({ active }) {
  const [model] = useModel();

  const navs = [
    {
      key: 'overview',
      name: 'Overview',
      route: appRoute(`/campaigns/${model.id}`),
      icon: 'fa-file-lines',
    },
    {
      key: 'report',
      name: 'Campaign Report',
      route: appRoute(`/campaigns/${model.id}/report`),
      icon: 'fa-chart-bar',
    },
    {
      key: 'enrolments',
      name: 'User Enrolments',
      route: appRoute(`/campaigns/${model.id}/enrolments`),
      icon: 'fa-user-check',
      count: model.enrolments_count,
    },
    {
      key: 'reviews',
      name: 'User Reviews',
      route: appRoute(`/campaigns/${model.id}/reviews`),
      icon: 'fa-comments',
      // count: model.enrolments_count,
    },
    {
      key: 'products',
      name: 'Linked Products',
      route: appRoute(`/campaigns/${model.id}/products`),
      icon: 'fa-tag',
    },
    {
      key: 'edit',
      name: 'Edit Detail',
      route: appRoute(`/campaigns/${model.id}/edit`),
      icon: 'fa-pencil',
    },
    {
      key: 'setting',
      name: 'Setting',
      route: appRoute(`/campaigns/${model.id}/setting`),
      icon: 'fa-cogs',
    },
    {
      key: 'delete',
      name: 'Delete',
      route: appRoute(`/campaigns/${model.id}/delete`),
      icon: 'fa-trash-can',
    },
    {
      key: 'page',
      name: (
        <Box display="inline-flex" alignItems="center">
          Campaign Page
          <FasIcon name="fa-arrow-up-right-from-square" fontSize=".75em" ml={1} />
        </Box>
      ),
      route: publicRoute(`/programs/${model.slug}`),
      icon: 'fa-link',
      props: {
        target: '_blank',
      },
    },
  ];

  return (
    <PageNav navs={navs} active={active}>
      <CAvatar name={model.name} src={model.logo_url} />
      <Box ml={2}>
        <Typography variant="h6" mb={0}>
          {model.name}
        </Typography>
      </Box>
    </PageNav>
  );
}
