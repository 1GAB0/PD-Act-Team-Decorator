import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import THEME from '../config/theme';

export default function AvatarPanel({ personaje }) {
  const piezas      = personaje.getPiezas();
  const armas       = personaje.getArmas();
  const defTotal    = personaje.calcularDef();
  const danioTotal  = personaje.calcularDanio();
  const costoTotal  = personaje.getCostoTotal();
  const monedas     = personaje.getMonedas();
  const monedasLeft = monedas - costoTotal;
  const pctDef      = Math.min((defTotal  / 54) * 100, 100); // max def  = 18×3
  const pctDanio    = Math.min((danioTotal / 45) * 100, 100); // max dmg  = 15×3

  const equipados = {};
  piezas.forEach(p => { equipados[p.tipo] = p; });

  return (
    <View style={styles.container}>

      <View style={styles.avatarRow}>
        <View style={styles.avatarBox}>
          <View style={styles.slotTop}>
            {equipados['Casco'] ? (
              <Image source={equipados['Casco'].icono} style={styles.iconLg} />
            ) : (
              <Image source={require('../assets/icons/Blanco.png')} style={styles.iconEmpty} />
            )}
          </View>
          
          <Text style={styles.avatar}>🧑‍🦱</Text>

          <View style={styles.sideSlots}>
            {equipados['Pecho'] ? (
              <Image source={equipados['Pecho'].icono} style={styles.iconLg} />
            ) : (
              <Image source={require('../assets/icons/Blanco.png')} style={styles.iconEmpty} />
            )}
          </View>

          <View style={styles.slotBottom}>
            {equipados['Botas'] ? (
              <Image source={equipados['Botas'].icono} style={styles.iconLg} />
            ) : (
              <Image source={require('../assets/icons/Blanco.png')} style={styles.iconEmpty} />
            )}
          </View>

        </View>

        <View style={styles.statsBox}>
          <Text style={styles.playerName}>{personaje.getNombre()}</Text>

          {/* Defensa */}
          <View style={styles.statRow}>
            <View style={styles.labelWithIcon}>
              <Image source={require('../assets/icons/Defensa.png')} style={styles.tinyIcon} />
              <Text style={styles.statLabel}>Defensa</Text>
            </View>
            <Text style={[styles.statValue, { color: THEME.statDefense }]}>{defTotal}</Text>
          </View>
          
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${pctDef}%`, backgroundColor: THEME.statDefense }]} />
          </View>

          {/* Daño */}
          <View style={[styles.statRow, { marginTop: 6 }]}>
            <View style={styles.labelWithIcon}>
              <Image source={require('../assets/icons/Dano.png')} style={styles.tinyIcon} />
              <Text style={styles.statLabel}>Daño</Text>
            </View>
            <Text style={[styles.statValue, { color: THEME.red }]}>{danioTotal}</Text>
          </View>
          
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${pctDanio}%`, backgroundColor: THEME.red }]} />
          </View>

          {/* Monedas */}
          <View style={styles.coinsRow}>
            <View style={styles.coinBox}>
              <Text style={styles.coinLabel}>💰 Monedas</Text>
              <Text style={styles.coinValue}>{monedas}</Text>
            </View>
            <View style={styles.coinBox}>
              <Text style={styles.coinLabel}>🛒 Gastadas</Text>
              <Text style={[styles.coinValue, { color: THEME.red }]}>{costoTotal}</Text>
            </View>
            <View style={styles.coinBox}>
              <Text style={styles.coinLabel}>✅ Restantes</Text>
              <Text style={[
                styles.coinValue,
                { color: monedasLeft < 50 ? THEME.red : THEME.accent },
              ]}>
                {monedasLeft}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {piezas.length > 0 && (
        <View style={styles.badgesRow}>
          {piezas.map((p, i) => (
            <View key={`pieza-${i}`} style={[styles.badge, { borderColor: THEME.rarity[p.rareza] || THEME.border }]}>
              <Image source={p.icono} style={styles.badgeIcon} />
              <View>
                <Text style={styles.badgeTipo}>{p.tipo}</Text>
                <Text style={[styles.badgeMat, { color: THEME.rarity[p.rareza] || THEME.textMuted }]}>
                  {p.material}
                </Text>
              </View>
              <Text style={[styles.badgeStat, { color: THEME.statDefense }]}>+{p.defensa}🛡️</Text>
            </View>
          ))}
        </View>
      )}

      {armas.length > 0 && (
        <View style={styles.badgesRow}>
          {armas.map((a, i) => (
            <View key={`arma-${i}`} style={[styles.badge, { borderColor: THEME.rarity[a.rareza] || THEME.border }]}>
              <Image source={a.icono} style={styles.badgeIcon} />
              <View>
                <Text style={styles.badgeTipo}>{a.tipo}</Text>
                <Text style={[styles.badgeMat, { color: THEME.rarity[a.rareza] || THEME.textMuted }]}>
                  {a.material}
                </Text>
              </View>
              <Text style={[styles.badgeStat, { color: THEME.red }]}>+{a.danio}⚔️</Text>
            </View>
          ))}
        </View>
      )}

      {(piezas.length > 0 || armas.length > 0) && (
        <View style={styles.chainBox}>
          <Text style={styles.chainTitle}>🔗 Cadena Decorator + Bridge</Text>
          <Text style={styles.chainText}>{personaje.getDescripcion()}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: THEME.primary,
    padding: 16,
    marginBottom: 14,
  },
  avatarRow:  { flexDirection: 'row', gap: 16, marginBottom: 12 },
  avatarBox:  { alignItems: 'center', width: 80 },
  slotTop:    { fontSize: 22 },
  avatar:     { fontSize: 44 },
  sideSlots:  { position: 'absolute', right: -4, top: 28 },
  
  slotBottom: { fontSize: 22 },
  statsBox:   { flex: 1 },
  playerName: { color: THEME.accent, fontWeight: '900', fontSize: 16, marginBottom: 8 },
  statRow:    { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  statLabel:  { color: THEME.textMuted, fontSize: 12 },
  labelWithIcon: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  tinyIcon: { 
    width: 24, 
    height: 24, 
    resizeMode: 'contain', 
    marginRight: 4 
  },
  statValue:  { fontWeight: '900', fontSize: 14 },
  barTrack: {
    height: 8, backgroundColor: THEME.border,
    borderRadius: 4, overflow: 'hidden', marginBottom: 4,
  },
  barFill:    { height: '100%', borderRadius: 4 },
  coinsRow:   { flexDirection: 'row', gap: 8, marginTop: 6 },
  coinBox: {
    flex: 1, backgroundColor: THEME.bgSection,
    borderRadius: 8, padding: 6, alignItems: 'center',
    borderWidth: 1, borderColor: THEME.border,
  },
  coinLabel:  { color: THEME.textMuted, fontSize: 9, marginBottom: 2 },
  coinValue:  { color: THEME.gold, fontWeight: '900', fontSize: 13 },
  badgesRow:  { flexDirection: 'row', gap: 6, marginBottom: 8, flexWrap: 'wrap' },
  badge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: THEME.bgSection,
    borderRadius: 8, borderWidth: 1,
    padding: 6, gap: 6,
  },
  
  badgeTipo:  { color: THEME.text, fontSize: 11, fontWeight: '700' },
  badgeMat:   { fontSize: 10 },
  badgeStat:  { fontWeight: '700', fontSize: 11 },
  chainBox: {
    backgroundColor: THEME.bgSection, borderRadius: 8,
    borderWidth: 1, borderColor: THEME.primaryDark, padding: 10,
  },
  chainTitle: { color: THEME.primary, fontWeight: '700', fontSize: 12, marginBottom: 4 },
  chainText:  { color: THEME.textMuted, fontSize: 11, lineHeight: 16 },

  iconLg: { width: 32, height: 32, resizeMode: 'contain' },
  iconEmpty: { width: 32, height: 32, resizeMode: 'contain', opacity: 0.3 }, // Transparente si está vacío
  
  badgeIcon: { width: 24, height: 24, resizeMode: 'contain' },
});