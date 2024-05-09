export default [
  {
    key: 'workflows',
    path: 'workflows',
    async lazy() {
      const { Layout } = await import('./index.jsx');
      return { Component: Layout };
    },
    children: [
      {
        key: 'workflows.index',
        index: true,
        async lazy() {
          const { ListingIndex } = await import('./index.jsx');
          return { Component: ListingIndex };
        },
      },
    ],
  },
];
