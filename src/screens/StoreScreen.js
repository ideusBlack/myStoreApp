import React, { useMemo, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import HeroCarousel from '../components/HeroCarousel';
import ProductCard from '../components/ProductCard';
import { colors } from '../theme';

const categories = ['Todos', 'iPhone', 'iPad', 'Mac', 'Audio', 'Watch', 'Accesorios'];

export default function StoreScreen({
  products,
  favorites,
  onToggleFavorite,
  onAdd,
  onProductPress,
  showHero = false,
  onOfferPress,
  title = 'Descubre nuestros productos',
  subtitle = 'Diseño, innovación y tecnología en un solo lugar.',
  emptyMessage = 'No encontramos productos con esa búsqueda. Prueba con otra palabra.',
}) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const scrollRef = useRef(null);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'Todos' || product.category === category;
      const matchesSearch =
        !normalizedSearch ||
        `${product.nombre} ${product.desc} ${product.category}`.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  return (
    <ScrollView ref={scrollRef} style={styles.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      {showHero && (
        <HeroCarousel
          onOfferPress={onOfferPress}
          onExplorePress={() => scrollRef.current?.scrollTo({ y: 260, animated: true })}
        />
      )}

      <View style={styles.headingBlock}>
        <View style={styles.headingCopy}>
          <Text style={styles.eyebrow}>{showHero ? 'SELECCIÓN ESPECIAL' : 'TU COLECCIÓN'}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.countPill}>
          <Text style={styles.countText}>{products.length} PRODUCTOS</Text>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar iPhone, Mac, accesorios..."
          placeholderTextColor={colors.subtle}
          style={styles.searchInput}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
        {categories.map((item) => {
          const selected = category === item;
          return (
            <TouchableOpacity
              key={item}
              onPress={() => setCategory(item)}
              activeOpacity={0.8}
              style={[styles.categoryChip, selected && styles.categoryChipActive]}
            >
              <Text style={[styles.categoryText, selected && styles.categoryTextActive]}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.productsHeader}>
        <Text style={styles.productsTitle}>{showHero ? 'Más populares' : 'Productos guardados'}</Text>
        <Text style={styles.results}>{filteredProducts.length} resultados</Text>
      </View>

      {filteredProducts.length > 0 ? (
        <View style={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              favorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onAdd={onAdd}
              onPress={() => onProductPress(product)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>⌕</Text>
          <Text style={styles.emptyTitle}>Sin resultados</Text>
          <Text style={styles.emptyText}>{products.length === 0 ? 'Aún no has guardado productos.' : emptyMessage}</Text>
        </View>
      )}

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>Catálogo demostrativo. Productos, imágenes y precios son referenciales.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  headingBlock: { paddingHorizontal: 20, marginBottom: 15, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  headingCopy: { flex: 1, paddingRight: 8 },
  eyebrow: { color: colors.blue, fontSize: 9, fontWeight: '900', letterSpacing: 1.5, marginBottom: 5 },
  title: { color: colors.ink, fontSize: 22, lineHeight: 27, fontWeight: '900', letterSpacing: -0.6 },
  subtitle: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 5 },
  countPill: { backgroundColor: colors.blueSoft, paddingHorizontal: 9, paddingVertical: 7, borderRadius: 10, marginBottom: 2 },
  countText: { color: colors.blue, fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  searchBox: {
    marginHorizontal: 20,
    height: 46,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
  },
  searchIcon: { color: colors.muted, fontSize: 23, lineHeight: 26, marginRight: 8 },
  searchInput: { flex: 1, color: colors.ink, fontSize: 11, paddingVertical: 0 },
  categoryList: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 20 },
  categoryChip: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: colors.white, borderRadius: 18, marginRight: 7, borderWidth: 1, borderColor: colors.line },
  categoryChipActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  categoryText: { color: colors.muted, fontSize: 10, fontWeight: '800' },
  categoryTextActive: { color: colors.white },
  productsHeader: { paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  productsTitle: { color: colors.ink, fontSize: 16, fontWeight: '900', letterSpacing: -0.3 },
  results: { color: colors.muted, fontSize: 10, fontWeight: '700' },
  grid: { paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  emptyState: { marginHorizontal: 20, backgroundColor: colors.white, borderRadius: 20, padding: 28, alignItems: 'center', borderWidth: 1, borderColor: colors.line },
  emptyIcon: { fontSize: 34, color: colors.blue },
  emptyTitle: { color: colors.ink, fontSize: 15, fontWeight: '900', marginTop: 8 },
  emptyText: { color: colors.muted, fontSize: 11, lineHeight: 17, textAlign: 'center', marginTop: 5 },
  disclaimer: { paddingHorizontal: 20, paddingTop: 5, paddingBottom: 22 },
  disclaimerText: { color: colors.subtle, fontSize: 9, textAlign: 'center', lineHeight: 14 },
});
