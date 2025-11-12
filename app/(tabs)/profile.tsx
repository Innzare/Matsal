import React, { useRef, useState } from 'react';
import { Dimensions, Pressable, StatusBar, Text, TextInput, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';

const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 70;
const ADDRESS_HIDE_Y = 70; // scrollY, после которого скрываем адрес
// const ADDRESS_SECTION_HEIGHT = 55;

export default function SearchScreen() {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

  const scrollY = useSharedValue(0);
  const addressOpacity = useSharedValue(1);

  const insets = useSafeAreaInsets();

  const scrollRef = useRef<Animated.ScrollView>(null);

  const [refreshing, setRefreshing] = useState(false);
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);

  // const y = useSharedValue(HEADER_MAX_HEIGHT);
  const y = useSharedValue(HEADER_MAX_HEIGHT);

  const offsetY = useSharedValue(0);

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }]
  }));

  const scrollToY = (offset: number) => {
    scrollRef.current?.scrollTo({ y: offset, animated: false });
  };

  // const scrollSectionToY = (offset: number) => {
  //   scrollRef.current?.scrollTo({
  //     y: Math.max(0, scrollY.value - offset / 5), // направление и сила
  //     animated: true
  //   });
  // };

  const dragGesture = Gesture.Pan()
    .onStart(() => {
      // сохраняем начальное положение при старте

      offsetY.value = y.value;
    })
    .onChange((e) => {
      // Новые координаты
      let newY = offsetY.value + e.translationY;
      const deltaY = HEADER_MIN_HEIGHT - newY;

      console.log('e.translationY', e.translationY);

      // Ограничиваем движение
      newY = Math.max(HEADER_MIN_HEIGHT, Math.min(newY, HEADER_MAX_HEIGHT));

      // if (y.value === HEADER_MIN_HEIGHT && e.translationY > 0) {
      //   runOnJS(setIsScrollEnabled)(true);
      //   runOnJS(scrollToY)(-deltaY);
      // }

      if (y.value <= HEADER_MIN_HEIGHT) {
        // console.log('Свайп вверх');
        // runOnJS(scrollToY)(deltaY);

        scheduleOnRN(setIsScrollEnabled, true);
      }
      // console.log('newY', newY);
      // console.log('y.value', y.value);

      y.value = newY;

      if (newY <= ADDRESS_HIDE_Y) {
        // y.value = withTiming(HEADER_MIN_HEIGHT, { duration: 50 });
      }

      // console.log('e.translationY', e.translationY);

      // Определяем направление свайпа
      // if (e.translationY >= 0 && newY === HEADER_MAX_HEIGHT) {
      //   console.log('Свайп вниз');
      //   // runOnJS(setIsScrollEnabled)(false);
      // } else if (e.translationY <= 0 && newY < HEADER_MAX_HEIGHT) {
      //   console.log('Свайп вверх');
      //   // runOnJS(setIsScrollEnabled)(false);
      // }

      // вызываем setState через runOnJS
      // if (newY <= HEADER_MIN_HEIGHT) {
      //   runOnJS(setIsScrollEnabled)(true);
      // } else {
      //   runOnJS(setIsScrollEnabled)(false);
      // }
    })
    .onEnd((e) => {
      // если хочешь, можно добавить возврат, но необязательно
      // if (y.value > HEADER_MIN_HEIGHT) {
      //   // console.log('Свайп вверх');
      //   runOnJS(setIsScrollEnabled)(false);
      // }

      if (y.value <= HEADER_MIN_HEIGHT) {
        scheduleOnRN(setIsScrollEnabled, true);

        // остаточное скольжение
        // runOnJS(scrollSectionToY)(e.velocityY);

        return;
      }

      y.value = withDecay({
        velocity: e.velocityY,
        clamp: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT] // ограничиваем движение
      });
    });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;

      // let newY = offsetY.value + event.contentOffset.y;
      const deltaY = HEADER_MIN_HEIGHT + event.contentOffset.y;

      // if (scrollY.value < 0 && y.value === HEADER_MIN_HEIGHT) {
      //   runOnJS(setIsScrollEnabled)(false);
      //   // runOnJS(scrollSectionToY)(deltaY);
      // }

      console.log('scrollY.value', scrollY.value);
      console.log('y.value', y.value);
    }
  });

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>('');

  const onFavouritesPress = () => {
    router.push('/favourites');
  };

  const onCartPress = () => {
    // setIsModalVisible(true);
  };

  const onSearchQueryChange = (value: string) => {
    setSearchQuery(value);
  };

  // const handleScroll = (event: any) => {
  //   const yOffset = event.nativeEvent.contentOffset.y;

  //   console.log('Текущая позиция скролла:', yOffset);

  //   // scrollRef.current?.scrollTo({ y: 0, animated: true });

  //   // Если хочешь сохранить привязку Animated.event — вызывай его вручную:
  //   // Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })(event);
  // };

  // const headerHeight = useAnimatedStyle(() => {
  //   const height = interpolate(
  //     scrollY.value,
  //     [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
  //     [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
  //     {
  //       extrapolateLeft: Extrapolation.CLAMP,
  //       extrapolateRight: Extrapolation.CLAMP
  //     }
  //   );

  //   return { height };
  // });

  // const paddingTop = useAnimatedStyle(() => {
  //   const paddingTop = interpolate(
  //     scrollY.value,
  //     [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
  //     [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
  //     {
  //       extrapolateLeft: Extrapolation.CLAMP,
  //       extrapolateRight: Extrapolation.CLAMP
  //     }
  //   );

  //   return { height };
  // });

  // const addressOpacity = scrollY.interpolate({
  //   inputRange: [0, 50],
  //   outputRange: [1, 0],
  //   extrapolate: 'clamp'
  // });

  // const searchTranslateY = scrollY.interpolate({
  //   inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
  //   outputRange: [0, -ADDRESS_SECTION_HEIGHT],
  //   extrapolate: 'clamp'
  // });
  // const headerHeight = scrollY.interpolate({
  //   inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
  //   outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
  //   extrapolate: 'clamp'
  // });

  // const addressOpacity = scrollY.interpolate({
  //   inputRange: [0, 50],
  //   outputRange: [1, 0],
  //   extrapolate: 'clamp'
  // });

  // const searchTranslateY = scrollY.interpolate({
  //   inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
  //   outputRange: [0, -ADDRESS_SECTION_HEIGHT],
  //   extrapolate: 'clamp'
  // });

  const onRefresh = async () => {
    setRefreshing(true);
    // // Здесь твоя логика обновления данных
    // await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  useAnimatedReaction(
    () => y.value <= ADDRESS_HIDE_Y,
    (shouldHide, previous) => {
      const config = { duration: 200 };
      if (shouldHide !== previous) {
        addressOpacity.value = withTiming(shouldHide ? 0 : 1, config);
        y.value = withTiming(shouldHide ? HEADER_MIN_HEIGHT : HEADER_MAX_HEIGHT, config);
      }
    }
  );

  const addressAnimatedStyle = useAnimatedStyle(() => ({
    opacity: addressOpacity.value,
    transform: [{ translateY: (1 - addressOpacity.value) * -50 }]
  }));

  const searchInputAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - addressOpacity.value) * -50 }]
  }));

  // Анимация translateY для ScrollView - двигаем его вверх
  const scrollViewAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, HEADER_MAX_HEIGHT], [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP
    });

    return { transform: [{ translateY }] };
  });

  return (
    <GestureHandlerRootView style={{ backgroundColor: '#ea004b', paddingTop: insets.top }}>
      <View className="flex-1 relative" style={{ backgroundColor: '#ea004b' }}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        <Animated.View
          className="left-0 top-0 w-[100%] z-10"
          style={[{ backgroundColor: '#ea004b', height: HEADER_MIN_HEIGHT }]}
        >
          <Animated.View
            className="px-4 mb-6 flex-row justify-between items-center"
            // style={{
            //   opacity: addressOpacity
            // }}
            style={addressAnimatedStyle}
          >
            <View className="flex-row items-center gap-2">
              <Icon set="ion" name="location" size={28} color="white" />

              <View>
                <Text className="font-semibold text-white">Магаданская 14</Text>
                <Text className="text-sm text-stone-200">Грозный</Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <Pressable className=" w-10 h-10 rounded-full justify-center items-center" onPress={onFavouritesPress}>
                <Icon set="ion" name="heart-outline" size={21} color="white"></Icon>
              </Pressable>

              <Pressable className=" w-10 h-10 rounded-full justify-center items-center" onPress={onCartPress}>
                <Icon set="feather" name="shopping-bag" size={18} color="white"></Icon>
              </Pressable>
            </View>
          </Animated.View>

          <Animated.View
            className="mx-4 mb-8 pl-4 bg-white flex-row items-center gap-3 rounded-full"
            // style={{ transform: [{ translateY: searchTranslateY }] }}
            style={searchInputAnimatedStyle}
          >
            <Icon set="feather" name="search"></Icon>
            <TextInput
              placeholderTextColor="#777777"
              placeholder="Поиск ресторанов и кафе"
              defaultValue={searchQuery}
              onChangeText={onSearchQueryChange}
              className="flex-1 py-3 font-panton leading-[17px]"
            />
          </Animated.View>
        </Animated.View>
      </View>

      <GestureDetector gesture={dragGesture}>
        <Animated.ScrollView
          ref={scrollRef}
          scrollEnabled={isScrollEnabled}
          showsVerticalScrollIndicator={isScrollEnabled}
          // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={100} />}
          contentContainerStyle={
            {
              // paddingTop: HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT
            }
          }
          className="rounded-t-3xl bg-white p-6 mb-20"
          style={[translateY]}
          // onScroll={handleScroll}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          {Array.from({ length: 20 }).map((item, index) => {
            return <View key={index} className="bg-stone-500 rounded-xl h-20 mb-6"></View>;
          })}
        </Animated.ScrollView>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
