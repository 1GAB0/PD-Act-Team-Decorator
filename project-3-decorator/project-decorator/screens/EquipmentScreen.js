import React, { useState } from 'react';
import {
  View, Text, ScrollView,
  StyleSheet, StatusBar, TouchableOpacity, Image
} from 'react-native';

import PersonajeBase from '../decorator/PersonajeBase';

import PiezasModule from '../decorator/Piezas';
const { CascoDecorador, PechoDecorador, BootasDecorador } = PiezasModule;
import MatModule from '../bridge/Materiales';
const { cuero, hierro, diamante } = MatModule;

import TiposArmaModule from '../decorator/TiposArma';
const { EspadaDecorador, ArcoDecorador, HachaDecorador } = TiposArmaModule;
import ArmasModule from '../bridge/Armas';
const { ARMAS_POR_TIPO } = ArmasModule;

import THEME       from '../config/theme';
import AvatarPanel from '../components/AvatarPanel';
import SlotSection from '../components/SlotSection';
import StatsPanel  from '../components/StatsPanel';

const ARMOR_SLOTS =[
  { id: 'casco', label: 'Casco', icono: require('../assets/icons/Casco.png') },
  { id: 'pecho', label: 'Pecho', icono: require('../assets/icons/Pecho.png') },
  { id: 'botas', label: 'Botas', icono: require('../assets/icons/Botas.png') },
];

const WEAPON_SLOTS =[
  { id: 'espada', label: 'Espada', icono: require('../assets/icons/Dano.png') },
  { id: 'arco',   label: 'Arco',   icono: require('../assets/icons/Dano.png') },
  { id: 'hacha',  label: 'Hacha',  icono: require('../assets/icons/Dano.png') },
];

const MATERIAL_MAP = { Cuero: cuero, Hierro: hierro, Diamante: diamante };

const ARMOR_DECORATOR_MAP = {
  casco: CascoDecorador,
  pecho: PechoDecorador,
  botas: BootasDecorador,
};

const WEAPON_DECORATOR_MAP = {
  espada: EspadaDecorador,
  arco:   ArcoDecorador,
  hacha:  HachaDecorador,
};

function resolveArma(tipoSlot, materialNombre) {
  const tipoLabel = tipoSlot.charAt(0).toUpperCase() + tipoSlot.slice(1); // 'espada' → 'Espada'
  const lista = ARMAS_POR_TIPO[tipoLabel] || [];
  return lista.find(a => a.nombre === materialNombre) || null;
}

function buildPersonaje(selArmadura, selArmas) {
  let personaje = new PersonajeBase();

  ['casco', 'pecho', 'botas'].forEach(slotId => {
    const matNombre = selArmadura[slotId];
    if (matNombre) {
      const material  = MATERIAL_MAP[matNombre];
      const Decorator = ARMOR_DECORATOR_MAP[slotId];
      personaje = new Decorator(personaje, material);
    }
  });

  ['espada', 'arco', 'hacha'].forEach(slotId => {
    const matNombre = selArmas[slotId];
    if (matNombre) {
      const arma      = resolveArma(slotId, matNombre);
      const Decorator = WEAPON_DECORATOR_MAP[slotId];
      if (arma) personaje = new Decorator(personaje, arma);
    }
  });

  return personaje;
}

const MONEDAS_INICIO = 550;

