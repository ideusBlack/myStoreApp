import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductCard from '../components/ProductCard';
import { C } from '../theme';

const productosOferta = [
  { id: 'o1', nombre: 'iPhone 13 (128GB)', desc: 'Chip A15 Bionic. Excelente batería y pantalla Super Retina XDR.', precioAntiguo: '$699', precioOferta: '$399', img: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=300' },
  { id: 'o2', nombre: 'iPad Air 5ª Gen (M1)', desc: 'Potencia del chip M1 con soporte para Apple Pencil 2.', precioAntiguo: '$599', precioOferta: '$349', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300' },
  { id: 'o3', nombre: 'Apple Watch Series 7', desc: 'Pantalla Always-On rediseñada y carga rápida.', precioAntiguo: '$399', precioOferta: '$199', img: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300' },
  { id: 'o4', nombre: 'MacBook Air M1', desc: 'La laptop más ligera con arquitectura Apple Silicon.', precioAntiguo: '$999', precioOferta: '$599', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300' },
];

const FIN = new Date('2026-12-31T23:59:59').getTime();
const calc = () => {
  const d = Math.max(0, FIN - Date.now());
  return { d: Math.floor(d / 864e5), h: Math.floor(d / 36e5) % 24, m: Math.floor(d / 6e4) % 60, s: Math.floor(d / 1e3) % 60 };
};
const Box = ({ v, l }) => (
  <View style={s.box}><Text style={s.num}>{String(v).padStart(2, '0')}</Text><Text style={s.lbl}>{l}</Text></View>
);

export default function OfertasScreen({ volverInicio }) {
  const [t, setT] = useState(calc());
  useEffect(() => { const i = setInterval(() => setT(calc()), 1000); return () => clearInterval(i); }, []);

  return (
    <View style={s.wrap}>
      <View style={s.hero}>
        <Text style={s.titulo}>🎄 Ofertas de Fin de Año</Text>
        <Text style={s.sub}>Generaciones anteriores con descuentazo</Text>
        <View style={s.timer}>
          <Box v={t.d} l="DÍAS" /><Box v={t.h} l="HORAS" /><Box v={t.m} l="MIN" /><Box v={t.s} l="SEG" />
        </View>
      </View>
      <TouchableOpacity style={s.volver} onPress={volverInicio}><Text style={s.volverTxt}>← Volver a Inicio</Text></TouchableOpacity>
      {productosOferta.map((p, i) => <ProductCard key={p.id} item={p} index={i} oferta />)}
    </View>
  );
}
const s = StyleSheet.create({
  wrap: { padding: 16 },
  hero: { backgroundColor: C.red, borderRadius: 22, padding: 18, marginBottom: 12 },
  titulo: { color: '#fff', fontSize: 22, fontWeight: '800', textAlign: 'center' },
  sub: { color: '#FFD0D8', fontSize: 12, textAlign: 'center', marginTop: 3 },
  timer: { flexDirection: 'row', justifyContent: 'center', marginTop: 14 },
  box: { backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 12, paddingVertical: 8, width: 58, alignItems: 'center', marginHorizontal: 4 },
  num: { color: '#fff', fontSize: 22, fontWeight: '800' },
  lbl: { color: '#FFD0D8', fontSize: 8, fontWeight: '700', letterSpacing: 1 },
  volver: { paddingVertical: 8, marginBottom: 8 },
  volverTxt: { color: C.blue, fontWeight: '700', fontSize: 14 },
});
