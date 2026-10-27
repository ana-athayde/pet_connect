import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { Avatar, BottomNav, Card, Chevron, Divider, IconButton, IconTile, Screen, Txt } from '../ui';
import { Bell, Check, Clock, Heart, MapPin, Search } from '../icons';

export default function Inicio({ nav, data, setData }) {
  const luna = data.pets[0];
  const today = data.reminders.slice(0, 3);
  const park = data.places[0];

  function toggle(id) {
    setData((d) => ({
      ...d,
      reminders: d.reminders.map((r) => (r.id === id ? { ...r, done: !r.done } : r)),
    }));
  }

  return (
    <Screen bottomBg={colors.surfaceHigh}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 16 }}>
        {/* Saudação */}
        <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 4 }}>
          <Avatar paw={24} size={40} />
          <Txt v="screenTitle" style={{ flex: 1, marginLeft: 8 }}>
            Bom dia, {data.tutor.name}
          </Txt>
          <IconButton icon={Bell} onPress={() => nav.go('Notificacoes')} />
        </View>

        {/* Card da Luna */}
        <Card style={{ marginHorizontal: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar paw={28} size={56} />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Txt v="screenTitle">{luna.name}</Txt>
              <Txt v="body" color={colors.textVariant}>
                {luna.breed} · {luna.age}
              </Txt>
            </View>
            <Pressable onPress={() => nav.tab('Perfil')} style={{ height: 48, justifyContent: 'center', paddingHorizontal: 12 }}>
              <Txt v="bodyMedium" color={colors.primary}>
                Ver perfil
              </Txt>
            </Pressable>
          </View>
          <Divider style={{ marginTop: 12 }} />
          <View style={{ flexDirection: 'row', gap: 16, marginTop: 11 }}>
            <View style={{ flex: 1 }}>
              <Txt v="label" color={colors.textVariant}>
                Próxima vacina
              </Txt>
              <Txt v="itemMedium">{luna.nextVaccine}</Txt>
            </View>
            <View style={{ flex: 1 }}>
              <Txt v="label" color={colors.textVariant}>
                Peso
              </Txt>
              <Txt v="itemMedium">{luna.weight}</Txt>
            </View>
          </View>
        </Card>

        {/* Atalhos */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 12, marginTop: 16 }}>
          <Shortcut icon={Heart} label="Saúde" onPress={() => nav.go('Saude')} />
          <Shortcut icon={Clock} label="Lembretes" onPress={() => nav.tab('Rotina')} />
          <Shortcut icon={MapPin} label="Locais" onPress={() => nav.tab('Mapa')} />
          <Shortcut icon={Search} label="Sumiço" onPress={() => nav.go('PetsPerdidos')} />
        </View>

        {/* Hoje */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 27 }}>
          <Txt v="sectionTitle">Hoje</Txt>
          <Pressable onPress={() => nav.tab('Rotina')}>
            <Txt v="bodyMedium" color={colors.primary}>
              Ver rotina
            </Txt>
          </Pressable>
        </View>
        <View style={{ marginTop: 10 }}>
          {today.map((r) => (
            <Pressable key={r.id} onPress={() => toggle(r.id)} style={{ height: 64, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
              <Check done={r.done} color={r.done ? colors.primary : colors.textVariant} />
              <View style={{ marginLeft: 16 }}>
                <Txt v="item">{r.title}</Txt>
                <Txt v="body" color={colors.textVariant}>
                  {r.detail ? `${r.time} · ${r.detail}` : r.time}
                </Txt>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Local sugerido */}
        <Pressable
          onPress={() => nav.go('Local', { id: park.id })}
          style={{
            marginHorizontal: 16,
            marginTop: 16,
            borderWidth: 1,
            borderColor: colors.divider,
            borderRadius: 16,
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <IconTile icon={MapPin} bg={colors.photo} color={colors.photoIcon} r={12} />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Txt v="item">
              {park.name}
            </Txt>
            <Txt v="body" color={colors.textVariant}>
              {park.note} · {park.distance}
            </Txt>
          </View>
          <Chevron />
        </Pressable>
      </ScrollView>
      <BottomNav active="Inicio" nav={nav} />
    </Screen>
  );
}

function Shortcut({ icon, label, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ flex: 1, alignItems: 'center' }}>
      <IconTile icon={icon} />
      <Txt v="bodyMedium" style={{ fontSize: 12, lineHeight: 16, marginTop: 4 }}>
        {label}
      </Txt>
    </Pressable>
  );
}
