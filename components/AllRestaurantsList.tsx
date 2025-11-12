import { Icon } from '@/components/Icon';
import RestaurantItem from '@/components/RestaurantItem';
import { Text } from '@/components/Text';
import React from 'react';
import { View } from 'react-native';

export default function AllRestaurantsList(props: any) {
  const { list = [], title = '' } = props;

  return (
    <>
      <View className="flex-row items-center justify-between gap-2 mb-4 px-6">
        <Text className="text-2xl text-stone-800 text-left font-bold">{title}</Text>

        <Icon set="feather" name="arrow-right-circle" color="#777" />
      </View>

      <View className="gap-6 px-6">
        {list.map((item: any, index: number) => {
          return <RestaurantItem key={index} data={item} block />;
        })}
      </View>
    </>
  );
}
