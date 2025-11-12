// import { Icon } from '@/components/Icon';
// import React, { useRef, useState } from 'react';
// import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';

// const { width } = Dimensions.get('window');

// const images = [
//   'https://picsum.photos/id/1019/800/400',
//   'https://picsum.photos/id/1015/800/400',
//   'https://picsum.photos/id/1020/800/400'
// ];

// export default function ImageSlider() {
//   const carouselRef: any = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <View style={styles.container} className="bg-white flex-1">
//       <Carousel
//         ref={carouselRef}
//         width={width}
//         height={200}
//         data={images}
//         autoPlay
//         autoPlayInterval={2500}
//         loop
//         onSnapToItem={(index) => setActiveIndex(index)}
//         renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
//       />

//       {/* Pagination dots */}
//       <View style={styles.pagination}>
//         {images.map((_, index) => (
//           <View key={index} style={[styles.dot, { opacity: index === activeIndex ? 1 : 0.3 }]} />
//         ))}
//       </View>

//       <View className="flex-row items-center gap-6 mt-10">
//         <Pressable
//           onPress={() => carouselRef.current?.prev()}
//           className="border border-stone-500 rounded-full w-10 h-10 justify-center items-center"
//         >
//           <Icon set="feather" name="arrow-left"></Icon>
//         </Pressable>

//         <Pressable
//           onPress={() => carouselRef.current?.next()}
//           className="border border-stone-500 rounded-full w-10 h-10 justify-center items-center"
//         >
//           <Icon set="feather" name="arrow-right"></Icon>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center'
//   },
//   image: {
//     width: width - 40,
//     height: 200,
//     borderRadius: 10,
//     alignSelf: 'center'
//   },
//   pagination: {
//     flexDirection: 'row',
//     // position: 'absolute',
//     // bottom: 10,
//     backgroundColor: '#ccc',
//     marginTop: 10,
//     borderRadius: 10,
//     padding: 10,
//     zIndex: 10
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: 'white',
//     marginHorizontal: 4
//   }
// });

// ==================================================================
// ==================================================================
// ==================================================================
// ==================================================================
// ==================================================================
// ==================================================================

// import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
// import React, { useCallback, useMemo, useRef, useState } from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const App = () => {
//   // hooks
//   const sheetRef = useRef<BottomSheet>(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // variables
//   const data = useMemo(
//     () =>
//       Array(50)
//         .fill(0)
//         .map((_, index) => `index-${index}`),
//     []
//   );
//   const snapPoints = useMemo(() => ['70%', '80%'], []);

//   // callbacks
//   const handleSheetChange = useCallback((index: any) => {
//     console.log('handleSheetChange', index);
//   }, []);
//   const handleSnapPress = useCallback((index: any) => {
//     sheetRef.current?.snapToIndex(index);
//   }, []);
//   const handleClosePress = useCallback(() => {
//     sheetRef.current?.close();
//   }, []);

//   // render
//   const renderItem = useCallback(
//     (item: any) => (
//       <View key={item} style={styles.itemContainer}>
//         <Text>1</Text>
//       </View>
//     ),
//     []
//   );

//   const handleRefresh = useCallback(() => {
//     setIsRefreshing(true);
//     // Ваш код для обновления данных
//     setTimeout(() => {
//       setIsRefreshing(false);
//     }, 2000); // Замените на реальное время обновления
//   }, []);

//   // renders
//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <Button title="Snap To 80%" onPress={() => handleSnapPress(0)} />
//       {/* <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
//       <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} /> */}
//       <Button title="Close" onPress={() => handleClosePress()} />

//       <BottomSheet
//         ref={sheetRef}
//         index={0}
//         snapPoints={snapPoints}
//         enableDynamicSizing={false}
//         onChange={handleSheetChange}
//         handleIndicatorStyle={{ display: 'none', borderRadius: 20 }}
//         handleComponent={null}
//         style={{ backgroundColor: 'red', borderRadius: 20 }}
//       >
//         {/* <BottomSheetFlatList
//           data={data}
//           renderItem={renderItem}
//           contentContainerStyle={styles.contentContainer}
//           refreshing={false}
//           onRefresh={handleRefresh}
//         /> */}
//         <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
//           {data.map(renderItem)}
//         </BottomSheetScrollView>
//       </BottomSheet>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 200,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20
//   },
//   contentContainer: {
//     backgroundColor: 'grey',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20
//   },
//   itemContainer: {
//     padding: 6,
//     margin: 4,
//     borderRadius: 5,
//     backgroundColor: '#eee'
//   }
// });

