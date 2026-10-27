import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { IconButton, Screen, TopBar, Txt } from '../ui';
import { Calendar, Clock, Heart, MessageSquare, Search, Tune } from '../icons';

export default function Notificacoes({ nav }) {
  const today = [
    { icon: Clock, title: 'Vermífugo mensal', text: 'Luna · hoje às 14:00', unread: true, go: () => nav.go('EditarLembrete', { id: 3 }) },
    { icon: Search, title: 'Possível avistamento do Fluffy', text: 'Um tutor viu um cão parecido a 1,4 km', unread: true, alert: true, go: () => nav.go('PetPerdido', { id: 'fluffy' }) },
  ];
  const yesterday = [
    { icon: MessageSquare, title: 'Rafael Lima comentou na sua postagem', text: 'Estamos chegando em 10 minutos…', go: () => nav.go('Postagem', { id: 'p1' }) },
    { icon: Heart, title: 'Marina Costa curtiu sua foto', text: 'Álbum da Luna', go: () => nav.go('Album') },
    { icon: Calendar, title: 'Vacina V8 agendada', text: '24 de novembro · Clínica Vet Vida', go: () => nav.go('Saude') },
  ];

  return (
    <Screen>
      <TopBar title="Notificações" onBack={nav.back}>
        <IconButton icon={Tune} />
      </TopBar>
      <ScrollView style={{ flex: 1 }}>
        <Section title="Hoje" first />
        {today.map((n) => (
          <Item key={n.title} {...n} />
        ))}
        <Section title="Ontem" />
        {yesterday.map((n) => (
          <Item key={n.title} {...n} />
        ))}
      </ScrollView>
    </Screen>
  );
}

function Section({ title, first }) {
  return (
    <Txt v="bodyMedium" color={colors.primary} style={{ marginLeft: 16, marginTop: first ? 0 : 16, marginBottom: 4 }}>
      {title}
    </Txt>
  );
}

function Item({ icon: Icon, title, text, unread, alert, go }) {
  return (
    <Pressable onPress={go} style={{ minHeight: 72, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8.5 }}>
      <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: alert ? colors.errorContainer : colors.primaryContainer, alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={22} color={alert ? colors.error : colors.primary} />
      </View>
      <View style={{ flex: 1, marginLeft: 16, marginRight: 8 }}>
        <Txt v={unread ? 'itemMedium' : 'item'}>{title}</Txt>
        <Txt v="body" color={colors.textVariant} numberOfLines={1}>
          {text}
        </Txt>
      </View>
      {unread ? <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary }} /> : null}
    </Pressable>
  );
}
