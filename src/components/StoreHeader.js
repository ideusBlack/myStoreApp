import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme';

export default function StoreHeader({ cartCount, onCartPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.brandBlock}>
        <View style={styles.logoMark}>
          <Text style={styles.logoMarkText}>A</Text>
        </View>
        <View>
          <Text style={styles.brand}>Apple Store</Text>
          <Text style={styles.subtitle}>TECNOLOGÍA PARA TU DÍA</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.cartButton} onPress={onCartPress} activeOpacity={0.8}>
        <Text style={styles.cartIcon}>▢</Text>
        <Text style={styles.cartLabel}>Bolsa</Text>
        <View style={styles.counter}>
          <Text style={styles.counterText}>{cartCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 68,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
  },
  brandBlock: { flexDirection: 'row', alignItems: 'center' },
  logoMark: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoMarkText: { color: colors.white, fontSize: 19, fontWeight: '900' },
  brand: { color: colors.ink, fontSize: 17, fontWeight: '900', letterSpacing: -0.4 },
  subtitle: { color: colors.muted, fontSize: 8, fontWeight: '800', letterSpacing: 1.4, marginTop: 2 },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  cartIcon: { color: colors.ink, fontSize: 16, marginRight: 6, fontWeight: '800' },
  cartLabel: { color: colors.ink, fontSize: 11, fontWeight: '800' },
  counter: {
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
    paddingHorizontal: 4,
  },
  counterText: { color: colors.white, fontSize: 10, fontWeight: '900' },
});
