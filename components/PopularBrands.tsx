import { Text } from '@/components/Text';
import React from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';

export default function PopularBrands(props: any) {
  const { list, title = '' } = props;

  return (
    <View className="mb-6">
      <Text className="text-2xl font-semibold mb-4 px-6">{title}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
        <View className="flex-row gap-4">
          {list.map((item: any, index: number) => {
            return (
              <Pressable key={index} className="active:scale-90 transition-transform duration-150">
                <Image source={{ uri: item.image }} className="w-[80px] h-[80px] rounded-xl" resizeMode="cover" />

                <Text className="mt-2 text-center text-sm font-bold text-wrap w-[80px]">{item.name}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
