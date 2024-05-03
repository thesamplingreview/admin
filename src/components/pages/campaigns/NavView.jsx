import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { usePermissions } from '@/contexts/hooks/auth';
import { useModel } from '@/contexts/hooks/module';
import { appRoute, publicRoute } from '@/helpers/route';
import CAvatar from '@/components/CAvatar.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import PageNav from '@/components/layouts/PageNav.jsx';

export default function NavView({ active }) {
  const [model] = useModel();
  const [permissions] = usePermissions();

  const navs = useMemo(() => {
    return [
      {
        key: 'overview',
        name: 'Overview',
        route: appRoute(`/campaigns/${model.id}`),
        icon: 'fa-file-lines',
        scope: 'campaigns:view',
      },
      {
        key: 'report',
        name: 'Campaign Report',
        route: appRoute(`/campaigns/${model.id}/report`),
        icon: 'fa-chart-bar',
        scope: 'campaigns:view',
      },
      {
        key: 'enrolments',
        name: 'User Enrolments',
        route: appRoute(`/campaigns/${model.id}/enrolments`),
        icon: 'fa-user-check',
        count: model.enrolments_count,
        scope: 'enrolments:view',
      },
      {
        key: 'reviews',
        name: 'User Reviews',
        route: appRoute(`/campaigns/${model.id}/reviews`),
        icon: 'fa-comments',
        count: model.reviews_count,
        scope: 'reviews:view',
      },
      {
        key: 'products',
        name: 'Linked Products',
        route: appRoute(`/campaigns/${model.id}/products`),
        icon: 'fa-tag',
        scope: 'campaigns:edit',
      },
      {
        key: 'edit',
        name: 'Edit Detail',
        route: appRoute(`/campaigns/${model.id}/edit`),
        icon: 'fa-pencil',
        scope: 'campaigns:edit',
      },
      {
        key: 'setting',
        name: 'Setting',
        route: appRoute(`/campaigns/${model.id}/setting`),
        icon: 'fa-cogs',
        scope: 'campaigns:edit',
      },
      {
        key: 'delete',
        name: 'Delete',
        route: appRoute(`/campaigns/${model.id}/delete`),
        icon: 'fa-trash-can',
        scope: 'campaigns:delete',
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
    ].filter((d) => !d.scope || permissions.includes(d.scope));
  }, [model, permissions]);

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
