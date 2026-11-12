import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { C, shadow } from '../theme';

const { width: W } = Dimensions.get('window');
const D = [
  { id: 'c1', nombre: 'iPhone 18 Pro Max', badge: 'NUEVO', uri: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800' },
  { id: 'c2', nombre: 'iPad M5', badge: 'ULTRA POTENTE', uri: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800' },
  { id: 'c3', nombre: 'Apple Watch Series 10', badge: 'SALUD AVANZADA', uri: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800' },
];

export default function Carousel() {
  const sx = useRef(new Animated.Value(0)).current;
  const ref = useRef(null);
  const idx = useRef(0);

  useEffect(() => {
    const t = setInterval(() => {
      idx.current = (idx.current + 1) % D.length;
      ref.current?.scrollTo({ x: idx.current * W, animated: true });
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <View style={{ marginTop: 14 }}>
      <Animated.ScrollView
        ref={ref} horizontal pagingEnabled showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => (idx.current = Math.round(e.nativeEvent.contentOffset.x / W))}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: sx } } }], { useNativeDriver: true })}
      >
        {D.map((it, i) => {
          const r = [(i - 1) * W, i * W, (i + 1) * W];
          return (
            <View key={it.id} style={s.page}>
              <Animated.View style={[s.slide, { transform: [{ scale: sx.interpolate({ inputRange: r, outputRange: [0.92, 1, 0.92], extrapolate: 'clamp' }) }] }]}>
                <Animated.Image source={{ uri: it.uri }} style={[s.img, { transform: [{ translateX: sx.interpolate({ inputRange: r, outputRange: [-40, 0, 40] }) }, { scale: 1.15 }] }]} />
                <View style={s.shade} />
                <View style={s.overlay}>
                  <Text style={s.badge}>{it.badge}</Text>
                  <Text style={s.titulo}>{it.nombre}</Text>
                </View>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
      <View style={s.dots}>
        {D.map((_, i) => {
          const r = [(i - 1) * W, i * W, (i + 1) * W];
          return <Animated.View key={i} style={[s.dot, {
            width: sx.interpolate({ inputRange: r, outputRange: [6, 22, 6], extrapolate: 'clamp' }),
            opacity: sx.interpolate({ inputRange: r, outputRange: [0.35, 1, 0.35], extrapolate: 'clamp' }),
          }]} />;
        })}
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  page: { width: W, paddingHorizontal: 16 },
  slide: { height: 200, borderRadius: 22, overflow: 'hidden', backgroundColor: '#000', ...shadow },
  img: { width: '100%', height: '100%' },
  shade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.38)' },
  overlay: { position: 'absolute', bottom: 18, left: 18 },
  badge: { backgroundColor: C.blue, color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 1, paddingHorizontal: 9, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start', overflow: 'hidden' },
  titulo: { color: '#fff', fontSize: 24, fontWeight: '800', marginTop: 6 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  dot: { height: 6, borderRadius: 3, backgroundColor: C.text, marginHorizontal: 3 },
});
