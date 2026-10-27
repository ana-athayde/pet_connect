import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { BottomActions, Button, Chip, ChipWrap, Screen, Switch, TopBar, Txt } from '../ui';

const TYPES = ['Parques', 'Cafés', 'Hotéis', 'Veterinários', 'Pet shops'];
const START = { tipos: ['Parques', 'Cafés'], km: 4, externa: true, agua: true, aberto: false };

export default function Filtros({ nav }) {
  const [f, setF] = useState(START);

  function toggleType(t) {
    setF({ ...f, tipos: f.tipos.includes(t) ? f.tipos.filter((x) => x !== t) : [...f.tipos, t] });
  }

  function clear() {
    setF({ tipos: [], km: 10, externa: false, agua: false, aberto: false });
  }

  // contagem fictícia: menos filtros = mais locais
  const count = 12;

  return (
    <Screen>
      <TopBar title="Filtros" onBack={nav.back} close>
        <Pressable onPress={clear} style={{ height: 48, justifyContent: 'center', paddingHorizontal: 16 }}>
          <Txt v="bodyMedium" color={colors.primary}>
            Limpar
          </Txt>
        </Pressable>
      </TopBar>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Txt v="sectionTitle" style={{ marginTop: 0 }}>
          Tipo de local
        </Txt>
        <ChipWrap style={{ marginTop: 12 }}>
          {TYPES.map((t) => (
            <Chip key={t} label={t} selected={f.tipos.includes(t)} onPress={() => toggleType(t)} />
          ))}
        </ChipWrap>

        <Txt v="sectionTitle" style={{ marginTop: 24 }}>
          Distância
        </Txt>
        <Slider value={f.km} max={10} onChange={(km) => setF({ ...f, km })} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
          <Txt v="caption" color={colors.textVariant}>
            0 km
          </Txt>
          <Txt v="bodyMedium" color={colors.primary} style={{ fontSize: 12, lineHeight: 16 }}>
            Até {f.km} km
          </Txt>
          <Txt v="caption" color={colors.textVariant}>
            10 km
          </Txt>
        </View>

        <Txt v="sectionTitle" style={{ marginTop: 24 }}>
          Comodidades
        </Txt>
        <View style={{ marginTop: 12 }}>
          <SwitchRow label="Área externa" value={f.externa} onChange={(v) => setF({ ...f, externa: v })} />
          <SwitchRow label="Água para pets" value={f.agua} onChange={(v) => setF({ ...f, agua: v })} />
          <SwitchRow label="Aberto agora" value={f.aberto} onChange={(v) => setF({ ...f, aberto: v })} />
        </View>
      </ScrollView>

      <BottomActions>
        <Button label={`Mostrar ${count} locais`} onPress={nav.back} />
      </BottomActions>
    </Screen>
  );
}

function SwitchRow({ label, value, onChange }) {
  return (
    <View style={{ height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Txt v="item">{label}</Txt>
      <Switch value={value} onChange={onChange} />
    </View>
  );
}

// Controle deslizante: trilho de 4 dp com alça vertical de 4 x 24
function Slider({ value, max, onChange }) {
  const [width, setWidth] = useState(328);
  const x = (value / max) * width;

  function pick(event) {
    const px = event.nativeEvent.locationX;
    const v = Math.round((Math.max(0, Math.min(width, px)) / width) * max);
    onChange(v);
  }

  return (
    <Pressable onLayout={(e) => setWidth(e.nativeEvent.layout.width)} onPress={pick} style={{ height: 24, marginTop: 24, justifyContent: 'center' }}>
      <View style={{ position: 'absolute', left: 0, width: Math.max(0, x - 6), height: 4, borderRadius: 2, backgroundColor: colors.primary }} />
      <View style={{ position: 'absolute', left: x + 6, right: 0, height: 4, borderRadius: 2, backgroundColor: '#E4E3E8' }} />
      <View style={{ position: 'absolute', left: x - 2, width: 4, height: 24, borderRadius: 2, backgroundColor: colors.primary }} />
    </Pressable>
  );
}
