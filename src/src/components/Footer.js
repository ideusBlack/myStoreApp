import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Footer() {
  return (
    <View style={s.footer}>
      <Text style={s.logo}></Text>
      <Text style={s.txt}>Apple Inc. © 2026 — Todos los derechos reservados</Text>
    </View>
  );
}
const s = StyleSheet.create({
  footer: { backgroundColor: '#000', paddingVertical: 22, alignItems: 'center', marginTop: 10 },
  logo: { color: '#fff', fontSize: 22, marginBottom: 4 },
  txt: { color: '#8E8E93', fontSize: 10 },
});
