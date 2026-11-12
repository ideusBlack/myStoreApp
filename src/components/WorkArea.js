import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProductCard from './ProductCard';
import { C } from '../theme';

export const productosApple = [
  { id: '1', nombre: 'iPhone 18 Pro Max', desc: 'Pantalla ProMotion de 6.9", chip A19 Pro y cámara de 48 MP.', precio: '$1,199', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300' },
  { id: '2', nombre: 'iPad M5 Pro', desc: 'Procesador M5 con pantalla OLED Ultra Retina XDR.', precio: '$999', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300' },
  { id: '3', nombre: 'Apple Watch Series 10', desc: 'Diseño ultra delgado con ECG y medición de presión.', precio: '$399', img: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300' },
  { id: '4', nombre: 'MacBook Pro M4', desc: 'Rendimiento extremo con hasta 24 horas de batería.', precio: '$1,599', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300' },
  { id: '5', nombre: 'AirPods Max 2', desc: 'Cancelación activa de ruido mejorada y audio espacial.', precio: '$549', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300' },
  { id: '6', nombre: 'Mac mini M4', desc: 'Computadora de escritorio compacta con arquitectura M4.', precio: '$599', img: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=300' },
  { id: '7', nombre: 'Apple Vision Pro 2', desc: 'Computación espacial con resolución micro-OLED 4K.', precio: '$3,499', img: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=300' },
  { id: '8', nombre: 'Studio Display', desc: 'Pantalla Retina 5K de 27 pulgadas con cámara de 12 MP.', precio: '$1,599', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300' },
  { id: '9', nombre: 'HomePod 2', desc: 'Sonido de alta fidelidad con Siri integrado.', precio: '$299', img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300' },
  { id: '10', nombre: 'AirTag (Pack de 4)', desc: 'Rastreo preciso de pertenencias con la red Find My.', precio: '$99', img: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=300' },
];

export default function WorkArea() {
  return (
    <View style={s.wrap}>
      <Text style={s.titulo}>Catálogo Principal</Text>
      <Text style={s.sub}>Lo último en tecnología Apple</Text>
      {productosApple.map((p, i) => <ProductCard key={p.id} item={p} index={i} />)}
    </View>
  );
}
const s = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingTop: 22 },
  titulo: { fontSize: 26, fontWeight: '800', color: C.text, letterSpacing: -0.5 },
  sub: { fontSize: 13, color: C.sub, marginBottom: 16, marginTop: 2 },
});
