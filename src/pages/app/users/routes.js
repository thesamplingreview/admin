export default [
  {
    key: 'users',
    path: 'users',
    async lazy() {
      const { Layout } = await import('@/pages/app/users/index.jsx');
      return { Component: Layout };
    },
    children: [
      {
        key: 'users.list',
        index: true,
        async lazy() {
          const { ListingIndex } = await import('@/pages/app/users/index.jsx');
          return { Component: ListingIndex };
        },
      },
      {
        key: 'users.add',
        path: 'add',
        async lazy() {
          const { AddIndex } = await import('@/pages/app/users/index.jsx');
          return { Component: AddIndex };
        },
      },
      {
        key: 'users.detail',
        path: ':id',
        async lazy() {
          const { ViewLayout } = await import('@/pages/app/users/index.jsx');
          return { Component: ViewLayout };
        },
        children: [
          {
            key: 'users.detail.view',
            index: true,
            async lazy() {
              const { ViewOverview } = await import('@/pages/app/users/index.jsx');
              return { Component: ViewOverview };
            },
          },
          {
            key: 'users.detail.edit',
            path: 'edit',
            async lazy() {
              const { ViewEdit } = await import('@/pages/app/users/index.jsx');
              return { Component: ViewEdit };
            },
          },
          {
            key: 'users.detail.password',
            path: 'password',
            async lazy() {
              const { ViewPassword } = await import('@/pages/app/users/index.jsx');
              return { Component: ViewPassword };
            },
          },
        ],
      },
    ],
  },
];
