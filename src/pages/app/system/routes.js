export default [
  {
    key: 'system',
    path: 'system',
    async lazy() {
      const { Layout } = await import('./index.jsx');
      return { Component: Layout };
    },
    children: [
      {
        key: 'system.home',
        index: true,
        async lazy() {
          const { ViewHome } = await import('./index.jsx');
          return { Component: ViewHome };
        },
      },
      {
        key: 'system.email_template',
        path: 'email-template',
        async lazy() {
          const { ViewEmailTemplate } = await import('./index.jsx');
          return { Component: ViewEmailTemplate };
        },
      },
    ],
  },
];
