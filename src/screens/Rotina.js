import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { BottomNav, Button, Fab, IconButton, Screen, Tag, TopBar, Txt } from '../ui';
import { Calendar, CalendarCheck, Check, Plus } from '../icons';

// Semana de 12 a 18 de outubro de 2026; hoje é quarta, 14
const WEEK = [
  ['seg', 12],
  ['ter', 13],
  ['qua', 14],
  ['qui', 15],
  ['sex', 16],
  ['sáb', 17],
  ['dom', 18],
];
const TODAY = 14;

export default function Rotina({ nav, data, setData }) {
  const [day, setDay] = useState(TODAY);
  const luna = data.pets[0];

  // os lembretes do protótipo são todos de hoje
  const items = day === TODAY ? data.reminders : [];

  function toggle(id) {
    setData((d) => ({ ...d, reminders: d.reminders.map((r) => (r.id === id ? { ...r, done: !r.done } : r)) }));
  }

  return (
    <Screen bottomBg={colors.surfaceHigh}>
      <TopBar title="Rotina">
        <IconButton icon={Calendar} onPress={() => setDay(TODAY)} />
      </TopBar>

      <Txt v="body" color={colors.textVariant} style={{ marginTop: 0, marginLeft: 16 }}>
        Outubro de 2026
      </Txt>

      {/* Seletor de dias */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 14, marginTop: 7 }}>
        {WEEK.map(([name, n]) => {
          const on = n === day;
          return (
            <Pressable key={n} onPress={() => setDay(n)} style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ width: 46, height: 68, borderRadius: 23, backgroundColor: on ? colors.primary : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                <Txt v="caption" color={on ? colors.onPrimary : colors.textVariant}>
                  {name}
                </Txt>
                <Txt v="item" color={on ? colors.onPrimary : colors.text} style={{ marginTop: 2, fontSize: 18 }}>
                  {n}
                </Txt>
              </View>
            </Pressable>
          );
        })}
      </View>

      {items.length === 0 ? (
        // Estado vazio
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
          <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center' }}>
            <CalendarCheck size={40} color={colors.primary} />
          </View>
          <Txt v="screenTitle" style={{ marginTop: 13, textAlign: 'center' }}>
            {day === TODAY ? `Nada para a ${luna.name} hoje` : `Nada para a ${luna.name} neste dia`}
          </Txt>
          <Txt v="body" color={colors.textVariant} style={{ marginTop: 6, textAlign: 'center' }}>
            Crie lembretes de alimentação, passeios, remédios e consultas.
          </Txt>
          <Button label="Criar lembrete" onPress={() => nav.go('EditarLembrete', { novo: true })} style={{ marginTop: 17 }} />
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 96 }}>
          <Txt v="sectionTitle" style={{ marginTop: 13, marginLeft: 16 }}>
            Hoje · {luna.name}
          </Txt>
          {items.map((r) => (
            <View key={r.id} style={{ height: 64, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
              <Pressable onPress={() => toggle(r.id)} hitSlop={12}>
                <Check done={r.done} color={r.done ? colors.primary : colors.textVariant} />
              </Pressable>
              <Pressable onPress={() => nav.go('EditarLembrete', { id: r.id })} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 16 }}>
                <View style={{ flex: 1 }}>
                  <Txt v="item">{r.title}</Txt>
                  <Txt v="body" color={colors.textVariant}>
                    {r.detail ? `${r.time} · ${r.detail}` : r.time}
                  </Txt>
                </View>
                {r.tag ? <Tag label={r.tag} /> : null}
              </Pressable>
            </View>
          ))}

          {data.v8Scheduled ? (
            <Pressable onPress={() => nav.go('Saude')} style={{ marginHorizontal: 16, marginTop: 16, backgroundColor: colors.surfaceHigh, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center' }}>
              <Calendar size={24} color={colors.primary} />
              <View style={{ marginLeft: 16 }}>
                <Txt v="item">Vacina V8</Txt>
                <Txt v="body" color={colors.textVariant}>
                  24 de novembro · Clínica Vet Vida
                </Txt>
              </View>
            </Pressable>
          ) : null}
        </ScrollView>
      )}

      {items.length > 0 ? (
        <View>
          <Fab icon={Plus} onPress={() => nav.go('EditarLembrete', { novo: true })} />
        </View>
      ) : null}
      <BottomNav active="Rotina" nav={nav} />
    </Screen>
  );
}
