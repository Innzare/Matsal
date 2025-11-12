import AllRestaurantsList from '@/components/AllRestaurantsList';
import Slider from '@/components/Carousel';
import Cart from '@/components/Cart';
import Categories from '@/components/Categories';
import { Icon } from '@/components/Icon';
import PopularBrands from '@/components/PopularBrands';
import RestaurantsListPreview from '@/components/RestaurantsListPreview';
import { Text } from '@/components/Text';
import { POPULAR_BRANDS, RESTAURANTS, RESTAURANTS2 } from '@/constants/resources';
import { useBottomSheetStore } from '@/store/useBottomSheetStore';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, Platform, Pressable, RefreshControl, StatusBar, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
  clamp,
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
// const ADDRESS_HIDE_Y = 120;

export default function SearchScreen() {
  const scrollY = useSharedValue(0);
  const scrollRef = useRef<Animated.ScrollView>(null);

  const { openGlobalBottomSheet } = useBottomSheetStore();

  const isAndroid = Platform.OS === 'android';

  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const addressOpacity = useSharedValue(1);

  // const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const isScrollViewMinPosition = useSharedValue(false);
  // const [isScrolledUp, setIsScrolledUp] = useState(false);
  const isScrolledUp = useSharedValue(true);
  // const [isScrollEnd, setIsScrollEnd] = useState(false);
  const isScrollEnd = useSharedValue(false);
  const isAnimating = useSharedValue(false);

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const insets = useSafeAreaInsets();

  // const scrollToY = (offset: number) => {
  //   scrollRef.current?.scrollTo({ y: offset, animated: true });
  // };

  const headerOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const prevY = scrollY.value;

      const SCROLL_MIN = 0;
      const SCROLL_MAX = 250;

      // scrollY.value = Math.max(SCROLL_MIN, Math.min(event.contentOffset.y, SCROLL_MAX));

      scrollY.value = Math.max(0, event.contentOffset.y);

      const diff = event.contentOffset.y - prevY;

      // аккумулируем дельту в headerOffset (следует за пальцем)
      headerOffset.value = clamp(headerOffset.value + diff, 0, SCROLL_MAX);

      // console.log('scrollY.value', scrollY.value);

      const { contentOffset, contentSize, layoutMeasurement } = event;
      const isEndReached = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;

      if (isEndReached) {
        isScrollEnd.value = true;
      } else {
        isScrollEnd.value = false;
      }

      // console.log('scrollY.value', scrollY.value);

      if (scrollY.value <= 0 && !isScrollViewMinPosition.value) {
        isScrollViewMinPosition.value = true;
        // console.log('IS MIN POS');
      }

      if (scrollY.value > 1 && isScrollViewMinPosition.value) {
        isScrollViewMinPosition.value = false;
        // console.log('IS NOT MIN POS');
      }

      // if (scrollY.value === 0) {
      //   isScrollViewMinPosition.value = true;
      // } else {
      //   isScrollViewMinPosition.value = false;
      // }

      // Добавляем проверку на анимацию и порог изменения
      if (
        scrollY.value > prevY &&
        scrollY.value > HEADER_MAX_HEIGHT &&
        isScrolledUp.value &&
        addressOpacity.value !== 0
      ) {
        isScrolledUp.value = false;
        addressOpacity.value = withTiming(0, { duration: 200 });
      } else if (scrollY.value < prevY && !isScrollEnd.value && !isScrolledUp.value && addressOpacity.value === 0) {
        isScrolledUp.value = true;
        addressOpacity.value = withTiming(1, { duration: 200 });
      }
    }
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const onFavouritesPress = () => {
    router.push('/favourites');
  };

  const onAddressPress = () => {
    openGlobalBottomSheet({
      content: (
        <View className="px-4">
          <Text>test</Text>
          <Text>test</Text>
          <Text>test</Text>
          <Text>test</Text>
          <Text>test</Text>
          <Text>test</Text>
          <Text>test</Text>
          <Text>test</Text>
        </View>
      )
    });
  };

  const onCartPress = () => {
    setIsCartOpen(true);
  };

  const onCategoryPress = (categoryId: number) => {
    setActiveCategoryId(activeCategoryId === categoryId ? null : categoryId);
  };

  const onCloseCartPress = () => {
    setIsCartOpen(false);
  };

  const onSearchQueryChange = (value: string) => {
    setSearchQuery(value);
  };

  // const hiddenHeight = useSharedValue(HEADER_MAX_HEIGHT);
  // useAnimatedReaction(
  //   () => scrollY.value,
  //   (y, prevY) => {
  //     if (prevY === null) return;
  //     const config = { duration: 200 };

  //     if (y > prevY && y > HEADER_MAX_HEIGHT && addressOpacity.value !== 0) {
  //       addressOpacity.value = withTiming(0, config);
  //       isScrolledUp.value = false;
  //     } else if (y < prevY && !isScrollEnd.value && addressOpacity.value !== 1) {
  //       isScrolledUp.value = true;
  //       addressOpacity.value = withTiming(1, config);
  //     }
  //   }
  // );

  // const headerHeight = useAnimatedStyle(() => {
  //   const height = interpolate(scrollY.value, [0, HEADER_MAX_HEIGHT], [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT], {
  //     extrapolateLeft: Extrapolation.CLAMP,
  //     extrapolateRight: Extrapolation.CLAMP
  //   });

  //   return { height };
  // });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      headerOffset.value,
      [120, 250],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolation.CLAMP
    );

    return { height };
  });

  const addressAnimatedStyle = useAnimatedStyle(() => ({
    opacity: addressOpacity.value,
    transform: [{ translateY: (1 - addressOpacity.value) * -100 }]
  }));

  const addressAnimatedStyle2 = useAnimatedStyle(() => {
    const translateY = interpolate(headerOffset.value, [120, 250], [0, -50], Extrapolation.CLAMP);

    const opacity = interpolate(headerOffset.value, [120, 150, 250], [1, 0.5, 0], Extrapolation.CLAMP);

    return {
      transform: [{ translateY }],
      opacity
    };
  });

  const searchInputAnimatedStyle2 = useAnimatedStyle(() => {
    const translateY = interpolate(headerOffset.value, [120, 250], [0, -HEADER_MIN_HEIGHT / 1.5], Extrapolation.CLAMP);

    return {
      transform: [{ translateY }]
    };
  });

  const searchInputAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - addressOpacity.value) * -50 }]
  }));

  // const hiddenBlockHeight = useSharedValue(HEADER_MAX_HEIGHT);

  const hiddenBlockHeight = useDerivedValue(() => {
    const hiddenBlockHeightValue = isScrolledUp.value ? 115 : 65;

    return withTiming(hiddenBlockHeightValue, {
      duration: 200
    });
  });

  // const scrollSpaceOffset = useSharedValue(0);
  // useAnimatedReaction(
  //   () => isScrolledUp.value,
  //   (state) => {
  //     // const target = state.scrolledUp ? 50 : 0;
  //     // const target = state.enabled ? HEADER_MAX_HEIGHT : 0;

  //     // if (scrollY.value > ADDRESS_HIDE_Y) {
  //     //   scrollSpaceOffset.value = withTiming(HEADER_MIN_HEIGHT, {
  //     //     duration: 200
  //     //   });
  //     // }

  //     const hiddenBlockHeightValue = isScrolledUp.value ? 120 : 70;

  //     hiddenBlockHeight.value = withTiming(hiddenBlockHeightValue, {
  //       duration: 200
  //     });

  //     // scrollSpaceOffset.value = withTiming(target, {
  //     //   duration: scrollY.value > HEADER_MAX_HEIGHT ? 200 : 0
  //     // });
  //   }
  // );

  const hiddenBlockStyles = useAnimatedStyle(() => ({
    height: hiddenBlockHeight.value
  }));

  const scrollSpaces = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: isAndroid ? 0 : isScrollViewMinPosition.value ? HEADER_MAX_HEIGHT : 0
      }
    ],
    paddingTop: isAndroid ? HEADER_MAX_HEIGHT : isScrollViewMinPosition.value ? 0 : HEADER_MAX_HEIGHT,
    backgroundColor: isAndroid ? 'transparent' : isScrollViewMinPosition.value ? '#fff' : 'transparent'
  }));

  // const androidScrollViewTranslate = useAnimatedStyle(() => {
  //   const translateY = 0;

  //   return { transform: [{ translateY }] };
  // });

  return (
    <View className="flex-1 relative" style={{ backgroundColor: '#ea004b', paddingTop: insets.top }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Cart isOpen={isCartOpen} close={onCloseCartPress} />

      <View className="flex-1 relative">
        <Animated.View style={[{ backgroundColor: '#ea004b' }, isAndroid ? headerAnimatedStyle : hiddenBlockStyles]}>
          <Animated.View
            className="px-4 mb-6 flex-row justify-between items-center"
            style={isAndroid ? addressAnimatedStyle2 : addressAnimatedStyle}
          >
            <TouchableOpacity className="flex-row items-center gap-2" onPress={onAddressPress} activeOpacity={0.7}>
              <Icon set="ion" name="location" size={28} color="white" />

              <View className={!isAndroid ? 'mt-1.5' : ''}>
                <Text className="font-semibold text-white">Магаданская 14</Text>
                <Text className="text-sm text-stone-200">Грозный</Text>
              </View>
            </TouchableOpacity>

            <View className="flex-row gap-3">
              <Pressable className="w-10 h-10 rounded-full justify-center items-center" onPress={onFavouritesPress}>
                <Icon set="ion" name="heart-outline" size={21} color="white" />
              </Pressable>

              <Pressable className="w-10 h-10 rounded-full justify-center items-center" onPress={onCartPress}>
                <Icon set="feather" name="shopping-bag" size={18} color="white" />
              </Pressable>
            </View>
          </Animated.View>

          <Animated.View
            className="mx-4 pl-3 bg-white flex-row items-center gap-3 rounded-full"
            style={isAndroid ? searchInputAnimatedStyle2 : searchInputAnimatedStyle}
          >
            <Icon set="feather" name="search" />
            <TextInput
              placeholderTextColor="#777777"
              placeholder="Поиск ресторанов и кафе"
              value={searchQuery}
              onChangeText={onSearchQueryChange}
              className="flex-1 py-3 font-panton leading-[17px]"
            />
          </Animated.View>
        </Animated.View>

        <Image
          className="w-full h-[140px] absolute left-0 top-[110px]"
          source={require('../../assets/images/grozny2.png')}
          resizeMode="cover"
        />

        {/* <Animated.View style={[hiddenBlockStyles]}></Animated.View> */}

        <Animated.ScrollView
          ref={scrollRef}
          className="rounded-t-3xl relative z-20 bg-white"
          style={[scrollSpaces]}
          // pointerEvents={isAnimating.value ? 'none' : 'auto'}
          // scrollEnabled={!isAnimating.value}
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          contentInsetAdjustmentBehavior="never"
          scrollEventThrottle={16}
          removeClippedSubviews={false}
          overScrollMode="never"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              className="text-stone-200"
              tintColor="black"
              colors={['black']}
              progressBackgroundColor="black"
            />
          }
        >
          <View className="rounded-t-3xl py-6 bg-white">
            <Categories activeCategoryId={activeCategoryId} onCategorySelect={onCategoryPress} />

            {activeCategoryId === null && (
              <>
                <Slider />
                {/* <PromoSlide /> */}
                <RestaurantsListPreview list={RESTAURANTS2} title="🛵 Закажите еще раз" />

                <PopularBrands list={POPULAR_BRANDS} title="⭐️ Популярные бренды" />

                <RestaurantsListPreview list={RESTAURANTS} title="📍 Рядом с вами" />

                <RestaurantsListPreview list={RESTAURANTS2} title="🔁 Часто заказывают" />
              </>
            )}

            <View className="py-2 bg-stone-200 mb-8 mt-4" />

            <AllRestaurantsList list={[...RESTAURANTS, ...RESTAURANTS2]} title="Все рестораны" />
          </View>
        </Animated.ScrollView>
      </View>
    </View>
  );
}
