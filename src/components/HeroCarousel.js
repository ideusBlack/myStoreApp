import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../theme';

const screenWidth = Dimensions.get('window').width;
const slideWidth = screenWidth - 40;

const slides = [
  {
    id: 'hero1',
    eyebrow: 'DISEÑADO PARA INSPIRAR',
    title: 'La tecnología\nque va contigo.',
    subtitle: 'Descubre productos que conectan con tu día a día.',
    action: 'Explorar colección',
    image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=1200',
  },
  {
    id: 'hero2',
    eyebrow: 'RENUEVA TU EXPERIENCIA',
    title: 'Pequeños detalles.\nGrandes ideas.',
    subtitle: 'Encuentra tu próximo favorito en nuestra selección.',
    action: 'Ver destacados',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200',
  },
  {
    id: 'hero3',
    eyebrow: 'TEMPORADA ESPECIAL',
    title: 'Ofertas para\nllevar más lejos.',
    subtitle: 'Explora oportunidades en productos seleccionados.',
    action: 'Ver ofertas',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200',
  },
];

export default function HeroCarousel({ onOfferPress, onExplorePress }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  return (
    <Animated.View style={[styles.wrapper, { opacity: fade, transform: [{ translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        snapToInterval={slideWidth + 12}
        decelerationRate="fast"
        contentContainerStyle={styles.track}
        onMomentumScrollEnd={(event) => {
          const next = Math.round(event.nativeEvent.contentOffset.x / (slideWidth + 12));
          setActiveIndex(Math.max(0, Math.min(slides.length - 1, next)));
        }}
      >
        {slides.map((slide, index) => (
          <ImageBackground
            key={slide.id}
            source={{ uri: slide.image }}
            style={styles.slide}
            imageStyle={styles.image}
            resizeMode="cover"
          >
            <View style={styles.scrim} />
            <View style={styles.copy}>
              <Text style={styles.eyebrow}>{slide.eyebrow}</Text>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.subtitle}>{slide.subtitle}</Text>
              <TouchableOpacity
                style={styles.action}
                activeOpacity={0.85}
                onPress={index === 2 ? onOfferPress : onExplorePress}
              >
                <Text style={styles.actionText}>{slide.action}</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.slideNumber}>
              <Text style={styles.slideNumberText}>0{index + 1} / 0{slides.length}</Text>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={styles.dots}>
        {slides.map((slide, index) => (
          <View key={slide.id} style={[styles.dot, activeIndex === index && styles.activeDot]} />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: 8, marginBottom: 24 },
  track: { paddingHorizontal: 20 },
  slide: {
    width: slideWidth,
    height: 218,
    marginRight: 12,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: colors.dark,
  },
  image: { borderRadius: 24 },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(8, 13, 22, 0.56)' },
  copy: { paddingHorizontal: 22, paddingVertical: 20, maxWidth: 310 },
  eyebrow: { color: '#BFD3FF', fontSize: 9, fontWeight: '900', letterSpacing: 1.6, marginBottom: 10 },
  title: { color: colors.white, fontSize: 27, lineHeight: 31, fontWeight: '900', letterSpacing: -0.7 },
  subtitle: { color: 'rgba(255,255,255,0.82)', fontSize: 11, lineHeight: 16, marginTop: 8, maxWidth: 235 },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 13,
    marginTop: 14,
  },
  actionText: { color: colors.ink, fontSize: 10, fontWeight: '900' },
  arrow: { color: colors.ink, fontSize: 17, lineHeight: 17, marginLeft: 7 },
  slideNumber: { position: 'absolute', right: 16, top: 16 },
  slideNumberText: { color: 'rgba(255,255,255,0.78)', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#CCD2DC', marginHorizontal: 3 },
  activeDot: { width: 19, backgroundColor: colors.blue },
});
