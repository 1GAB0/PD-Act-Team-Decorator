import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import THEME from '../config/theme';

export default function MaterialCard({ material, isSelected, canAfford, onPress }) {
  const disabled = !canAfford && !isSelected;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected  && styles.cardSelected,
        disabled    && styles.cardDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
    >
      {/* Radio + nombre */}
      <View style={styles.topRow}>
        <View style={[
          styles.radio,
          isSelected && styles.radioSelected,
          disabled   && styles.radioDisabled,
        ]}>
          {isSelected && <View style={styles.radioDot} />}
        </View>

        <Image source={material.icono} style={[{ width: 30, height: 30, resizeMode: 'contain' }, disabled && styles.faded]} />

        <View style={styles.nameBlock}>
          <Text style={[styles.name, disabled && styles.fadedText]}>
            {material.nombre}
          </Text>
          <View style={[styles.rarityBadge, { borderColor: THEME.rarity[material.rareza] }]}>
            <Text style={[styles.rarityText, { color: THEME.rarity[material.rareza] }]}>
              {material.rareza}
            </Text>
          </View>
        </View>

        {/* Costo */}
        <View style={[styles.costBadge, disabled && styles.costBadgeDisabled]}>
          <Text style={[styles.costText, disabled && { color: THEME.disabledText }]}>
            💰 {material.getCosto()}
          </Text>
          {disabled && <Text style={styles.noMoneyText}>Sin fondos</Text>}
        </View>
      </View>

      <Text style={[styles.desc, disabled && styles.fadedText]}>
        {material.getDescripcion()}
      </Text>

      <View style={styles.statsRow}>
        <StatChip icon="🛡️" label="Defensa"     val={material.getDefensa()}     color={THEME.statDefense} disabled={disabled}/>
        <StatChip icon="⚒️" label="Durabilidad" val={material.getDurabilidad()} color={THEME.statDur}     disabled={disabled}/>
      </View>
    </TouchableOpacity>
  );
}

const StatChip = ({ icon, label, val, color, disabled }) => (
  <View style={[styles.chip, disabled && styles.chipDisabled]}>
    <Text style={styles.chipIcon}>{icon}</Text>
    <Text style={[styles.chipLabel, disabled && styles.fadedText]}>{label}</Text>
    <Text style={[styles.chipVal, { color: disabled ? THEME.disabledText : color }]}>{val}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.bgCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.border,
    padding: 12,
    marginBottom: 8,
  },
  cardSelected: {
    borderColor: THEME.primary,
    backgroundColor: THEME.selected,
  },
  cardDisabled: {
    backgroundColor: THEME.disabled,
    borderColor: '#1A1A1A',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  radio: {
    width: 18, height: 18, borderRadius: 9,
    borderWidth: 2, borderColor: THEME.primaryDark,
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelected: { borderColor: THEME.primary, backgroundColor: THEME.primary },
  radioDisabled: { borderColor: '#2A2A2A' },
  radioDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#000' },
  
  faded: { opacity: 0.3 },
  nameBlock: { flex: 1, gap: 3 },
  name: { color: THEME.text, fontWeight: '700', fontSize: 13 },
  fadedText: { color: THEME.disabledText },
  rarityBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1, borderRadius: 4,
    paddingHorizontal: 6, paddingVertical: 1,
  },
  rarityText: { fontSize: 10, fontWeight: '700' },
  costBadge: {
    backgroundColor: THEME.bgSection,
    borderRadius: 8, padding: 6,
    alignItems: 'center',
    borderWidth: 1, borderColor: THEME.primaryDark,
  },
  costBadgeDisabled: { borderColor: '#1A1A1A' },
  costText: { color: THEME.gold, fontWeight: '800', fontSize: 12 },
  noMoneyText: { color: THEME.red, fontSize: 9, fontWeight: '700', marginTop: 2 },
  desc: { color: THEME.textMuted, fontSize: 11, lineHeight: 15, marginBottom: 8, marginLeft: 26 },
  statsRow: { flexDirection: 'row', gap: 6, marginLeft: 26 },
  chip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: THEME.bgSection,
    borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3, gap: 4,
  },
  chipDisabled: { backgroundColor: '#111' },
  chipIcon:  { fontSize: 11 },
  chipLabel: { color: THEME.textMuted, fontSize: 11 },
  chipVal:   { fontWeight: '700', fontSize: 11 },
});