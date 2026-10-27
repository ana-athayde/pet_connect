import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { colors, type } from '../theme';
import { BottomNav, Button, Chip, ChipRow, Screen, TopBar, Txt } from '../ui';
import { Search, Users } from '../icons';

export default function Grupos({ nav, data, setData }) {
  const [filter, setFilter] = useState('Todos');
  const [query, setQuery] = useState('');

  const groups = data.groups.filter(
    (g) => (filter === 'Todos' || g.kind === filter) && g.name.toLowerCase().includes(query.toLowerCase())
  );

  function join(id) {
    setData((d) => ({ ...d, groups: d.groups.map((g) => (g.id === id ? { ...g, member: !g.member } : g)) }));
  }

  return (
    <Screen bottomBg={colors.surfaceHigh}>
      <TopBar title="Grupos" onBack={nav.back} />

      {/* Busca */}
      <View style={{ marginHorizontal: 16, height: 56, borderRadius: 28, backgroundColor: colors.searchField, flexDirection: 'row', alignItems: 'center', paddingLeft: 16 }}>
        <Search size={24} color={colors.textVariant} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar grupos"
          placeholderTextColor={colors.textVariant}
          style={[type.item, { flex: 1, marginLeft: 12, height: 56, color: colors.text, outlineStyle: 'none' }]}
        />
      </View>

      <ChipRow style={{ marginTop: 12 }}>
        {['Todos', 'Cachorros', 'Gatos'].map((f) => (
          <Chip key={f} label={f} selected={filter === f} onPress={() => setFilter(f)} />
        ))}
      </ChipRow>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 2 }}>
        {groups.map((g) => (
          <Pressable key={g.id} onPress={() => nav.go('Grupo', { id: g.id })} style={{ minHeight: 84, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 }}>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center' }}>
              <Users size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1, marginLeft: 16, marginRight: 16 }}>
              <Txt v="item">{g.name}</Txt>
              <Txt v="body" color={colors.textVariant}>
                {g.members} membros
              </Txt>
            </View>
            <Button label={g.member ? 'Membro' : 'Entrar'} kind={g.member ? 'tonal' : 'filled'} height={44} style={{ paddingHorizontal: 21 }} onPress={() => join(g.id)} />
          </Pressable>
        ))}
      </ScrollView>

      <BottomNav active="Comunidade" nav={nav} />
    </Screen>
  );
}
