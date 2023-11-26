export default [
  {
    key: 'forms',
    path: 'forms',
    async lazy() {
      const { Layout } = await import('@/pages/app/forms/index');
      return { Component: Layout };
    },
    children: [
      {
        key: 'forms.list',
        index: true,
        async lazy() {
          const { ListingIndex } = await import('@/pages/app/forms/index');
          return { Component: ListingIndex };
        },
      },
      {
        key: 'forms.add',
        path: 'add',
        async lazy() {
          const { AddIndex } = await import('@/pages/app/forms/index');
          return { Component: AddIndex };
        },
      },
      {
        key: 'forms.detail',
        path: ':id',
        async lazy() {
          const { ViewLayout } = await import('@/pages/app/forms/index');
          return { Component: ViewLayout };
        },
        children: [
          {
            key: 'forms.detail.edit',
            index: true,
            async lazy() {
              const { ViewEdit } = await import('@/pages/app/forms/index');
              return { Component: ViewEdit };
            },
          },
          {
            key: 'forms.detail.fields',
            path: 'fields',
            async lazy() {
              const { ViewFields } = await import('@/pages/app/forms/index');
              return { Component: ViewFields };
            },
          },
          {
            key: 'forms.detail.delete',
            path: 'delete',
            async lazy() {
              const { ViewDelete } = await import('@/pages/app/forms/index');
              return { Component: ViewDelete };
            },
          },
        ],
      },
    ],
  },
];