// export default App;

// ==================================================================
// ==================================================================
// ==================================================================
// ==================================================================
// ==================================================================
// ==================================================================

// import { Icon } from '@/components/Icon';
// import { useRouter } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import { Pressable, RefreshControl, StatusBar, Text, TextInput, View } from 'react-native';
// import Animated, {
//   Extrapolation,
//   interpolate,
//   runOnJS,
//   useAnimatedReaction,
//   useAnimatedScrollHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming
// } from 'react-native-reanimated';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const HEADER_MAX_HEIGHT = 120;
// const HEADER_MIN_HEIGHT = 70;
// const ADDRESS_HIDE_Y = 70; // scrollY, после которого скрываем адрес

// export default function SearchScreen() {
//   const scrollY = useSharedValue(0);
//   const scrollRef = useRef<Animated.ScrollView>(null);

//   const scrollEnabled = useSharedValue(false);
//   const [isScrollEnabled, setIsScrollEnabled] = useState(false);
//   const [isMinSize, setIsMinSize] = useState(false);

//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [refreshing, setRefreshing] = useState(false);

//   const insets = useSafeAreaInsets();
//   const scrollToY = (offset: number) => {
//     scrollRef.current?.scrollTo({ y: offset, animated: false });
//   };

//   // useAnimatedReaction(
//   //   () => scrollY.value,
//   //   (y) => {
//   //     const shouldEnableScroll = y >= ADDRESS_HIDE_Y;

//   //     if (shouldEnableScroll) {
//   //       // runOnJS(scrollToY)(HEADER_MAX_HEIGHT);
//   //       scrollY.value = HEADER_MAX_HEIGHT;
//   //     }
//   //   }
//   // );

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       scrollY.value = event.contentOffset.y;

//       // if (event.contentOffset.y >= ADDRESS_HIDE_Y) {
//       //   runOnJS(scrollToY)(120);
//       // }

//       if (event.contentOffset.y <= 0) {
//         runOnJS(setIsScrollEnabled)(true);
//       } else {
//         runOnJS(setIsScrollEnabled)(false);
//       }

//       if (event.contentOffset.y >= ADDRESS_HIDE_Y) {
//         runOnJS(setIsMinSize)(true);
//       } else {
//         runOnJS(setIsMinSize)(false);
//       }

//       // if (event.contentOffset.y > 1) {
//       //   runOnJS(scrollToY)(0);
//       // }
//     }
//   });

//   const onRefresh = () => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000);
//   };

//   const onFavouritesPress = () => {
//     router.push('/favourites');
//   };

//   const onCartPress = () => {
//     // Handle cart press
//   };

//   const onSearchQueryChange = (value: string) => {
//     setSearchQuery(value);
//   };

//   // // Анимация высоты заголовка
//   // const headerAnimatedStyle = useAnimatedStyle(() => {
//   //   const height = interpolate(scrollY.value, [0, HEADER_SCROLL_DISTANCE], [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT], {
//   //     extrapolateLeft: Extrapolation.CLAMP,
//   //     extrapolateRight: Extrapolation.CLAMP
//   //   });

//   //   return { height };
//   // });

//   // Анимация opacity для адреса
//   // const addressAnimatedStyle = useAnimatedStyle(() => {
//   //   const opacity = interpolate(scrollY.value, [0, 50], [1, 0], {
//   //     extrapolateLeft: Extrapolation.CLAMP,
//   //     extrapolateRight: Extrapolation.CLAMP
//   //   });

//   //   return { opacity };

