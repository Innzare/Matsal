import { Text } from '@/components/Text';
import { CATEGORIES } from '@/constants/resources';
import React from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';

export default function Categories(props: any) {
  const { activeCategoryId, onCategorySelect } = props;

  const isActiveCategory = (categoryId: number) => {
    return activeCategoryId === categoryId;
  };

  return (
    <>
      <Text className="text-2xl text-stone-800 text-left font-bold mb-2 px-6 font-quicksand-bold">Категории</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-4 mb-6 px-6">
          {[...CATEGORIES, ...CATEGORIES].map((item, index) => {
            return (
              <Pressable
                key={index}
                className="items-center gap-2 active:scale-95 transition-transform duration-150"
                onPress={() => onCategorySelect(item.id)}
              >
                <Image
                  source={{ uri: item.image }}
                  className={`w-[60px] h-[60px] transition-all rounded-2xl bg-stone-200 overflow-hidden border  ${isActiveCategory(item.id) ? 'border-stone-500 border-2' : 'border-stone-300'}`}
                />

                <Text className="text-sm">{item.name}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
