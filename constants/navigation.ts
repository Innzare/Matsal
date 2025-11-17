type RoutePath = '/' | '/favourites' | '/profile' | '/groceries' | '/carts' | '/search';

export interface Route {
  name: string;
  path: RoutePath;
  icon: {
    size: number;
    name: string;
    set: string;
  };
}

export const ROUTES: Route[] = [
  {
    name: 'Еда',
    path: '/',
    icon: {
      size: 25,
      set: 'ion',
      name: 'fast-food-outline'
    }
  },
  {
    name: 'Продукты',
    path: '/groceries',
    icon: {
      size: 21,
      set: 'feather',
      name: 'map'
    }
  },
  {
    name: 'Корзина',
    path: '/carts',
    icon: {
      size: 23,
      set: 'feather',
      name: 'shopping-bag'
    }
  },
  {
    name: 'Избранное',
    path: '/favourites',
    icon: {
      size: 24,
      set: 'feather',
      name: 'heart'
    }
  }
  // {
  //   name: 'Профиль',
  //   path: '/profile',
  //   icon: {
  //     size: 25,
  //     set: 'feather',
  //     name: 'user'
  //   }
  // }
];
