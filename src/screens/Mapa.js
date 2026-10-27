import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import Svg, { Circle, Line, Rect } from 'react-native-svg';
import { colors, type } from '../theme';
import { BottomNav, Chevron, Chip, ChipRow, IconTile, Screen, Txt } from '../ui';
import { Cup, Pad, Plus, Search, Tune } from '../icons';

const FILTERS = ['Todos', 'Parques', 'Cafés', 'Veterinários'];
const KIND_BY_FILTER = { Parques: 'Parque', Cafés: 'Café', Veterinários: 'Veterinário' };
const PLACE_ICONS = { pad: Pad, cup: Cup, plus: Plus };

// Marcadores do mapa (posição em dp dentro da área do mapa)
const MARKERS = [
  { id: 'cafe', x: 101.7, y: 231.7, color: colors.markerDark },
  { id: 'parque', x: 255.7, y: 185.7, color: colors.primary },
  { id: 'vet', x: 185.7, y: 333.3, color: colors.markerDark },
];

export default function Mapa({ nav, data }) {
  const [filter, setFilter] = useState('Todos');
  const [query, setQuery] = useState('');

  const places = data.places.filter(
    (p) => (filter === 'Todos' || p.kind === KIND_BY_FILTER[filter]) && p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Screen bg={colors.mapGround} bottomBg={colors.surfaceHigh}>
      <View style={{ flex: 1 }}>
        {/* Mapa desenhado */}
        <Svg width={360} height={420} style={{ position: 'absolute', top: 0, left: 0 }}>
          <Rect x={0} y={0} width={360} height={420} fill={colors.mapGround} />
          <Rect x={190} y={150} width={200} height={139.5} rx={13} fill={colors.mapPark} />
          {/* ruas */}
          <Line x1={140.9} y1={-20} x2={78.0} y2={430} stroke={colors.mapStreet} strokeWidth={17.8} />
          <Line x1={240.9} y1={-20} x2={272.6} y2={430} stroke={colors.mapStreet} strokeWidth={14} />
          <Line x1={-10} y1={159.95} x2={370} y2={120.05} stroke={colors.mapStreet} strokeWidth={17.9} />
          <Line x1={-10} y1={296.5} x2={370} y2={316.5} stroke={colors.mapStreet} strokeWidth={13.7} />
          {/* você está aqui */}
          <Circle cx={150} cy={254} r={18} fill={colors.userHalo} />
          <Circle cx={150} cy={254} r={10} fill={colors.white} />
          <Circle cx={150} cy={254} r={6.7} fill={colors.userDot} />
        </Svg>

        {MARKERS.map((m) => {
          const place = data.places.find((p) => p.id === m.id);
          const Icon = PLACE_ICONS[place.icon];
          return (
            <Pressable key={m.id} onPress={() => nav.go('Local', { id: m.id })} style={{ position: 'absolute', left: m.x - 18, top: m.y - 18, width: 36, height: 42 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderTopLeftRadius: 18,
                  borderTopRightRadius: 18,
                  borderBottomLeftRadius: 18,
                  borderBottomRightRadius: 4,
                  backgroundColor: m.color,
                  transform: [{ rotate: '45deg' }],
                  shadowColor: '#000',
                  shadowOpacity: 0.25,
                  shadowRadius: 3,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 3,
                }}
              />
              <View style={{ position: 'absolute', left: 0, top: 0, width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={place.icon === 'pad' ? 22 : 20} color={colors.white} strokeWidth={place.icon === 'pad' ? 2.2 : 2} />
              </View>
            </Pressable>
          );
        })}

        {/* Busca */}
        <View
          style={{
            marginTop: 16,
            marginHorizontal: 16,
            height: 56,
            borderRadius: 28,
            backgroundColor: colors.searchField,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 16,
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          }}
        >
          <Search size={24} color={colors.textVariant} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar locais pet-friendly"
            placeholderTextColor={colors.textVariant}
            style={[type.item, { flex: 1, marginLeft: 12, height: 56, color: colors.text, outlineStyle: 'none' }]}
          />
          <Pressable onPress={() => nav.go('Filtros')} style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center', marginRight: 4 }}>
            <Tune size={24} color={colors.textVariant} />
          </Pressable>
        </View>

        <ChipRow style={{ marginTop: 12 }}>
          {FILTERS.map((f) => (
            <View key={f} style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, borderRadius: 8 }}>
              <Chip label={f} selected={filter === f} onPress={() => setFilter(f)} bg={colors.surface} border={colors.divider} />
            </View>
          ))}
        </ChipRow>

        {/* Folha "Perto de você" */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 387,
            bottom: 0,
            backgroundColor: colors.surfaceHigh,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: -1 },
          }}
        >
          <View style={{ alignSelf: 'center', marginTop: 13, width: 32, height: 4, borderRadius: 2, backgroundColor: colors.outline }} />
          <Txt v="sectionTitle" style={{ marginLeft: 16, marginTop: 8 }}>
            Perto de você
          </Txt>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 4 }}>
            {places.map((p) => (
              <Pressable key={p.id} onPress={() => nav.go('Local', { id: p.id })} style={{ height: 72, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
                <IconTile icon={PLACE_ICONS[p.icon]} bg={colors.photo} color={colors.photoIcon} r={12} />
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Txt v="item">{p.name}</Txt>
                  <Txt v="body" color={colors.textVariant}>
                    {[p.kind, p.distance, p.note].filter(Boolean).join(' · ')}
                  </Txt>
                </View>
                <Chevron />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
      <BottomNav active="Mapa" nav={nav} />
    </Screen>
  );
}
