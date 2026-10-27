import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { Button, Chevron, Screen, TopBar, Txt } from '../ui';
import { Bell, Globe, Info, Lock, MessageSquare, Moon, User } from '../icons';

export default function Configuracoes({ nav }) {
  return (
    <Screen>
      <TopBar title="Configurações" onBack={nav.back} />
      <ScrollView style={{ flex: 1 }}>
        <Section title="Conta" first />
        <Row icon={User} title="Dados do tutor" subtitle="Nome, e-mail e telefone" onPress={() => nav.go('MeuPerfil')} />
        <Row icon={Bell} title="Notificações" subtitle="Lembretes e avisos de sumiço" onPress={() => nav.go('Notificacoes')} />
        <Row icon={Lock} title="Privacidade" subtitle="Localização e visibilidade do perfil" />

        <Section title="Preferências" />
        <Row icon={Globe} title="Idioma" subtitle="Português (Brasil)" noChevron />
        <Row icon={Moon} title="Tema" subtitle="Seguir o sistema" noChevron />

        <Section title="Sobre" />
        <Row icon={MessageSquare} title="Enviar feedback" subtitle="Conte o que podemos melhorar" onPress={() => nav.go('Feedback')} />
        <Row icon={Info} title="Termos e privacidade" />
      </ScrollView>

      <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        <Button label="Sair da conta" kind="outlined" color={colors.error} onPress={() => nav.tab('BoasVindas')} />
      </View>
    </Screen>
  );
}

function Section({ title, first }) {
  return (
    <Txt v="bodyMedium" color={colors.primary} style={{ marginLeft: 16, marginTop: first ? 0 : 16, marginBottom: 8 }}>
      {title}
    </Txt>
  );
}

function Row({ icon: Icon, title, subtitle, onPress, noChevron }) {
  return (
    <Pressable onPress={onPress} style={{ minHeight: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8 }}>
      <Icon size={22} color={colors.textVariant} style={{ marginHorizontal: 1 }} />
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Txt v="item">{title}</Txt>
        {subtitle ? (
          <Txt v="body" color={colors.textVariant}>
            {subtitle}
          </Txt>
        ) : null}
      </View>
      {noChevron ? null : <Chevron />}
    </Pressable>
  );
}
