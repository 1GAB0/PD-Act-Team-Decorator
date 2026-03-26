import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import THEME from '../config/theme';

const MAX_DEF_PIEZA   = 18;
const MAX_DMG_ARMA    = 15;
const MAX_DUR_PIEZA   = 1561;
const MAX_COSTO_PIEZA = 150;

const EMOJI_SLOT = { Casco: '⛑️', Pecho: '🦺', Botas: '👢' };
const EMOJI_ARMA = { Espada: '🗡️', Arco: '🏹', Hacha: '🪓' };

const COLOR_MAT = {
  Madera:   '#8B7355',
  Hierro:   '#A8A8A8',
  Diamante: '#44C8D8',
};

function ProgressBar({ value, max, color }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
    </View>
  );
}

function StatRow({ label, value, max, color, suffix = '' }) {
  return (
    <View style={styles.statRow}>
      <View style={styles.labelRow}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={[styles.statValue, { color }]}>{value}{suffix}</Text>
      </View>
      <ProgressBar value={value} max={max} color={color} />
    </View>
  );
}

function PiezaCard({ pieza }) {
  const color = COLOR_MAT[pieza.material] || THEME.primary;
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardEmoji}>{EMOJI_SLOT[pieza.tipo]} {pieza.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{pieza.tipo}</Text>
          <Text style={[styles.cardSub, { color }]}>{pieza.material}</Text>
        </View>
        <View style={[styles.rarityBadge, { borderColor: pieza.rarityColor }]}>
          <Text style={[styles.rarityText, { color: pieza.rarityColor }]}>{pieza.rareza}</Text>
        </View>
      </View>
      <StatRow label="Defensa"     value={pieza.defensa}     max={MAX_DEF_PIEZA}   color={THEME.statDefense} />
      <StatRow label="Durabilidad" value={pieza.durabilidad} max={MAX_DUR_PIEZA}   color={color} suffix=" pts" />
      <StatRow label="Costo"       value={pieza.costo}       max={MAX_COSTO_PIEZA} color={THEME.gold} suffix=" 🪙" />
    </View>
  );
}

function ArmaCard({ arma }) {
  const color = COLOR_MAT[arma.material] || THEME.red;
  return (
    <View style={[styles.card, { borderLeftColor: THEME.red }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardEmoji}>{EMOJI_ARMA[arma.tipo] || '⚔️'} {arma.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{arma.tipo}</Text>
          <Text style={[styles.cardSub, { color }]}>{arma.material}</Text>
        </View>
        <View style={[styles.rarityBadge, { borderColor: arma.rarityColor }]}>
          <Text style={[styles.rarityText, { color: arma.rarityColor }]}>{arma.rareza}</Text>
        </View>
      </View>
      <StatRow label="Daño"        value={arma.danio}       max={MAX_DMG_ARMA}    color={THEME.red} />
      <StatRow label="Durabilidad" value={arma.durabilidad} max={MAX_DUR_PIEZA}   color={color} suffix=" pts" />
      <StatRow label="Costo"       value={arma.costo}       max={MAX_COSTO_PIEZA} color={THEME.gold} suffix=" 🪙" />
    </View>
  );
}

function TotalRow({ label, value, max, color, suffix = '' }) {
  return (
    <View style={styles.statRow}>
      <View style={styles.labelRow}>
        <Text style={styles.totalLabel}>{label}</Text>
        <Text style={[styles.totalValue, { color }]}>{value}{suffix}</Text>
      </View>
      <ProgressBar value={value} max={max} color={color} />
    </View>
  );
}

export default function StatsPanel({ personaje }) {
  const piezas = personaje.getPiezas();
  const armas  = personaje.getArmas();

  if (piezas.length === 0 && armas.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          🧱 Equipa alguna pieza o arma para ver las estadísticas.
        </Text>
      </View>
    );
  }

  const defTotal   = personaje.calcularDef();
  const danioTotal = personaje.calcularDanio();
  const costoTotal = personaje.getCostoTotal();
  const durTotal   = [
    ...piezas.map(p => p.durabilidad),
    ...armas.map(a => a.durabilidad),
  ].reduce((a, b) => a + b, 0);

  return (
    <View style={styles.container}>

      {piezas.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>🛡️ Estadísticas de armadura</Text>
          {piezas.map((p, i) => <PiezaCard key={`p-${i}`} pieza={p} />)}
        </>
      )}

      {armas.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>⚔️ Estadísticas de armas</Text>
          {armas.map((a, i) => <ArmaCard key={`a-${i}`} arma={a} />)}
        </>
      )}

      <View style={styles.totalCard}>
        <Text style={styles.totalTitle}>⚡ Totales del personaje</Text>
        <TotalRow label="Defensa total"  value={defTotal}   max={54}    color={THEME.statDefense} />
        <TotalRow label="Daño total"     value={danioTotal} max={46}    color={THEME.red} />
        <TotalRow label="Durabilidad"    value={durTotal}   max={9366}  color="#44C8D8" suffix=" pts" />
        <TotalRow label="Costo total"    value={costoTotal} max={900}   color={THEME.gold} suffix=" 🪙" />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:    { marginTop: 4 },
  sectionTitle: {
    color: THEME.primaryLight, fontWeight: '800',
    fontSize: 14, letterSpacing: 0.5, marginBottom: 10,
  },
  card: {
    backgroundColor: THEME.bgCard, borderRadius: 10,
    borderLeftWidth: 4, borderWidth: 1, borderColor: THEME.border,
    padding: 12, marginBottom: 10, gap: 8,
  },
  cardHeader:  { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  cardEmoji:   { fontSize: 20 },
  cardTitle:   { color: THEME.text, fontWeight: '700', fontSize: 14 },
  cardSub:     { fontSize: 11, fontWeight: '600', marginTop: 1 },
  rarityBadge: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  rarityText:  { fontSize: 10, fontWeight: '700' },
  statRow:     { gap: 4 },
  labelRow:    { flexDirection: 'row', justifyContent: 'space-between' },
  statLabel:   { color: THEME.textMuted, fontSize: 11 },
  statValue:   { fontSize: 11, fontWeight: '700' },
  track: {
    height: 7, backgroundColor: THEME.bgSection,
    borderRadius: 4, overflow: 'hidden',
  },
  fill:       { height: 7, borderRadius: 4 },
  totalCard: {
    backgroundColor: THEME.bgSection, borderRadius: 10,
    borderWidth: 1, borderColor: THEME.primaryDark,
    padding: 14, gap: 10, marginBottom: 4,
  },
  totalTitle: { color: THEME.primary, fontWeight: '800', fontSize: 13, marginBottom: 2 },
  totalLabel: { color: THEME.textMuted, fontSize: 12 },
  totalValue: { fontSize: 12, fontWeight: '700' },
  empty: {
    backgroundColor: THEME.bgSection, borderRadius: 10,
    borderWidth: 1, borderColor: THEME.border,
    padding: 16, alignItems: 'center', marginBottom: 10,
  },
  emptyText:  { color: THEME.textMuted, fontSize: 12, textAlign: 'center' },
});