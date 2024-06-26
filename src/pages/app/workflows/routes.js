export default [
  {
    key: 'workflows',
    path: 'workflows',
    async lazy() {
      const { Layout } = await import('./index');
      return { Component: Layout };
    },
    children: [
      {
        key: 'workflow.detail',
        path: ':id',
        async lazy() {
          const { ViewLayout } = await import('./index');
          return { Component: ViewLayout };
        },
        children: [
          {
            key: 'workflow.detail.edit',
            index: 'edit',
            async lazy() {
              const { ViewEdit } = await import('./index');
              return { Component: ViewEdit };
            },
          },
        ],
      },
    ],
  },
];