export default function EquipmentScreen() {
  const [selArmadura, setSelArmadura] = useState({ casco: null, pecho: null, botas: null });
  const [selArmas,    setSelArmas]    = useState({ espada: null, arco: null, hacha: null });
  const [tab, setTab] = useState('armadura'); 

  const personaje   = buildPersonaje(selArmadura, selArmas);
  const costoTotal  = personaje.getCostoTotal();
  const monedasLeft = MONEDAS_INICIO - costoTotal;
  const equipados   = [
    ...Object.values(selArmadura),
    ...Object.values(selArmas),
  ].filter(Boolean).length;

  const handleSelectArmadura = (slotId, mat) =>
    setSelArmadura(prev => ({ ...prev, [slotId]: mat }));

  const handleSelectArma = (slotId, mat) =>
    setSelArmas(prev => ({ ...prev, [slotId]: mat }));

  const handleReset = () => {
    setSelArmadura({ casco: null, pecho: null, botas: null });
    setSelArmas({ espada: null, arco: null, hacha: null });
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={THEME.bg} />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>⛏️ Minecraft Armor</Text>
          <Text style={styles.headerSub}>
            Decorator + Bridge · {equipados}/6 equipado
          </Text>
        </View>
        {equipados > 0 && (
          <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
            <Text style={styles.resetText}>↺ Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <AvatarPanel personaje={personaje} />

        {monedasLeft < 80 && monedasLeft > 0 && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              ⚠️ Pocas monedas ({monedasLeft}). Algunas piezas no disponibles.
            </Text>
          </View>
        )}
        {monedasLeft <= 0 && (
          <View style={[styles.warningBox, styles.warningRed]}>
            <Text style={styles.warningText}>
              🚫 Sin monedas. Desequipa algo para continuar.
            </Text>
          </View>
        )}

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, tab === 'armadura' && styles.tabActive]}
            onPress={() => setTab('armadura')}
          >
            <Text style={[styles.tabText, tab === 'armadura' && styles.tabTextActive]}>
              🛡️ Armadura
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === 'armas' && styles.tabActive]}
            onPress={() => setTab('armas')}
          >
            <Text style={[styles.tabText, tab === 'armas' && styles.tabTextActive]}>
              ⚔️ Armas
            </Text>
          </TouchableOpacity>
        </View>

        {tab === 'armadura' && (
          <>
            <Text style={styles.sectionTitle}>🛡️ Equipamiento</Text>
            {ARMOR_SLOTS.map(slot => (
              <SlotSection
                key={slot.id}
                slot={slot}
                selectedMaterialNombre={selArmadura[slot.id]}
                monedasRestantes={monedasLeft}
                costoActual={costoTotal}
                onSelect={handleSelectArmadura}
              />
            ))}
          </>
        )}

        {tab === 'armas' && (
          <>
            <Text style={styles.sectionTitle}>⚔️ Armas</Text>
            {WEAPON_SLOTS.map(slot => {
              const tipoLabel = slot.id.charAt(0).toUpperCase() + slot.id.slice(1);
              const opciones  = ARMAS_POR_TIPO[tipoLabel] || [];
              return (
                <View key={slot.id} style={styles.weaponSlot}>
                  <Text style={styles.weaponSlotTitle}>
                    {slot.emoji} {slot.label}
                  </Text>
                  <View style={styles.weaponOptions}>

                    <TouchableOpacity
                      style={[
                        styles.weaponChip,
                        selArmas[slot.id] === null && styles.weaponChipSelected,
                      ]}
                      onPress={() => handleSelectArma(slot.id, null)}
                    >
                      <Text style={styles.weaponChipText}>Ninguna</Text>
                    </TouchableOpacity>

                    {opciones.map(arma => {
                      const canAfford = monedasLeft >= arma.getCosto() || selArmas[slot.id] === arma.nombre;
                      const selected  = selArmas[slot.id] === arma.nombre;
                      return (
                        <TouchableOpacity
                          key={arma.nombre}
                          style={[
                            styles.weaponChip,
                            selected && styles.weaponChipSelected,
                            !canAfford && !selected && styles.weaponChipDisabled,
                          ]}
                          onPress={() => canAfford || selected
                            ? handleSelectArma(slot.id, selected ? null : arma.nombre)
                            : null
                          }
                          disabled={!canAfford && !selected}
                        >
                          <Image 
                              source={arma.icono} 
                              style={[{ width: 24, height: 24, marginBottom: 4 }, !canAfford && !selected && { opacity: 0.3 }]} 
                            />
                          <Text style={[
                            styles.weaponChipText,
                            !canAfford && !selected && styles.weaponChipTextDisabled,
                          ]}>
                            {arma.nombre}
                          </Text>
                          <Text style={[
                            styles.weaponChipStat,
                            !canAfford && !selected && styles.weaponChipTextDisabled,
                          ]}>
                            ⚔️{arma.getDanio()} · 🪙{arma.getCosto()}
                          </Text>
                          {selected && (
                            <View style={[styles.rarityDot, { backgroundColor: arma.rarityColor }]} />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </>
        )}

        <StatsPanel personaje={personaje} />

        <View style={styles.legendBox}>
          <Text style={styles.legendTitle}>📖 Patrones aplicados</Text>
          <Text style={styles.legendText}>
            <Text style={{ color: THEME.primary }}>Decorator: </Text>
            cada pieza y arma envuelve al personaje sumando stats por capas.
          </Text>
          <Text style={styles.legendText}>
            <Text style={{ color: THEME.gold }}>Bridge: </Text>
            calcularDef() y calcularDanio() delegan al IMaterial/IArma sin acoplarse al tipo concreto.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: THEME.bg },
  header: {
    paddingTop: 50, paddingBottom: 14, paddingHorizontal: 20,
    borderBottomWidth: 1, borderBottomColor: THEME.border,
    backgroundColor: THEME.bgCard,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '900', color: THEME.accent, letterSpacing: 1 },
  headerSub:   { fontSize: 12, color: THEME.textMuted, marginTop: 3 },
  resetBtn: {
    backgroundColor: THEME.bgSection, borderWidth: 1,
    borderColor: THEME.primaryDark, paddingHorizontal: 14,
    paddingVertical: 8, borderRadius: 8,
  },
  resetText: { color: THEME.red, fontWeight: '700', fontSize: 13 },
  scroll:    { padding: 16 },

  tabs: {
    flexDirection: 'row', gap: 8,
    marginBottom: 14, marginTop: 2,
  },
  tab: {
    flex: 1, paddingVertical: 9, alignItems: 'center',
    borderRadius: 10, backgroundColor: THEME.bgSection,
    borderWidth: 1, borderColor: THEME.border,
  },
  tabActive:     { backgroundColor: THEME.primaryDark, borderColor: THEME.primary },
  tabText:       { color: THEME.textMuted, fontWeight: '700', fontSize: 13 },
  tabTextActive: { color: THEME.accent },

  sectionTitle: {
    color: THEME.primaryLight, fontWeight: '800',
    fontSize: 14, letterSpacing: 0.5, marginBottom: 10,
  },

  weaponSlot: {
    backgroundColor: THEME.bgCard, borderRadius: 12,
    borderWidth: 1, borderColor: THEME.border,
    padding: 12, marginBottom: 10,
  },
  weaponSlotTitle: {
    color: THEME.text, fontWeight: '800',
    fontSize: 13, marginBottom: 10,
  },
  weaponOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  weaponChip: {
    paddingHorizontal: 12, paddingVertical: 8,
    backgroundColor: THEME.bgSection, borderRadius: 10,
    borderWidth: 1, borderColor: THEME.border,
    alignItems: 'center', gap: 3, minWidth: 72,
  },
  weaponChipSelected: {
    backgroundColor: THEME.selected, borderColor: THEME.primary,
  },
  weaponChipDisabled: { borderColor: THEME.border, opacity: 0.4 },
  
  weaponChipText: {
    color: THEME.text, fontWeight: '700', fontSize: 12,
  },
  weaponChipTextDisabled: { color: THEME.disabledText },
  weaponChipStat: { color: THEME.textMuted, fontSize: 10 },
  rarityDot: {
    width: 6, height: 6, borderRadius: 3, marginTop: 2,
  },

  warningBox: {
    backgroundColor: '#1A1200', borderWidth: 1,
    borderColor: '#8B6914', borderRadius: 8,
    padding: 10, marginBottom: 12,
  },
  warningRed: { backgroundColor: '#1A0000', borderColor: THEME.red },
  warningText: { color: '#FFD700', fontSize: 12 },

  legendBox: {
    marginTop: 12, backgroundColor: THEME.bgSection,
    borderRadius: 10, borderWidth: 1,
    borderColor: THEME.primaryDark, padding: 14, gap: 6,
  },
  legendTitle: { color: THEME.primary, fontWeight: '700', fontSize: 13, marginBottom: 4 },
  legendText:  { color: THEME.textMuted, fontSize: 12, lineHeight: 18 },
});