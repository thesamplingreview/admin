export default [
  {
    key: 'users',
    path: 'users',
    async lazy() {
      const { Layout } = await import('./index.jsx');
      return { Component: Layout };
    },
    children: [
      {
        key: 'users.list',
        index: true,
        async lazy() {
          const { ListingIndex } = await import('./index.jsx');
          return { Component: ListingIndex };
        },
      },
      {
        key: 'users.add',
        path: 'add',
        async lazy() {
          const { AddIndex } = await import('./index.jsx');
          return { Component: AddIndex };
        },
      },
      {
        key: 'users.detail',
        path: ':id',
        async lazy() {
          const { ViewLayout } = await import('./index.jsx');
          return { Component: ViewLayout };
        },
        children: [
          {
            key: 'users.detail.view',
            index: true,
            async lazy() {
              const { ViewOverview } = await import('./index.jsx');
              return { Component: ViewOverview };
            },
          },
          {
            key: 'users.detail.edit',
            path: 'edit',
            async lazy() {
              const { ViewEdit } = await import('./index.jsx');
              return { Component: ViewEdit };
            },
          },
          {
            key: 'users.detail.password',
            path: 'password',
            async lazy() {
              const { ViewPassword } = await import('./index.jsx');
              return { Component: ViewPassword };
            },
          },
          {
            key: 'users.detail.campaigns',
            path: 'campaigns',
            async lazy() {
              const { ViewCampaigns } = await import('./index.jsx');
              return { Component: ViewCampaigns };
            },
          },
        ],
      },
    ],
  },
];
