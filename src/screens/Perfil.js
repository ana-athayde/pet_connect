import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { Avatar, BottomNav, Button, Chip, ChipRow, IconButton, InfoCard, PhotoBox, Screen, TopBar, Txt } from '../ui';
import { Plus, Tune, User } from '../icons';

export default function Perfil({ nav, data }) {
  const [petId, setPetId] = useState(data.pets[0].id);
  const pet = data.pets.find((p) => p.id === petId) || data.pets[0];

  return (
    <Screen bottomBg={colors.surfaceHigh}>
      <TopBar title="Perfil">
        <IconButton icon={User} onPress={() => nav.go('MeuPerfil')} />
        <IconButton icon={Tune} onPress={() => nav.go('Configuracoes')} />
      </TopBar>

      <ChipRow>
        {data.pets.map((p) => (
          <Chip key={p.id} label={p.name} letter={p.letter} selected={p.id === pet.id} onPress={() => setPetId(p.id)} />
        ))}
        <Chip label="Adicionar" icon={Plus} onPress={() => nav.go('CadastroPet', { novo: true })} />
      </ChipRow>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
          <Avatar paw={44} size={88} />
          <View style={{ marginLeft: 16 }}>
            <Txt v="headline" style={{ letterSpacing: -0.5 }}>
              {pet.name}
            </Txt>
            <Txt v="body" color={colors.textVariant}>
              {pet.breed} · {pet.age}
            </Txt>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
          <Button label="Editar perfil" style={{ flex: 1 }} onPress={() => nav.go('CadastroPet', { id: pet.id })} />
          <Button label="Compartilhar" kind="tonal" style={{ flex: 1 }} />
        </View>

        <Pressable onPress={() => nav.go('Saude')}>
          <InfoCard
            style={{ marginTop: 16 }}
            rows={[
              ['Sexo', pet.sex],
              ['Peso', pet.weight],
              ['Última consulta', pet.lastVisit],
              ['Próxima vacina', pet.nextVaccine],
            ]}
          />
        </Pressable>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25 }}>
          <Txt v="sectionTitle">Álbum</Txt>
          <Pressable onPress={() => nav.go('Album')}>
            <Txt v="bodyMedium" color={colors.primary}>
              Ver tudo
            </Txt>
          </Pressable>
        </View>
        <Pressable onPress={() => nav.go('Album')} style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
          <PhotoBox iconSize={20} style={{ flex: 1, height: 104 }} />
          <PhotoBox iconSize={20} style={{ flex: 1, height: 104 }} />
          <PhotoBox iconSize={20} style={{ flex: 1, height: 104 }} />
        </Pressable>
      </ScrollView>

      <BottomNav active="Perfil" nav={nav} />
    </Screen>
  );
}
