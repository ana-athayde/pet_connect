import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { BottomActions, Button, Chip, ChipWrap, Field, Screen, TopBar, Txt } from '../ui';
import { Calendar, Clock } from '../icons';

export default function AvisoSumico({ nav, data }) {
  const [pet, setPet] = useState('fluffy');
  const [form, setForm] = useState({
    local: 'Rua das Flores, 128 · Vila Nova',
    data: '14/10/2026',
    hora: '16:30',
    descricao: '',
    telefone: '',
  });
  const set = (key) => (text) => setForm({ ...form, [key]: text });

  return (
    <Screen>
      <TopBar title="Aviso de sumiço" onBack={nav.back} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
        <View style={{ backgroundColor: colors.errorContainer, borderRadius: 16, padding: 16 }}>
          <Txt v="body" color={colors.onErrorContainer}>
            Quanto antes você publicar, mais rápido a comunidade da região pode ajudar.
          </Txt>
        </View>

        <Txt v="label" color={colors.textVariant} style={{ marginTop: 15 }}>
          Qual pet sumiu?
        </Txt>
        <ChipWrap style={{ marginTop: 9 }}>
          {data.pets.map((p) => (
            <Chip key={p.id} label={p.name} letter={p.letter} selected={pet === p.id} onPress={() => setPet(p.id)} />
          ))}
        </ChipWrap>

        <Field label="Último local visto" value={form.local} onChangeText={set('local')} style={{ marginTop: 20 }} />
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
          <Field label="Data" value={form.data} onChangeText={set('data')} right={Calendar} style={{ flex: 1.5 }} />
          <Field label="Hora" value={form.hora} onChangeText={set('hora')} right={Clock} style={{ flex: 1 }} />
        </View>
        <Field label="Descrição" placeholder="Cor, porte, coleira, comportamento" value={form.descricao} onChangeText={set('descricao')} multiline height={98} style={{ marginTop: 16 }} />
        <Field label="Telefone para contato" placeholder="(11) 99999-0000" value={form.telefone} onChangeText={set('telefone')} keyboardType="phone-pad" style={{ marginTop: 16 }} />
      </ScrollView>

      <BottomActions>
        <Button label="Publicar aviso" onPress={() => nav.go('AvisoPublicado', { pet })} />
      </BottomActions>
    </Screen>
  );
}
