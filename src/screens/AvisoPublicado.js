import { View } from 'react-native';
import { colors } from '../theme';
import { Button, Screen, Txt } from '../ui';
import { CircleCheck } from '../icons';

export default function AvisoPublicado({ nav, params, data }) {
  const pet = data.pets.find((p) => p.id === params.pet) || data.pets[1];

  return (
    <Screen>
      <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 24 }}>
        <View style={{ marginTop: 222, width: 112, height: 112, borderRadius: 56, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center' }}>
          <CircleCheck size={50} color={colors.primary} strokeWidth={2} />
        </View>
        <Txt v="headline" style={{ marginTop: 24 }}>
          Aviso publicado
        </Txt>
        <Txt v="body" color={colors.textVariant} style={{ marginTop: 9, textAlign: 'center' }}>
          O aviso do {pet.name} já aparece em Pets perdidos e os tutores da região serão notificados.
        </Txt>
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 32, gap: 8 }}>
        <Button label="Ver aviso" onPress={() => nav.go('PetPerdido', { id: 'fluffy' })} />
        <Button label="Voltar ao início" kind="text" onPress={() => nav.tab('Inicio')} />
      </View>
    </Screen>
  );
}
