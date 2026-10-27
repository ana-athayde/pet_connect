import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { BottomNav, Button, Chevron, ConfirmDialog, Screen, Tag, TopBar, Txt } from '../ui';
import { CircleCheck, Clock, Heart, Plus, Trash } from '../icons';

export default function Saude({ nav, data, setData }) {
  const luna = data.pets[0];
  const [confirm, setConfirm] = useState(false);

  function cancelV8() {
    setData((d) => ({ ...d, v8Scheduled: false, pets: d.pets.map((p) => (p.id === 'luna' ? { ...p, nextVaccine: '—' } : p)) }));
    setConfirm(false);
  }

  return (
    <Screen bottomBg={colors.surfaceHigh}>
      <TopBar title={`Saúde · ${luna.name}`} onBack={nav.back} />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 8 }}>
        <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 16 }}>
          <Stat label="Peso" value={luna.weight} />
          <Stat label="Próxima vacina" value={data.v8Scheduled ? '24 nov' : '—'} />
        </View>

        <Txt v="sectionTitle" style={{ marginTop: 16, marginLeft: 16 }}>
          Vacinas
        </Txt>
        <Row icon={<CircleCheck size={22} color={colors.primary} style={{ marginHorizontal: 1 }} />} title="Antirrábica" subtitle="Aplicada em 12/05/2026" />
        {data.v8Scheduled ? (
          <Row
            icon={<Clock size={22} color={colors.textVariant} style={{ marginHorizontal: 1 }} />}
            title="V8"
            subtitle={'Agendada para\n24/11/2026'}
            right={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Tag label="Em breve" />
                <Pressable onPress={() => setConfirm(true)} style={{ marginLeft: 30, marginRight: 2 }}>
                  <Trash size={20} color={colors.textVariant} />
                </Pressable>
              </View>
            }
          />
        ) : null}

        <Txt v="sectionTitle" style={{ marginTop: 16, marginLeft: 16 }}>
          Consultas
        </Txt>
        <Row icon={<Plus size={24} color={colors.textVariant} />} title="Clínica Vet Vida" subtitle="Check-up anual · 12/05/2026" right={<Chevron />} padding={10} />
        <Row icon={<Plus size={24} color={colors.textVariant} />} title="Clínica Vet Vida" subtitle="Retorno · 02/03/2026" right={<Chevron />} padding={10} />
      </ScrollView>

      <Row icon={<Heart size={22} color={colors.primary} style={{ marginHorizontal: 1 }} />} title="Guias de cuidados" subtitle="Alimentação, higiene e comportamento" right={<Chevron />} padding={10} onPress={() => nav.go('Cuidados')} />
      <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }}>
        <Button label="Agendar consulta" onPress={() => nav.go('AgendarConsulta')} />
      </View>
      <BottomNav active="Perfil" nav={nav} />

      <ConfirmDialog
        visible={confirm}
        title="Cancelar agendamento?"
        message={`A vacina V8 de 24/11 será removida da agenda e da Rotina da ${luna.name}.`}
        cancelLabel="Manter"
        confirmLabel={'Cancelar\nagendamento'}
        confirmWidth={178}
        onCancel={() => setConfirm(false)}
        onConfirm={cancelV8}
      />
    </Screen>
  );
}

function Stat({ label, value }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.surfaceHigh, borderRadius: 16, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }}>
      <Txt v="label" color={colors.textVariant}>
        {label}
      </Txt>
      <Txt v="headline">{value}</Txt>
    </View>
  );
}

function Row({ icon, title, subtitle, right, padding = 9, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: padding }}>
      {icon}
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Txt v="item">{title}</Txt>
        <Txt v="body" color={colors.textVariant}>
          {subtitle}
        </Txt>
      </View>
      {right}
    </Pressable>
  );
}
