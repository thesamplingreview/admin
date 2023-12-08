export default [
  {
    key: 'campaigns',
    path: 'campaigns',
    async lazy() {
      const { Layout } = await import('@/pages/app/campaigns/index');
      return { Component: Layout };
    },
    children: [
      {
        key: 'campaigns.list',
        index: true,
        async lazy() {
          const { ListingIndex } = await import('@/pages/app/campaigns/index');
          return { Component: ListingIndex };
        },
      },
      {
        key: 'campaigns.add',
        path: 'add',
        async lazy() {
          const { AddIndex } = await import('@/pages/app/campaigns/index');
          return { Component: AddIndex };
        },
      },
      {
        key: 'campaigns.detail',
        path: ':id',
        async lazy() {
          const { ViewLayout } = await import('@/pages/app/campaigns/index');
          return { Component: ViewLayout };
        },
        children: [
          {
            key: 'campaigns.detail.overview',
            index: true,
            async lazy() {
              const { ViewOverview } = await import('@/pages/app/campaigns/index');
              return { Component: ViewOverview };
            },
          },
          {
            key: 'campaigns.detail.edit',
            path: 'edit',
            async lazy() {
              const { ViewEdit } = await import('@/pages/app/campaigns/index');
              return { Component: ViewEdit };
            },
          },
          {
            key: 'campaigns.detail.products',
            path: 'products',
            async lazy() {
              const { ViewProducts } = await import('@/pages/app/campaigns/index');
              return { Component: ViewProducts };
            },
          },
          {
            key: 'campaigns.detail.delete',
            path: 'delete',
            async lazy() {
              const { ViewDelete } = await import('@/pages/app/campaigns/index');
              return { Component: ViewDelete };
            },
          },
        ],
      },
    ],
  },
];
