import { Icon } from '@/components/Icon';
import Circle from '@/components/Icons/Circle';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { ScrollView, StatusBar, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Search() {
  const inputRef = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isFocused]);

  return (
    <ScrollView className="bg-white flex-1" contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top }}>
      {isFocused ? <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" /> : null}

      <View className="mx-4 pl-3 py-1 bg-stone-100 border border-stone-200 flex-row items-center gap-3 rounded-full">
        <Icon set="feather" name="search" />
        <TextInput
          ref={inputRef}
          placeholderTextColor="#777"
          placeholder="Поиск ресторанов и кафе"
          // value={searchQuery}
          // onChangeText={onSearchQueryChange}
          className="flex-1 py-3 font-panton leading-[17px]"
        />
      </View>

      <Circle />
    </ScrollView>
  );
}
