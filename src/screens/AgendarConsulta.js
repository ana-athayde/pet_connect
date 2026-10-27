import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { BottomActions, Button, Chip, ChipWrap, Field, Screen, TopBar, Txt } from '../ui';

const TIMES = ['09:00', '10:30', '14:00', '16:00'];

export default function AgendarConsulta({ nav, data, setData }) {
  const [form, setForm] = useState({ pet: 'luna', tipo: 'Vacina', clinica: 'Clínica Vet Vida', data: '24/11/2026', hora: '10:30' });
  const set = (key) => (value) => setForm({ ...form, [key]: value });

  function confirm() {
    if (form.pet === 'luna' && form.tipo === 'Vacina') {
      setData((d) => ({ ...d, v8Scheduled: true }));
    }
    nav.back();
  }

  return (
    <Screen>
      <TopBar title="Agendar consulta" onBack={nav.back} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Txt v="label" color={colors.textVariant} style={{ marginTop: 0 }}>
          Pet
        </Txt>
        <ChipWrap style={{ marginTop: 8 }}>
          {data.pets.map((p) => (
            <Chip key={p.id} label={p.name} letter={p.letter} selected={form.pet === p.id} onPress={() => set('pet')(p.id)} />
          ))}
        </ChipWrap>

        <Txt v="label" color={colors.textVariant} style={{ marginTop: 20 }}>
          Tipo de consulta
        </Txt>
        <ChipWrap style={{ marginTop: 8 }}>
          {['Check-up', 'Vacina', 'Retorno'].map((t) => (
            <Chip key={t} label={t} selected={form.tipo === t} onPress={() => set('tipo')(t)} />
          ))}
        </ChipWrap>

        <Field label="Clínica" value={form.clinica} onChangeText={set('clinica')} style={{ marginTop: 24 }} />
        <Field label="Data" value={form.data} onChangeText={set('data')} style={{ marginTop: 20 }} />

        <Txt v="label" color={colors.textVariant} style={{ marginTop: 20 }}>
          Horário
        </Txt>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          {TIMES.map((t) => (
            <View key={t} style={{ flex: 1 }}>
              <Chip label={t} selected={form.hora === t} onPress={() => set('hora')(t)} />
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomActions>
        <Button label="Confirmar agendamento" onPress={confirm} />
      </BottomActions>
    </Screen>
  );
}
