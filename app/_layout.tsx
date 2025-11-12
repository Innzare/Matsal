import { SplashScreen, Stack } from 'expo-router';
import { StatusBar, View } from 'react-native';

import '@/assets/styles/global.css';
import { GlobalBottomSheet } from '@/components/GlobalBottomSheet';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Panton-Bold': require('@/assets/fonts/Panton-Bold.ttf'),
    'Panton-Light': require('@/assets/fonts/Panton-Light.ttf'),
    'Panton-Italic': require('@/assets/fonts/Panton-Italic.ttf'),
    'Panton-Regular': require('@/assets/fonts/Panton-Regular.ttf'),
    'Panton-SemiBold': require('@/assets/fonts/Panton-SemiBold.ttf')
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 relative bg-white">
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

        <View className="flex-1 relative bg-white">
          <View className="flex-1">
            {/* <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }} /> */}
            {/* <Stack screenOptions={{ headerShown: false, animation: 'none'}} /> */}
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ gestureEnabled: false, animation: 'none' }} />
              <Stack.Screen name="restaurant" options={{ gestureEnabled: true }} />
            </Stack>
          </View>

          {/* <BottomNavigation /> */}

          <GlobalBottomSheet />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
