import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { Avatar, BottomActions, Button, Chevron, ConfirmDialog, IconButton, InfoCard, Screen, TopBar, Txt } from '../ui';
import { Tune } from '../icons';

export default function MeuPerfil({ nav, data }) {
  const { tutor, pets } = data;
  const [confirm, setConfirm] = useState(false);

  return (
    <Screen>
      <TopBar title="Meu perfil" onBack={nav.back}>
        <IconButton icon={Tune} onPress={() => nav.go('Configuracoes')} />
      </TopBar>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar letter="S" size={88} textSize={36} />
          <View style={{ marginLeft: 16 }}>
            <Txt v="headline" style={{ letterSpacing: -0.5 }}>
              {tutor.name}
            </Txt>
            <Txt v="body" color={colors.textVariant}>
              Tutora de {pets.length} pets
            </Txt>
          </View>
        </View>

        <InfoCard
          style={{ marginTop: 16 }}
          rows={[
            ['E-mail', tutor.email],
            ['Telefone', tutor.phone],
            ['Cidade', tutor.city],
          ]}
        />

        <Txt v="sectionTitle" style={{ marginTop: 15 }}>
          Meus pets
        </Txt>
        <View style={{ marginTop: 9, gap: 16 }}>
          {pets.map((p) => (
            <Pressable key={p.id} onPress={() => nav.tab('Perfil')} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar letter={p.letter} size={48} textSize={18} />
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Txt v="item">{p.name}</Txt>
                <Txt v="body" color={colors.textVariant}>
                  {p.breed} · {p.age}
                </Txt>
              </View>
              <Chevron />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <BottomActions>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button label="Editar dados" style={{ flex: 1 }} onPress={() => nav.go('CadastroTutor')} />
          <Button label="Adicionar pet" kind="tonal" style={{ flex: 1 }} onPress={() => nav.go('CadastroPet', { novo: true })} />
        </View>
        <Button label="Excluir minha conta" kind="text" color={colors.error} onPress={() => setConfirm(true)} />
      </BottomActions>

      <ConfirmDialog
        visible={confirm}
        title="Excluir sua conta?"
        message="Seus dados, pets, postagens e avisos serão removidos de forma permanente."
        confirmLabel="Excluir conta"
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          setConfirm(false);
          nav.tab('BoasVindas');
        }}
      />
    </Screen>
  );
}
