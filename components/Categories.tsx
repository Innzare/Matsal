import { Text } from '@/components/Text';
import { CATEGORIES } from '@/constants/resources';
import { Image } from 'expo-image';
import React from 'react';
import { FlatList, Pressable, View } from 'react-native';

export default function Categories(props: any) {
  const { activeCategoryId, onCategorySelect, ...rest } = props;

  const isActiveCategory = (categoryId: number) => {
    return activeCategoryId === categoryId;
  };

  return (
    <View {...rest}>
      <Text className="text-2xl text-stone-800 text-left font-bold mb-2 px-6 font-quicksand-bold">Категории</Text>

      <FlatList
        data={[...CATEGORIES, ...CATEGORIES]}
        initialNumToRender={0}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <Pressable
              className="items-center gap-2 active:scale-95 transition-transform duration-150"
              onPress={() => onCategorySelect(item.id)}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  overflow: 'hidden',
                  borderWidth: isActiveCategory(item.id) ? 2 : 1,
                  borderColor: isActiveCategory(item.id) ? '#3d3d3d' : '#ccc',
                  backgroundColor: '#eee'
                }}
              />

              <Text className="text-sm">{item.name}</Text>
            </Pressable>
          );
        }}
        contentContainerStyle={{
          flexDirection: 'row',
          gap: 15,
          paddingHorizontal: 24
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
