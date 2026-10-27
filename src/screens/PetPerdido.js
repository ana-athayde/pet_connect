import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { BottomActions, Button, ConfirmDialog, InfoCard, Screen, Tag, Txt } from '../ui';
import { Paw } from '../icons';
import { Hero } from './Local';

export default function PetPerdido({ nav, params, data, setData }) {
  const pet = data.lostPets.find((p) => p.id === params.id) || data.lostPets[0];
  const [confirm, setConfirm] = useState(false);

  function remove() {
    setData((d) => ({ ...d, lostPets: d.lostPets.filter((p) => p.id !== pet.id) }));
    setConfirm(false);
    nav.tab('PetsPerdidos');
  }

  return (
    <Screen>
      <ScrollView style={{ flex: 1 }}>
        <Hero onBack={nav.back}>
          <Paw size={56} color={colors.photoIcon} strokeWidth={1.7} />
        </Hero>

        <View style={{ paddingHorizontal: 16 }}>
          <Tag label="Perdido" bg={colors.errorContainer} color={colors.onErrorContainer} style={{ marginTop: 24 }} />
          <Txt v="headline" style={{ marginTop: 8 }}>
            {pet.name}
          </Txt>
          <Txt v="body" style={{ marginTop: 16 }}>
            {pet.description}
          </Txt>
          <InfoCard
            style={{ marginTop: 16 }}
            rows={[
              ['Raça', pet.breed],
              ['Visto por último', pet.lastSeen],
              ['Local', pet.place],
            ]}
          />
        </View>
      </ScrollView>

      <BottomActions>
        {pet.mine ? <Button label="Marcar como encontrado" onPress={remove} /> : null}
        <Button label="Ver no mapa" kind="tonal" onPress={() => nav.tab('Mapa')} />
        {pet.mine ? <Button label="Excluir aviso" kind="text" color={colors.error} onPress={() => setConfirm(true)} /> : null}
      </BottomActions>

      <ConfirmDialog
        visible={confirm}
        title="Excluir aviso?"
        message={`O aviso do ${pet.name} deixará de aparecer em Pets perdidos e os tutores da região não serão mais notificados.`}
        confirmLabel="Excluir aviso"
        onCancel={() => setConfirm(false)}
        onConfirm={remove}
      />
    </Screen>
  );
}
