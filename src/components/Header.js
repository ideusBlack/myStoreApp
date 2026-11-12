import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { C } from '../theme';

export default function Header() {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, []);
  return (
    <View style={s.header}>
      <Animated.View style={{ opacity: a, transform: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [-12, 0] }) }], alignItems: 'center' }}>
        <Text style={s.logo}> Apple Store</Text>
        <Text style={s.sub}>PRODUCTOS OFICIALES</Text>
      </Animated.View>
    </View>
  );
}
const s = StyleSheet.create({
  header: { backgroundColor: C.dark, paddingVertical: 14, alignItems: 'center' },
  logo: { fontSize: 20, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  sub: { fontSize: 9, color: '#A1A1A6', marginTop: 2, letterSpacing: 2 },
});
