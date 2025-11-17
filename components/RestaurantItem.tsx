import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function RestaurantItem(props: any) {
  const { data, block = false } = props;
  const animation = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(animation.value, { duration: 200, easing: Easing.inOut(Easing.linear) }) }]
  }));

  const { src: imageSrc = '', name = '', deliveryTimeAndPrice = '', rate = '', reviewsCount = '', id = '' } = data;

  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState(false);

  const onFavouritePress = () => {
    setIsFavourite((prev) => !prev);
  };

  const onRestaurantPress = () => {
    setTimeout(() => {
      router.push(`/restaurants/${id}`);
    }, 0);
  };

  return (
    <AnimatedPressable
      onPressIn={() => {
        animation.value = 0.95;
      }}
      onPressOut={() => {
        animation.value = 1;
      }}
      className="relative overflow-hidden"
      onPress={onRestaurantPress}
      style={[animatedStyle]}
    >
      <Image
        style={{
          borderRadius: 10,
          width: block ? '100%' : 290,
          height: block ? 190 : 150
        }}
        transition={500}
        cachePolicy="memory-disk"
        source={{ uri: imageSrc }}
        contentFit="cover"
      />

      <Pressable
        className="absolute top-3 right-3 w-8 h-8 active:scale-90 transition-transform duration-150 items-center justify-center pt-0.5 bg-white rounded-full"
        onPress={onFavouritePress}
      >
        <Icon set="ion" name="heart" size={18} color={isFavourite ? 'red' : '#aaa'} />
      </Pressable>

      <View className="px-1 pt-2">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold">{name}</Text>

          <View className="flex-row items-center gap-1">
            <Icon set="ant" name="star" size={14} color="red" />
            <Text className="font-bold text-sm pt-0.5">{rate}</Text>
            <Text className="text-sm pt-0.5 ml-1">{reviewsCount}</Text>
          </View>
        </View>

        <Text className="text-sm text-stone-500 mt-0.5">{deliveryTimeAndPrice}</Text>
      </View>
    </AnimatedPressable>
  );
}
