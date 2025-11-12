import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Carts() {
  return (
    <SafeAreaView>
      <View className="px-4">
        <Text className="text-2xl font-bold text-emerald-700">Carts</Text>
      </View>
    </SafeAreaView>
  );
}
