export default [
  {
    key: 'dashboard',
    path: 'dashboard',
    async lazy() {
      const { Dashboard } = await import('./index');
      return { Component: Dashboard };
    },
  },
];
