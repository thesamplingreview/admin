export default [
  {
    key: 'products',
    path: 'products',
    async lazy() {
      const { Layout } = await import('@/pages/app/products/index.jsx');
      return { Component: Layout };
    },
    children: [
      {
        key: 'products.list',
        index: true,
        async lazy() {
          const { ListingIndex } = await import('@/pages/app/products/index.jsx');
          return { Component: ListingIndex };
        },
      },
      {
        key: 'products.add',
        path: 'add',
        async lazy() {
          const { AddIndex } = await import('@/pages/app/products/index.jsx');
          return { Component: AddIndex };
        },
      },
      {
        key: 'products.detail',
        path: ':id',
        async lazy() {
          const { ViewLayout } = await import('@/pages/app/products/index.jsx');
          return { Component: ViewLayout };
        },
        children: [
          {
            key: 'products.detail.overview',
            index: true,
            async lazy() {
              const { ViewOverview } = await import('@/pages/app/products/index.jsx');
              return { Component: ViewOverview };
            },
          },
          {
            key: 'products.detail.edit',
            path: 'edit',
            async lazy() {
              const { ViewEdit } = await import('@/pages/app/products/index.jsx');
              return { Component: ViewEdit };
            },
          },
        ],
      },
    ],
  },
];
