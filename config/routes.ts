export default [
  {
    path: '/login',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/login',
        component: './Login',
      },
      {
        component: './404',
      },
    ],
  },
];
