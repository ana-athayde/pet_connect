import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { BottomActions, Button, Chip, ChipWrap, ConfirmDialog, Field, Screen, Switch, TopBar, Txt } from '../ui';
import { Calendar, Clock } from '../icons';

export default function EditarLembrete({ nav, params, data, setData }) {
  // sem parâmetro abre o "Vermífugo mensal", como no PDF
  const reminder = params.novo ? null : data.reminders.find((r) => r.id === (params.id || 3));
  const [form, setForm] = useState({
    titulo: reminder ? reminder.title : '',
    pet: 'luna',
    data: '14/10/2026',
    hora: reminder ? reminder.time : '',
    repetir: reminder ? reminder.repeat : 'Nunca',
    avisar: true,
  });
  const [confirm, setConfirm] = useState(false);
  const set = (key) => (value) => setForm({ ...form, [key]: value });

  function save() {
    if (reminder) {
      setData((d) => ({
        ...d,
        reminders: d.reminders.map((r) => (r.id === reminder.id ? { ...r, title: form.titulo, time: form.hora, repeat: form.repetir } : r)),
      }));
    } else if (form.titulo.trim()) {
      const novo = { id: Date.now(), title: form.titulo.trim(), time: form.hora || '09:00', done: false, repeat: form.repetir };
      setData((d) => ({ ...d, reminders: [...d.reminders, novo] }));
    }
    nav.back();
  }

  function remove() {
    setData((d) => ({ ...d, reminders: d.reminders.filter((r) => r.id !== reminder.id) }));
    setConfirm(false);
    nav.back();
  }

  return (
    <Screen>
      <TopBar title={reminder ? 'Editar lembrete' : 'Novo lembrete'} onBack={nav.back} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Field label="Título" value={form.titulo} onChangeText={set('titulo')} style={{ marginTop: 4 }} />

        <Txt v="label" color={colors.textVariant} style={{ marginTop: 20 }}>
          Pet
        </Txt>
        <ChipWrap style={{ marginTop: 8 }}>
          {data.pets.map((p) => (
            <Chip key={p.id} label={p.name} letter={p.letter} selected={form.pet === p.id} onPress={() => set('pet')(p.id)} />
          ))}
        </ChipWrap>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
          <Field label="Data" value={form.data} onChangeText={set('data')} right={Calendar} style={{ flex: 1.5 }} />
          <Field label="Hora" value={form.hora} onChangeText={set('hora')} right={Clock} style={{ flex: 1 }} />
        </View>

        <Txt v="label" color={colors.textVariant} style={{ marginTop: 20 }}>
          Repetir
        </Txt>
        <ChipWrap style={{ marginTop: 8, width: 300 }}>
          {['Nunca', 'Diário', 'Semanal', 'Mensal'].map((r) => (
            <Chip key={r} label={r} selected={form.repetir === r} onPress={() => set('repetir')(r)} />
          ))}
        </ChipWrap>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 26 }}>
          <View style={{ flex: 1 }}>
            <Txt v="item">Avisar no celular</Txt>
            <Txt v="body" color={colors.textVariant}>
              15 minutos antes
            </Txt>
          </View>
          <Switch value={form.avisar} onChange={set('avisar')} />
        </View>
      </ScrollView>

      <BottomActions>
        <Button label="Salvar lembrete" onPress={save} />
        {reminder ? <Button label="Excluir lembrete" kind="text" color={colors.error} onPress={() => setConfirm(true)} /> : null}
      </BottomActions>

      <ConfirmDialog
        visible={confirm}
        title="Excluir lembrete?"
        message={`O lembrete ${reminder ? reminder.title : ''} e as repetições dele serão removidos.`}
        confirmLabel="Excluir lembrete"
        onCancel={() => setConfirm(false)}
        onConfirm={remove}
      />
    </Screen>
  );
}
