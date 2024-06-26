export default [
  {
    key: 'vendors',
    path: 'vendors',
    async lazy() {
      const { Layout } = await import('./index');
      return { Component: Layout };
    },
    children: [
      {
        key: 'vendors.list',
        index: true,
        async lazy() {
          const { ListingIndex } = await import('./index');
          return { Component: ListingIndex };
        },
      },
      {
        key: 'vendors.add',
        path: 'add',
        async lazy() {
          const { AddIndex } = await import('./index');
          return { Component: AddIndex };
        },
      },
      {
        key: 'vendors.detail',
        path: ':id',
        async lazy() {
          const { ViewLayout } = await import('./index');
          return { Component: ViewLayout };
        },
        children: [
          {
            key: 'vendors.detail.overview',
            index: true,
            async lazy() {
              const { ViewOverview } = await import('./index');
              return { Component: ViewOverview };
            },
          },
          {
            key: 'vendors.detail.admins',
            path: 'admins',
            async lazy() {
              const { ViewAdmins } = await import('./index');
              return { Component: ViewAdmins };
            },
          },
          {
            key: 'vendors.detail.edit',
            path: 'edit',
            async lazy() {
              const { ViewEdit } = await import('./index');
              return { Component: ViewEdit };
            },
          },
          {
            key: 'vendors.detail.delete',
            path: 'delete',
            async lazy() {
              const { ViewDelete } = await import('./index');
              return { Component: ViewDelete };
            },
          },
        ],
      },
    ],
  },
];
