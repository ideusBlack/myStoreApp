import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme';

const tabs = [
  { label: 'Inicio', icon: '⌂' },
  { label: 'Ofertas', icon: '✦' },
  { label: 'Favoritos', icon: '♡' },
];

export default function BottomNav({ activeTab, onChange }) {
  return (
    <View style={styles.bar}>
      {tabs.map((tab) => {
        const active = activeTab === tab.label;
        return (
          <TouchableOpacity
            key={tab.label}
            style={styles.tab}
            activeOpacity={0.75}
            onPress={() => onChange(tab.label)}
          >
            <Text style={[styles.icon, active && styles.activeIcon]}>{tab.icon}</Text>
            <Text style={[styles.label, active && styles.activeLabel]}>{tab.label}</Text>
            {active && <View style={styles.activeDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 9,
    paddingBottom: 5,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 48 },
  icon: { color: colors.subtle, fontSize: 21, lineHeight: 24 },
  activeIcon: { color: colors.blue },
  label: { color: colors.muted, fontSize: 10, fontWeight: '700', marginTop: 2 },
  activeLabel: { color: colors.blue },
  activeDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.blue, marginTop: 3 },
});
