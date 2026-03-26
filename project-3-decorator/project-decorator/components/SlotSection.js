import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import THEME from '../config/theme';
import MaterialCard from './MaterialCard';
import MatModule from '../bridge/Materiales';

const MATERIALES = MatModule.MATERIALES;

export default function SlotSection({ slot, selectedMaterialNombre, monedasRestantes, costoActual, onSelect }) {
  const [expanded, setExpanded] = useState(false);

  const selected = MATERIALES.find(m => m.nombre === selectedMaterialNombre);

  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={[styles.header, selected && styles.headerSelected]}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.8}
      >
        <Image source={slot.icono} style={{ width: 28, height: 28, resizeMode: 'contain' }} />
        <View style={styles.headerInfo}>
          <Text style={styles.slotLabel}>{slot.label}</Text>
          {selected ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <Image source={selected.icono} style={{ width: 14, height: 14, marginRight: 4 }} />
              <Text style={styles.selectedName}>{selected.nombre}</Text>
            </View>
          ) : (
            <Text style={styles.emptyHint}>Toca para equipar</Text>
          )}
        </View>
        {selected && (
          <View style={styles.defBadge}>
            <Text style={styles.defBadgeText}>+{selected.getDefensa()}🛡️</Text>
          </View>
        )}
        <Text style={[styles.arrow, { color: THEME.primary }]}>
          {expanded ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.list}>
          {MATERIALES.map((mat) => {
            const esSeleccionado = selectedMaterialNombre === mat.nombre;
            const canAfford = esSeleccionado || monedasRestantes >= mat.getCosto();
            return (
              <MaterialCard
                key={mat.nombre}
                material={mat}
                isSelected={esSeleccionado}
                canAfford={canAfford}
                onPress={() => {
                  onSelect(slot.id, esSeleccionado ? null : mat.nombre);
                  setExpanded(false);
                }}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 8 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: THEME.bgCard, borderRadius: 10,
    borderWidth: 1, borderColor: THEME.border,
    padding: 14, gap: 10,
  },
  headerSelected: {
    borderColor: THEME.primaryDark,
    backgroundColor: THEME.bgSection,
  },
  
  headerInfo: { flex: 1 },
  slotLabel:    { color: THEME.text,         fontWeight: '700', fontSize: 14 },
  selectedName: { color: THEME.primaryLight, fontSize: 12, marginTop: 2 },
  emptyHint:    { color: THEME.textMuted,    fontSize: 12, marginTop: 2 },
  defBadge: {
    backgroundColor: THEME.bgSection, borderRadius: 8,
    borderWidth: 1, borderColor: THEME.statDefense,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  defBadgeText: { color: THEME.statDefense, fontWeight: '800', fontSize: 12 },
  arrow: { fontSize: 12, fontWeight: '700' },
  list:  { paddingTop: 4, paddingHorizontal: 2 },
});