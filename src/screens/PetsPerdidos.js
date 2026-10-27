import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { BottomNav, Chip, ChipRow, Fab, IconButton, Screen, Tag, TopBar, Txt } from '../ui';
import { Paw, Plus, Search } from '../icons';

const FILTERS = ['Perto de mim', 'Cachorros', 'Gatos', 'Outros'];

export default function PetsPerdidos({ nav, data }) {
  const [filter, setFilter] = useState('Perto de mim');
  const pets = data.lostPets.filter((p) => filter === 'Perto de mim' || p.kind === filter);

  return (
    <Screen bottomBg={colors.surfaceHigh}>
      <TopBar title="Pets perdidos">
        <IconButton icon={Search} />
      </TopBar>

      <ChipRow>
        {FILTERS.map((f) => (
          <Chip key={f} label={f} selected={filter === f} onPress={() => setFilter(f)} />
        ))}
      </ChipRow>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 96 }}>
        {pets.map((p) => (
          <Pressable
            key={p.id}
            onPress={() => nav.go('PetPerdido', { id: p.id })}
            style={{ borderWidth: 1, borderColor: colors.divider, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 16, flexDirection: 'row', alignItems: 'center' }}
          >
            <View style={{ width: 88, height: 88, borderRadius: 12, backgroundColor: colors.photo, alignItems: 'center', justifyContent: 'center' }}>
              <Paw size={34} color={colors.photoIcon} />
            </View>
            <View style={{ flex: 1, height: 88, justifyContent: 'center', marginLeft: 16 }}>
              <Tag label="Perdido" bg={colors.errorContainer} color={colors.onErrorContainer} />
              <Txt v="itemMedium" style={{ marginTop: 2 }}>
                {p.name}
              </Txt>
              <Txt v="body" color={colors.textVariant} style={{ marginTop: 5 }}>
                {p.breed} · {p.area}
                {'\n'}
                {p.seen} · {p.distance}
              </Txt>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View>
        <Fab icon={Plus} label="Publicar aviso" onPress={() => nav.go('AvisoSumico')} />
      </View>
      <BottomNav active="Mapa" nav={nav} />
    </Screen>
  );
}
