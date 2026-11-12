import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, shadows } from '../theme';

function OfferCard({ offer, onAdd, onProductPress, index }) {
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(entrance, {
      toValue: 1,
      duration: 420,
      delay: index * 90,
      useNativeDriver: true,
    }).start();
  }, [entrance, index]);

  return (
    <Animated.View
      style={[
        styles.offerCard,
        {
          opacity: entrance,
          transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }],
        },
      ]}
    >
      <TouchableOpacity style={styles.offerMain} activeOpacity={0.9} onPress={() => onProductPress(offer)}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: offer.img }} style={styles.image} resizeMode="cover" />
          <View style={styles.discountTag}><Text style={styles.discountText}>PRECIO ESPECIAL</Text></View>
        </View>
        <View style={styles.details}>
          <Text style={styles.category}>{offer.category?.toUpperCase()}</Text>
          <Text style={styles.name}>{offer.nombre}</Text>
          <Text style={styles.description} numberOfLines={2}>{offer.desc}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.oldPrice}>{offer.precioAntiguo}</Text>
            <Text style={styles.newPrice}>{offer.precioOferta}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => onAdd(offer)} activeOpacity={0.85}>
        <Text style={styles.addButtonText}>Añadir a mi bolsa</Text>
        <Text style={styles.addArrow}>›</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function OffersScreen({ offers, onAdd, onProductPress }) {
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.heroBadge}><Text style={styles.heroBadgeText}>EDICIÓN ESPECIAL</Text></View>
        <Text style={styles.heroTitle}>Ofertas que te van a encantar.</Text>
        <Text style={styles.heroSubtitle}>Una selección de productos con precios demostrativos especiales.</Text>
        <View style={styles.heroDecoration}><Text style={styles.heroStar}>✦</Text></View>
      </View>

      <View style={styles.sectionHeading}>
        <View>
          <Text style={styles.eyebrow}>OPORTUNIDADES SELECCIONADAS</Text>
          <Text style={styles.sectionTitle}>Ofertas destacadas</Text>
        </View>
        <View style={styles.countPill}><Text style={styles.countText}>{offers.length} OFERTAS</Text></View>
      </View>

      <View style={styles.list}>
        {offers.map((offer, index) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            index={index}
            onAdd={onAdd}
            onProductPress={onProductPress}
          />
        ))}
      </View>

      <Text style={styles.disclaimer}>Los descuentos y precios se muestran como ejemplo para esta tienda demostrativa.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  hero: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 24,
    padding: 22,
    minHeight: 174,
    borderRadius: 24,
    backgroundColor: '#17243B',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  heroBadge: { alignSelf: 'flex-start', borderRadius: 7, backgroundColor: 'rgba(255,255,255,0.14)', paddingHorizontal: 9, paddingVertical: 5 },
  heroBadgeText: { color: '#C7D8FF', fontSize: 8, fontWeight: '900', letterSpacing: 1.3 },
  heroTitle: { color: colors.white, fontSize: 25, lineHeight: 30, fontWeight: '900', maxWidth: 260, marginTop: 13, letterSpacing: -0.6 },
  heroSubtitle: { color: 'rgba(255,255,255,0.72)', fontSize: 10, lineHeight: 15, maxWidth: 240, marginTop: 7 },
  heroDecoration: { position: 'absolute', right: -14, bottom: -31, width: 130, height: 130, borderRadius: 65, borderWidth: 1, borderColor: 'rgba(255,255,255,0.13)', alignItems: 'center', justifyContent: 'center' },
  heroStar: { color: 'rgba(255,255,255,0.14)', fontSize: 100 },
  sectionHeading: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 },
  eyebrow: { color: colors.blue, fontSize: 8, fontWeight: '900', letterSpacing: 1.3 },
  sectionTitle: { color: colors.ink, fontSize: 21, fontWeight: '900', marginTop: 5, letterSpacing: -0.5 },
  countPill: { backgroundColor: colors.blueSoft, paddingHorizontal: 9, paddingVertical: 7, borderRadius: 9, marginBottom: 2 },
  countText: { color: colors.blue, fontSize: 8, fontWeight: '900' },
  list: { paddingHorizontal: 20 },
  offerCard: { backgroundColor: colors.white, borderRadius: 20, padding: 11, marginBottom: 13, borderWidth: 1, borderColor: colors.line, ...shadows.card },
  offerMain: { flexDirection: 'row' },
  imageWrap: { width: 112, height: 118, borderRadius: 14, backgroundColor: colors.soft, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  discountTag: { position: 'absolute', left: 5, right: 5, bottom: 5, backgroundColor: 'rgba(20,25,35,0.82)', borderRadius: 6, paddingVertical: 4, alignItems: 'center' },
  discountText: { color: colors.white, fontSize: 7, fontWeight: '900', letterSpacing: 0.4 },
  details: { flex: 1, paddingLeft: 12, justifyContent: 'center' },
  category: { color: colors.blue, fontSize: 8, fontWeight: '900', letterSpacing: 1.1 },
  name: { color: colors.ink, fontSize: 14, fontWeight: '900', lineHeight: 18, marginTop: 5 },
  description: { color: colors.muted, fontSize: 9, lineHeight: 13, marginTop: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 9 },
  oldPrice: { color: colors.subtle, fontSize: 10, textDecorationLine: 'line-through', marginRight: 8 },
  newPrice: { color: colors.green, fontSize: 17, fontWeight: '900' },
  addButton: { marginTop: 10, backgroundColor: colors.blueSoft, borderRadius: 11, paddingVertical: 10, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: colors.blue, fontSize: 10, fontWeight: '900' },
  addArrow: { color: colors.blue, fontSize: 18, lineHeight: 18, marginLeft: 6 },
  disclaimer: { color: colors.subtle, fontSize: 9, lineHeight: 14, textAlign: 'center', paddingHorizontal: 24, paddingTop: 4, paddingBottom: 24 },
});
