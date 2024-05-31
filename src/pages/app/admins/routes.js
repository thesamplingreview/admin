export default [
  {
    key: 'admins',
    path: 'admins',
    async lazy() {
      const { Layout } = await import('./index.jsx');
      return { Component: Layout };
    },
    children: [
      {
        key: 'admins.list',
        index: true,
        async lazy() {
          const { ListingIndex } = await import('./index.jsx');
          return { Component: ListingIndex };
        },
      },
      {
        key: 'admins.add',
        path: 'add',
        async lazy() {
          const { AddIndex } = await import('./index.jsx');
          return { Component: AddIndex };
        },
      },
      {
        key: 'admins.detail',
        path: ':id',
        async lazy() {
          const { ViewLayout } = await import('./index.jsx');
          return { Component: ViewLayout };
        },
        children: [
          {
            key: 'admins.detail.edit',
            index: true,
            async lazy() {
              const { ViewEdit } = await import('./index.jsx');
              return { Component: ViewEdit };
            },
          },
          {
            key: 'admins.detail.password',
            path: 'password',
            async lazy() {
              const { ViewPassword } = await import('./index.jsx');
              return { Component: ViewPassword };
            },
          },
          {
            key: 'admins.detail.delete',
            path: 'delete',
            async lazy() {
              const { ViewDelete } = await import('./index.jsx');
              return { Component: ViewDelete };
            },
          },
        ],
      },
    ],
  },
];
