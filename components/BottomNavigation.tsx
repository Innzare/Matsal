import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from './Icon';
import { Text } from './Text';

type RoutePath = '/' | '/favourites' | '/profile' | '/groceries' | '/carts';
interface Route {
  name: string;
  path: RoutePath;
  icon: {
    size: number;
    name: string;
    set: string;
  };
}

const ROUTES: Route[] = [
  {
    name: 'Еда',
    path: '/',
    icon: {
      size: 21,
      set: 'ion',
      name: 'fast-food-outline'
    }
  },
  {
    name: 'Продукты',
    path: '/groceries',
    icon: {
      size: 23,
      set: 'materialCom',
      name: 'food-apple-outline'
    }
  },
  {
    name: 'Корзина',
    path: '/carts',
    icon: {
      size: 21,
      set: 'feather',
      name: 'shopping-bag'
    }
  },
  {
    name: 'Избранное',
    path: '/favourites',
    icon: {
      size: 19,
      set: 'feather',
      name: 'heart'
    }
  },
  {
    name: 'Профиль',
    path: '/profile',
    icon: {
      size: 21,
      set: 'feather',
      name: 'user'
    }
  }
];

const NavItem = ({
  route,
  isActive,
  onPress,
  special,
  paddingBottom
}: {
  route: Route;
  isActive: boolean;
  onPress: () => void;
  special?: boolean;
  paddingBottom?: number;
}) => {
  const animation = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(animation.value, { duration: 200, easing: Easing.inOut(Easing.linear) }) }]
  }));

  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingBottom: !special ? paddingBottom : undefined,
        paddingTop: !special ? 7 : undefined
      }}
      onPressIn={() => {
        animation.value = 0.75;
      }}
      onPressOut={() => {
        animation.value = 1;
      }}
      className={`flex-1 items-center justify-center gap-1 ${
        special ? 'rounded-full bg-stone-100 border border-stone-300 max-w-[70px] h-[70px] -translate-y-6 mx-3' : ''
      }`}
    >
      <Animated.View style={animatedStyle}>
        <Icon set={route.icon.set} name={route.icon.name} size={route.icon.size} color={isActive ? 'red' : '#3d3d3d'} />
      </Animated.View>
      <Text className={`text-center font-bold text-xs ${isActive ? 'text-red-600' : 'text-stone-700'}`}>
        {route.name}
      </Text>
    </Pressable>
  );
};

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const insets = useSafeAreaInsets();

  return (
    <View className="bg-white border-t border-stone-300 flex-row justify-between max-h-[80px]">
      {ROUTES.map((route, index) => {
        return (
          <NavItem
            key={route.path}
            route={route}
            isActive={pathname === route.path}
            onPress={() => router.push(route.path)}
            special={index === 2}
            paddingBottom={insets.bottom}
          />
        );
      })}
    </View>
  );
}
