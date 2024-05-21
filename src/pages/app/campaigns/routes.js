export default [
  {
    key: 'campaigns',
    path: 'campaigns',
    async lazy() {
      const { Layout } = await import('./index');
      return { Component: Layout };
    },
    children: [
      {
        key: 'campaigns.list',
        index: true,
        async lazy() {
          const { ListingIndex } = await import('./index');
          return { Component: ListingIndex };
        },
      },
      {
        key: 'campaigns.add',
        path: 'add',
        async lazy() {
          const { AddIndex } = await import('./index');
          return { Component: AddIndex };
        },
      },
      {
        key: 'campaigns.detail',
        path: ':id',
        async lazy() {
          const { ViewLayout } = await import('./index');
          return { Component: ViewLayout };
        },
        children: [
          {
            key: 'campaigns.detail.overview',
            index: true,
            async lazy() {
              const { ViewOverview } = await import('./index');
              return { Component: ViewOverview };
            },
          },
          {
            key: 'campaigns.detail.edit',
            path: 'edit',
            async lazy() {
              const { ViewEdit } = await import('./index');
              return { Component: ViewEdit };
            },
          },
          {
            key: 'campaigns.detail.setting',
            path: 'setting',
            async lazy() {
              const { ViewSetting } = await import('./index');
              return { Component: ViewSetting };
            },
          },
          {
            key: 'campaigns.detail.setting_admin',
            path: 'admin',
            async lazy() {
              const { ViewSettingAdmin } = await import('./index');
              return { Component: ViewSettingAdmin };
            },
          },
          {
            key: 'campaigns.detail.products',
            path: 'products',
            async lazy() {
              const { ViewProducts } = await import('./index');
              return { Component: ViewProducts };
            },
          },
          {
            key: 'campaigns.detail.delete',
            path: 'delete',
            async lazy() {
              const { ViewDelete } = await import('./index');
              return { Component: ViewDelete };
            },
          },
          {
            key: 'campaigns.detail.enrolments',
            path: 'enrolments',
            async lazy() {
              const { ViewEnrolments } = await import('./index');
              return { Component: ViewEnrolments };
            },
          },
          {
            key: 'campaigns.detail.reviews',
            path: 'reviews',
            async lazy() {
              const { ViewReviews } = await import('./index');
              return { Component: ViewReviews };
            },
          },
          {
            key: 'campaigns.detail.report',
            path: 'report',
            async lazy() {
              const { ViewReport } = await import('./index');
              return { Component: ViewReport };
            },
          },
          {
            key: 'campaigns.detail.workflow',
            path: 'workflow',
            async lazy() {
              const { ViewWorkflow } = await import('./index');
              return { Component: ViewWorkflow };
            },
          },
        ],
      },
    ],
  },
];
