import React, { useMemo, useState } from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import StoreHeader from './src/components/StoreHeader';
import BottomNav from './src/components/BottomNav';
import StoreScreen from './src/screens/StoreScreen';
import OffersScreen from './src/screens/OffersScreen';
import { products, offers } from './src/data/products';
import { colors } from './src/theme';

export default function App() {
  const [activeTab, setActiveTab] = useState('Inicio');
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState('');

  const favoriteProducts = useMemo(
    () => products.filter((product) => favorites.includes(product.id)),
    [favorites],
  );

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2200);
  };

  const toggleFavorite = (product) => {
    const alreadySaved = favorites.includes(product.id);
    setFavorites((current) =>
      alreadySaved
        ? current.filter((id) => id !== product.id)
        : [...current, product.id],
    );
    showToast(alreadySaved ? 'Eliminado de favoritos' : 'Añadido a favoritos');
  };

  const addToCart = (product) => {
    setCartCount((current) => current + 1);
    showToast(`${product.nombre} añadido a tu bolsa`);
  };

  const openCart = () => {
    showToast(
      cartCount === 0
        ? 'Tu bolsa está vacía por ahora'
        : `Tu bolsa tiene ${cartCount} ${cartCount === 1 ? 'producto' : 'productos'} · Compra demostrativa`,
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <StoreHeader cartCount={cartCount} onCartPress={openCart} />

        <View style={styles.content}>
          {activeTab === 'Inicio' && (
            <StoreScreen
              products={products}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onAdd={addToCart}
              onProductPress={setSelectedProduct}
              showHero
              onOfferPress={() => setActiveTab('Ofertas')}
            />
          )}

          {activeTab === 'Ofertas' && (
            <OffersScreen offers={offers} onAdd={addToCart} onProductPress={setSelectedProduct} />
          )}

          {activeTab === 'Favoritos' && (
            <StoreScreen
              products={favoriteProducts}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onAdd={addToCart}
              onProductPress={setSelectedProduct}
              title="Tus favoritos"
              subtitle="Los productos que guardaste para después."
              emptyMessage="Todavía no tienes favoritos. Guarda los productos que más te gusten."
            />
          )}
        </View>

        <BottomNav activeTab={activeTab} onChange={setActiveTab} />

        <Modal
          visible={Boolean(selectedProduct)}
          transparent
          animationType="slide"
          onRequestClose={() => setSelectedProduct(null)}
        >
          {selectedProduct && (
            <View style={styles.modalBackdrop}>
              <View style={styles.modalCard}>
                <TouchableOpacity
                  style={styles.modalClose}
                  onPress={() => setSelectedProduct(null)}
                  accessibilityLabel="Cerrar detalles"
                >
                  <Text style={styles.modalCloseText}>×</Text>
                </TouchableOpacity>
                <Text style={styles.modalEyebrow}>DETALLES DEL PRODUCTO</Text>
                <Text style={styles.modalTitle}>{selectedProduct.nombre}</Text>
                <Text style={styles.modalDescription}>{selectedProduct.desc}</Text>
                <Text style={styles.modalPrice}>
                  {selectedProduct.precioOferta || selectedProduct.precio}
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  activeOpacity={0.85}
                  onPress={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  <Text style={styles.modalButtonText}>Añadir a mi bolsa</Text>
                </TouchableOpacity>
                <Text style={styles.modalNote}>Catálogo y precios de demostración.</Text>
              </View>
            </View>
          )}
        </Modal>

        {Boolean(toast) && (
          <View pointerEvents="none" style={styles.toast}>
            <Text style={styles.toastText}>{toast}</Text>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1 },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(13, 18, 28, 0.48)',
  },
  modalCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 34,
  },
  modalClose: {
    position: 'absolute',
    right: 18,
    top: 14,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.soft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: { color: colors.ink, fontSize: 25, lineHeight: 28 },
  modalEyebrow: {
    color: colors.blue,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 14,
  },
  modalTitle: { color: colors.ink, fontSize: 25, fontWeight: '800', marginTop: 8 },
  modalDescription: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 10 },
  modalPrice: { color: colors.ink, fontSize: 24, fontWeight: '800', marginTop: 18 },
  modalButton: {
    backgroundColor: colors.ink,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  modalButtonText: { color: colors.white, fontWeight: '800', fontSize: 14 },
  modalNote: { color: colors.muted, fontSize: 10, textAlign: 'center', marginTop: 12 },
  toast: {
    position: 'absolute',
    bottom: 88,
    alignSelf: 'center',
    backgroundColor: colors.ink,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
    maxWidth: '88%',
  },
  toastText: { color: colors.white, fontSize: 12, fontWeight: '700', textAlign: 'center' },
});
