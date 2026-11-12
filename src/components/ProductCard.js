import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, shadows } from '../theme';

export default function ProductCard({
  product,
  favorite,
  onToggleFavorite,
  onAdd,
  onPress,
}) {
  const entrance = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(entrance, {
      toValue: 1,
      friction: 8,
      tension: 55,
      useNativeDriver: true,
    }).start();
  }, [entrance]);

  const pressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 30 }).start();
  };
  const pressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 25 }).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: entrance,
          transform: [
            { translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) },
            { scale },
          ],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
      >
        <View style={styles.imageWrap}>
          <Image source={{ uri: product.img }} style={styles.image} resizeMode="cover" />
          {product.tag ? (
            <View style={styles.tag}><Text style={styles.tagText}>{product.tag}</Text></View>
          ) : null}
        </View>
        <View style={styles.details}>
          <Text style={styles.category}>{product.category?.toUpperCase()}</Text>
          <Text style={styles.name} numberOfLines={2}>{product.nombre}</Text>
          <Text style={styles.description} numberOfLines={2}>{product.desc}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.price}>{product.precio}</Text>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: colors.ink }]}
              onPress={() => onAdd(product)}
              activeOpacity={0.8}
              accessibilityLabel={`Añadir ${product.nombre} a la bolsa`}
            >
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => onToggleFavorite(product)}
        activeOpacity={0.8}
        accessibilityLabel={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        <Text style={[styles.heart, favorite && styles.heartActive]}>{favorite ? '♥' : '♡'}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48.3%',
    backgroundColor: colors.white,
    borderRadius: 19,
    marginBottom: 13,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EDF0F4',
    ...shadows.card,
  },
  imageWrap: { height: 132, backgroundColor: '#F0F2F5', overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  tag: {
    position: 'absolute',
    left: 9,
    top: 9,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  tagText: { color: colors.blue, fontSize: 8, fontWeight: '900', letterSpacing: 0.6 },
  details: { paddingHorizontal: 11, paddingTop: 11, paddingBottom: 12 },
  category: { color: colors.blue, fontSize: 8, fontWeight: '900', letterSpacing: 1.2 },
  name: { color: colors.ink, fontSize: 13, lineHeight: 17, fontWeight: '800', marginTop: 5, minHeight: 34 },
  description: { color: colors.muted, fontSize: 9, lineHeight: 13, marginTop: 4, minHeight: 26 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 11 },
  price: { color: colors.ink, fontSize: 14, fontWeight: '900' },
  addButton: { width: 29, height: 29, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  addText: { color: colors.white, fontSize: 21, lineHeight: 23, fontWeight: '500' },
  favoriteButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.94)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: { color: '#727B88', fontSize: 18, lineHeight: 21 },
  heartActive: { color: colors.red },
});
