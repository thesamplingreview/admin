export default [
  {
    key: 'my',
    path: 'my',
    async lazy() {
      const { Layout } = await import('./index');
      return { Component: Layout };
    },
    children: [
      {
        key: 'my.profile',
        path: 'profile',
        // index: true,
        async lazy() {
          const { MyProfile } = await import('./index');
          return { Component: MyProfile };
        },
      },
      {
        key: 'my.password',
        path: 'password',
        async lazy() {
          const { MyPassword } = await import('./index');
          return { Component: MyPassword };
        },
      },
    ],
  },
];
