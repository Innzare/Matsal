import { Icon } from '@/components/Icon';
import RestaurantItem from '@/components/RestaurantItem';
import { Text } from '@/components/Text';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function RestaurantsListPreview(props: any) {
  const { title = '', list } = props;

  return (
    <>
      <View className="flex-row items-center justify-between gap-2 mb-3 px-6">
        <Text className="text-2xl text-stone-800 text-left font-bold">{title}</Text>

        <Icon set="feather" name="arrow-right-circle" color="#777" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
        <View className="flex-row gap-5 px-6">
          {list.map((item: any, index: number) => {
            return <RestaurantItem key={index} data={item} />;
          })}
        </View>
      </ScrollView>
    </>
  );
}
