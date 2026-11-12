import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { C, shadow, precioNum } from '../theme';

export default function ProductCard({ item, index, oferta }) {
  const enter = useRef(new Animated.Value(0)).current;
  const press = useRef(new Animated.Value(1)).current;
  const heart = useRef(new Animated.Value(1)).current;
  const [fav, setFav] = useState(false);

  useEffect(() => {
    Animated.timing(enter, { toValue: 1, duration: 500, delay: index * 90, useNativeDriver: true }).start();
  }, []);

  const toScale = (v) => Animated.spring(press, { toValue: v, friction: 6, useNativeDriver: true }).start();
  const toggleFav = () => {
    setFav(!fav);
    Animated.sequence([
      Animated.spring(heart, { toValue: 1.5, friction: 3, useNativeDriver: true }),
      Animated.spring(heart, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
  };

  const pct = oferta ? Math.round((1 - precioNum(item.precioOferta) / precioNum(item.precioAntiguo)) * 100) : 0;

  return (
    <Animated.View style={{
      opacity: enter,
      transform: [{ translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }, { scale: press }],
    }}>
      <Pressable onPressIn={() => toScale(0.97)} onPressOut={() => toScale(1)} style={[s.card, oferta && s.cardOferta]}>
        <View>
          <Image source={{ uri: item.img }} style={s.img} />
          {oferta && <View style={s.pct}><Text style={s.pctTxt}>-{pct}%</Text></View>}
        </View>
        <View style={s.info}>
          <Text style={s.nombre} numberOfLines={1}>{item.nombre}</Text>
          <Text style={s.desc} numberOfLines={2}>{item.desc}</Text>
          <View style={s.fila}>
            {oferta ? (
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={s.viejo}>{item.precioAntiguo}</Text>
                <Text style={[s.precio, { color: C.red }]}>{item.precioOferta}</Text>
              </View>
            ) : <Text style={s.precio}>{item.precio}</Text>}
            <TouchableOpacity style={[s.btn, oferta && { backgroundColor: C.red }]} activeOpacity={0.8}>
              <Text style={s.btnTxt}>Comprar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={s.fav} onPress={toggleFav} hitSlop={10}>
          <Animated.Text style={{ fontSize: 16, transform: [{ scale: heart }] }}>{fav ? '❤️' : '🤍'}</Animated.Text>
        </TouchableOpacity>
      </Pressable>
    </Animated.View>
  );
}
const s = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: C.card, borderRadius: 20, padding: 12, marginBottom: 14, ...shadow },
  cardOferta: { borderWidth: 1, borderColor: '#FFD9DF' },
  img: { width: 92, height: 92, borderRadius: 14, backgroundColor: C.bg },
  pct: { position: 'absolute', top: -6, left: -6, backgroundColor: C.red, borderRadius: 10, paddingHorizontal: 7, paddingVertical: 3 },
  pctTxt: { color: '#fff', fontSize: 11, fontWeight: '800' },
  info: { flex: 1, marginLeft: 14, justifyContent: 'space-between' },
  nombre: { fontSize: 16, fontWeight: '700', color: C.text, paddingRight: 26 },
  desc: { fontSize: 12, color: C.sub, lineHeight: 16, marginVertical: 3 },
  fila: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  precio: { fontSize: 17, fontWeight: '800', color: C.text },
  viejo: { fontSize: 12, color: C.sub, textDecorationLine: 'line-through', marginRight: 6 },
  btn: { backgroundColor: C.blue, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 16 },
  btnTxt: { color: '#fff', fontSize: 12, fontWeight: '700' },
  fav: { position: 'absolute', top: 10, right: 12 },
});
