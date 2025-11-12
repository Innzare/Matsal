import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, View } from 'react-native';

export default function RestaurantItem(props: any) {
  const { data, block = false } = props;

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
    <Pressable
      className="relative overflow-hidden active:scale-95 transition-transform duration-850"
      onPress={onRestaurantPress}
    >
      <Image
        className={`rounded-xl ${block ? 'w-full h-[190px]' : 'w-[290px] h-[150px]'}`}
        source={{ uri: imageSrc }}
        resizeMode="cover"
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
    </Pressable>
  );
}
