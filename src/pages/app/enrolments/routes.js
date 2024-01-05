export default [
  {
    key: 'enrolments',
    path: 'enrolments',
    async lazy() {
      const { Layout } = await import('./index');
      return { Component: Layout };
    },
    children: [
      {
        key: 'enrolments.list',
        index: true,
        async lazy() {
          const { ListingIndex } = await import('./index');
          return { Component: ListingIndex };
        },
      },
      {
        key: 'enrolments.detail',
        path: ':id',
        async lazy() {
          const { ViewLayout } = await import('./index');
          return { Component: ViewLayout };
        },
        children: [
          {
            key: 'enrolments.detail.overview',
            index: true,
            async lazy() {
              const { ViewOverview } = await import('./index');
              return { Component: ViewOverview };
            },
          },
          {
            key: 'enrolments.detail.edit',
            path: 'edit',
            async lazy() {
              const { ViewEdit } = await import('./index');
              return { Component: ViewEdit };
            },
          },
          {
            key: 'enrolments.detail.delete',
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
