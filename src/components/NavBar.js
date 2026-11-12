import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { C } from '../theme';

const TABS = [{ k: 'Inicio', t: '🏠  Inicio' }, { k: 'Ofertas', t: '🔥  Ofertas Fin de Año' }];

export default function NavBar({ vistaActual, setVistaActual }) {
  const x = useRef(new Animated.Value(0)).current;
  const [w, setW] = useState(0);
  const tabW = (w - 8) / TABS.length;

  const ir = (k, i) => {
    setVistaActual(k);
    Animated.spring(x, { toValue: i * tabW, friction: 8, tension: 90, useNativeDriver: true }).start();
  };

  return (
    <View style={s.wrap}>
      <View style={s.pill} onLayout={(e) => setW(e.nativeEvent.layout.width)}>
        {w > 0 && <Animated.View style={[s.indicador, { width: tabW, transform: [{ translateX: x }] }]} />}
        {TABS.map((tab, i) => (
          <TouchableOpacity key={tab.k} style={s.btn} activeOpacity={0.7} onPress={() => ir(tab.k, i)}>
            <Text style={[s.txt, vistaActual === tab.k && s.txtOn]}>{tab.t}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  wrap: { backgroundColor: C.dark, paddingHorizontal: 16, paddingBottom: 12 },
  pill: { flexDirection: 'row', backgroundColor: '#1C1C1E', borderRadius: 24, padding: 4 },
  indicador: { position: 'absolute', top: 4, left: 4, bottom: 4, backgroundColor: '#3A3A3C', borderRadius: 20 },
  btn: { flex: 1, paddingVertical: 9, alignItems: 'center' },
  txt: { color: '#8E8E93', fontSize: 13, fontWeight: '600' },
  txtOn: { color: '#fff' },
});