//   const addressOpacity = useSharedValue(1);
//   useAnimatedReaction(
//     () => scrollY.value >= ADDRESS_HIDE_Y,
//     (shouldHide, previous) => {
//       const config = { duration: 200 };
//       if (shouldHide !== previous) {
//         addressOpacity.value = withTiming(shouldHide ? 0 : 1, config);
//         scrollY.value = withTiming(shouldHide ? HEADER_MIN_HEIGHT : 0, config);
//       }
//     }
//   );

//   const headerHeight = useAnimatedStyle(() => {
//     const height = interpolate(scrollY.value, [0, HEADER_MAX_HEIGHT], [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT], {
//       extrapolateLeft: Extrapolation.CLAMP,
//       extrapolateRight: Extrapolation.CLAMP
//     });

//     return { height };
//   });

//   const addressAnimatedStyle = useAnimatedStyle(() => ({
//     opacity: addressOpacity.value,
//     transform: [{ translateY: (1 - addressOpacity.value) * -100 }]
//   }));

//   const searchInputAnimatedStyle = useAnimatedStyle(() => ({
//     transform: [{ translateY: (1 - addressOpacity.value) * -50 }]
//   }));

//   const scrollSpaces = useAnimatedStyle(() => ({
//     transform: [{ translateY: isScrollEnabled ? HEADER_MAX_HEIGHT : 0 }],
//     paddingTop: isScrollEnabled ? 0 : HEADER_MAX_HEIGHT,
//     backgroundColor: isScrollEnabled ? '#fff' : 'transparent'
//   }));

//   // Анимация translateY для ScrollView - двигаем его вверх
//   const scrollViewAnimatedStyle = useAnimatedStyle(() => {
//     const translateY = interpolate(scrollY.value, [0, HEADER_MAX_HEIGHT], [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT], {
//       extrapolateLeft: Extrapolation.CLAMP,
//       extrapolateRight: Extrapolation.CLAMP
//     });

//     return { transform: [{ translateY: translateY }] };
//   });

//   return (
//     <View className="flex-1" style={{ backgroundColor: '#ea004b', paddingTop: insets.top }}>
//       <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

//       <View className="flex-1 relative">
//         <Animated.View className=" left-0 top-0 z-10 w-full" style={[{ backgroundColor: '#ea004b' }, headerHeight]}>
//           <Animated.View className="px-4 mb-6 flex-row justify-between items-center" style={addressAnimatedStyle}>
//             <View className="flex-row items-center gap-2">
//               <Icon set="ion" name="location" size={28} color="white" />
//               <View>
//                 <Text className="font-semibold text-white">Магаданская 14</Text>
//                 <Text className="text-sm text-stone-200">Грозный</Text>
//               </View>
//             </View>

//             <View className="flex-row gap-3">
//               <Pressable className="w-10 h-10 rounded-full justify-center items-center" onPress={onFavouritesPress}>
//                 <Icon set="ion" name="heart-outline" size={21} color="white" />
//               </Pressable>

//               <Pressable className="w-10 h-10 rounded-full justify-center items-center" onPress={onCartPress}>
//                 <Icon set="feather" name="shopping-bag" size={18} color="white" />
//               </Pressable>
//             </View>
//           </Animated.View>

//           <Animated.View
//             className="mx-4 mb-8 pl-4 bg-white flex-row items-center gap-3 rounded-full"
//             style={searchInputAnimatedStyle}
//           >
//             <Icon set="feather" name="search" />
//             <TextInput
//               placeholderTextColor="#777777"
//               placeholder="Поиск ресторанов и кафе"
//               value={searchQuery}
//               onChangeText={onSearchQueryChange}
//               className="flex-1 py-3 font-panton leading-[17px]"
//             />
//           </Animated.View>
//         </Animated.View>

//         {/* <Animated.View className="border-blue-500 border-2" style={[headerHeight]}></Animated.View> */}

//         {/* <View className="absolute w-full h-10 left-0 bottom-100 bg-white z-10"></View> */}

