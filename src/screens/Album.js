import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { Chip, ChipRow, ConfirmDialog, Fab, IconButton, PhotoBox, Screen, TopBar, Txt } from '../ui';
import { Plus, SquareCheck, Tick, Trash, X } from '../icons';

export default function Album({ nav, data, setData }) {
  const luna = data.pets[0];
  const [filter, setFilter] = useState('Todas');
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState([]);
  const [confirm, setConfirm] = useState(false);

  const photos = data.photos.filter((p) => filter === 'Todas' || p.tag === filter);

  function toggle(id) {
    setSelected(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  }

  function stopSelecting() {
    setSelecting(false);
    setSelected([]);
  }

  function remove() {
    setData((d) => ({ ...d, photos: d.photos.filter((p) => !selected.includes(p.id)) }));
    setConfirm(false);
    stopSelecting();
  }

  return (
    <Screen>
      {selecting ? (
        // Barra de seleção
        <View style={{ height: 64, backgroundColor: colors.searchField, flexDirection: 'row', alignItems: 'center', paddingRight: 4 }}>
          <Pressable onPress={stopSelecting} style={{ width: 48, height: 48, marginLeft: 4, marginRight: 4, alignItems: 'center', justifyContent: 'center' }}>
            <X size={24} color={colors.textVariant} />
          </Pressable>
          <Txt v="screenTitle" style={{ flex: 1 }}>
            {selected.length} {selected.length === 1 ? 'selecionada' : 'selecionadas'}
          </Txt>
          <IconButton icon={Trash} color={colors.error} onPress={() => selected.length && setConfirm(true)} />
        </View>
      ) : (
        <>
          <TopBar title={`Álbum · ${luna.name}`} onBack={nav.back}>
            <IconButton icon={SquareCheck} onPress={() => setSelecting(true)} />
          </TopBar>
          <ChipRow>
            {['Todas', 'Passeios', 'Aniversário'].map((f) => (
              <Chip key={f} label={f} selected={filter === f} onPress={() => setFilter(f)} />
            ))}
          </ChipRow>
        </>
      )}

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 96, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {photos.map((p) => {
          const on = selected.includes(p.id);
          return (
            <Pressable
              key={p.id}
              onPress={() => (selecting ? toggle(p.id) : null)}
              onLongPress={() => {
                setSelecting(true);
                toggle(p.id);
              }}
              style={{ width: 104, height: 104 }}
            >
              <PhotoBox light={!p.dark} iconSize={20} style={{ flex: 1, borderWidth: on ? 3 : 0, borderColor: colors.primary }} />
              {on ? (
                <View style={{ position: 'absolute', left: 6, top: 6, width: 24, height: 24, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
                  <Tick size={16} color={colors.white} strokeWidth={2.5} />
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </ScrollView>

      {selecting ? null : (
        <View>
          <Fab icon={Plus} label="Adicionar foto" style={{ bottom: 24 }} />
        </View>
      )}

      <ConfirmDialog
        visible={confirm}
        title={`Excluir ${selected.length} ${selected.length === 1 ? 'foto' : 'fotos'}?`}
        message={`As fotos serão removidas do álbum da ${luna.name}.`}
        confirmLabel={selected.length === 1 ? 'Excluir foto' : 'Excluir fotos'}
        onCancel={() => setConfirm(false)}
        onConfirm={remove}
      />
    </Screen>
  );
}
