import React, { useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = 70;

export const DATA = [
  {
    id: 1,
    title: 'Modern JS: A curated collection'
  },
  {
    id: 2,
    title: 'JavaScript notes for professionals'
  },
  {
    id: 3,
    title: 'JavaScript: The Good Parts'
  },
  {
    id: 4,
    title: 'JavaScript: The right way'
  },
  {
    id: 5,
    title: 'Exploring ES6'
  },
  {
    id: 6,
    title: 'JavaScript Enlightenment'
  },
  {
    id: 7,
    title: 'You dont know JS'
  },
  {
    id: 8,
    title: 'Learn JavaScript'
  },
  {
    id: 9,
    title: 'JavaScript succintly'
  },
  {
    id: 10,
    title: 'Human JavaScript'
  },
  {
    id: 11,
    title: 'JavaScript design patterns'
  },
  {
    id: 12,
    title: 'JS50: 50 illustrations in JS'
  },
  {
    id: 13,
    title: 'Eloqent JavaScript'
  },
  {
    id: 14,
    title: 'Practical ES6'
  },
  {
    id: 15,
    title: 'Speaking JavaScript'
  }
];

function DynamicHeader({ animHeaderValue }: any) {
  const animateHeaderBackgroundColor = animHeaderValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: ['blue', 'red'],
    extrapolate: 'clamp'
  });

  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp'
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animateHeaderHeight,
          backgroundColor: animateHeaderBackgroundColor
        }
      ]}
    >
      <Text style={styles.headerText}>A List of Books</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    paddingTop: 10
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

const HEADER_EXPANDED_HEIGHT = 250;
const HEADER_COLLAPSED_HEIGHT = 70;

export default function SearchScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp'
  });

  return (
    <SafeAreaView style={styless.container}>
      <Animated.View style={{ height: headerHeight, overflow: 'hidden' }}>
        <DynamicHeader animHeaderValue={scrollY} />
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT
        }}
        // contentInset={{ top: 300 }}
        // scrollIndicatorInsets={{ top: 400 }}
        // stickyHeaderIndices={[0]}
        // style={{ marginTop: -(HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT) }}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      >
        {DATA.map((book) => (
          <Text key={book.id} className="text-3xl mb-10">
            {book.title}
          </Text>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styless = StyleSheet.create({
  container: { flex: 1 },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden'
  }
});