//         <Animated.ScrollView
//           ref={scrollRef}
//           className="rounded-t-3xl relative z-20"
//           // scrollEnabled={isScrollEnabled}
//           style={scrollSpaces}
//           // style={[scrollViewAnimatedStyle]}
//           // bounces={false}
//           // alwaysBounceVertical={false}
//           showsVerticalScrollIndicator={false}
//           onScroll={scrollHandler}
//           scrollEventThrottle={16}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               tintColor="#000"
//               colors={['#000']}
//               progressBackgroundColor="#000"
//             />
//           }
//         >
//           <View className="rounded-t-3xl py-6 bg-white">
//             {/* <Categories />
//             <PromoSlide />

//             <RestaurantsListPreview list={RESTAURANTS} title="Рядом с вами" />
//             <RestaurantsListPreview list={RESTAURANTS2} title="Популярное" />

//             <AllRestaurantsList list={[...RESTAURANTS, ...RESTAURANTS2]} title="Все рестораны" /> */}
//             {Array.from({ length: 20 }).map((_, index) => (
//               <View key={index} className="bg-stone-500 rounded-xl h-20 mb-6" />
//             ))}
//           </View>
//         </Animated.ScrollView>
//       </View>
//     </View>
//   );
// }

// ==================================================================
// ==================================================================
// ==================================================================
// ==================================================================
// ==================================================================
// ==================================================================

import { BottomSheetMethods } from '@/components/BottomSheet/BottomSheet';
// import BottomSheetFlatList from '@/components/BottomSheet/BottomSheet/FlatList';
import BottomSheetScrollView from '@/components/BottomSheet/BottomSheetScrollView';
import Lorem from '@/components/BottomSheet/Lorem';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetScreenScroll = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const bottomSheetRef2 = useRef<BottomSheetMethods>(null);
  const bottomSheetRef3 = useRef<BottomSheetMethods>(null);
  const bottomSheetRef4 = useRef<BottomSheetMethods>(null);

  const sheetRef = useRef<BottomSheet>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ['70%', '80%'], []);

  // callbacks
  const handleSheetChange = useCallback((index: any) => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback((index: any) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    (item: any) => (
      <View key={item} style={styles.itemContainer}>
        <Text>1</Text>
      </View>
    ),
    []
  );

  const pressHandler = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const pressHandler2 = useCallback(() => {
    bottomSheetRef2.current?.expand();
  }, []);
  const pressHandler3 = useCallback(() => {
    bottomSheetRef3.current?.expand();
  }, []);
  const pressHandler4 = useCallback(() => {
    bottomSheetRef4.current?.expand();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          {/* <Button title="Blank" onPress={() => pressHandler()} /> */}
          {/* <Button title="Example" onPress={() => pressHandler2()} /> */}
          <Button title="ScrollView" onPress={() => pressHandler3()} />
          {/* <Button title="Flatlist" onPress={() => pressHandler4()} /> */}
          {/* <BottomSheet ref={bottomSheetRef} snapTo={'50%'} backgroundColor={'white'} backDropColor={'black'} />
          <BottomSheet ref={bottomSheetRef2} snapTo={'60%'} backgroundColor={'#ffe7cf'} backDropColor={'black'}>
            <Example />
          </BottomSheet> */}
          <BottomSheetScrollView
            ref={bottomSheetRef3}
            snapTo={[70, 90]}
            backgroundColor={'white'}
            backDropColor={'black'}
          >
            <Lorem />
          </BottomSheetScrollView>
          {/* <BottomSheetFlatList
            ref={bottomSheetRef4}
            data={data}
            renderItem={({ item, index }) => {
              return <RenderItem item={item} key={index} />;
            }}
            snapTo={'50%'}
            backgroundColor={'white'}
            backDropColor={'black'}
          /> */}

          {/* <BottomSheet
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            onChange={handleSheetChange}
            handleIndicatorStyle={{ display: 'none', borderRadius: 20 }}
            handleComponent={null}
            style={{ backgroundColor: 'red', borderRadius: 20 }}
          >
            <GorhomBottomSheetScrollView contentContainerStyle={styles.contentContainer}>
              {data.map(renderItem)}
            </GorhomBottomSheetScrollView>
          </BottomSheet> */}
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default BottomSheetScreenScroll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  itemContainer: {
    padding: 6,
    margin: 4,
    borderRadius: 5,
    backgroundColor: '#eee'
  },

  contentContainer: {
    backgroundColor: 'grey',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  }
});
