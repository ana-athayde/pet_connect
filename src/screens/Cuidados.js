import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { BottomNav, Chevron, Chip, ChipRow, IconButton, IconTile, Screen, TopBar, Txt } from '../ui';
import { Clock, Cup, Heart, MessageSquare, Paw } from '../icons';

const GUIDES = [
  { icon: Cup, title: 'Água e hidratação', time: 'Leitura de 3 min' },
  { icon: Heart, title: 'Alimentos que fazem mal', time: 'Leitura de 4 min' },
  { icon: Clock, title: 'Horários e porções', time: 'Leitura de 5 min' },
  { icon: Paw, title: 'Petiscos e recompensas', time: 'Leitura de 3 min' },
];

export default function Cuidados({ nav, data }) {
  const [topic, setTopic] = useState('Alimentação');
  const luna = data.pets[0];

  return (
    <Screen bottomBg={colors.surfaceHigh}>
      <TopBar title="Cuidados" onBack={nav.back}>
        <IconButton icon={MessageSquare} onPress={() => nav.go('Tutor')} />
      </TopBar>

      <ChipRow>
        {['Alimentação', 'Higiene', 'Comportamento'].map((t) => (
          <Chip key={t} label={t} selected={topic === t} onPress={() => setTopic(t)} />
        ))}
      </ChipRow>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 16 }}>
        <View style={{ marginHorizontal: 16, marginTop: 16, backgroundColor: colors.surfaceHigh, borderRadius: 16, padding: 16 }}>
          <Txt v="label" color={colors.textVariant} style={{ fontFamily: 'RobotoFlex-Regular', letterSpacing: 0.4 }}>
            Para a {luna.name}
          </Txt>
          <Txt v="itemMedium" style={{ marginTop: 8 }}>
            Rotina de alimentação para Golden Retriever adulto
          </Txt>
          <Txt v="body" color={colors.textVariant} style={{ marginTop: 8 }}>
            Porções, horários e sinais de que a dieta precisa de ajuste.
          </Txt>
        </View>

        <Txt v="sectionTitle" style={{ marginTop: 16, marginLeft: 16 }}>
          Guias
        </Txt>
        <View style={{ marginTop: 0 }}>
          {GUIDES.map((g) => (
            <Pressable key={g.title} style={{ height: 72, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
              <IconTile icon={g.icon} bg={colors.photo} color={colors.photoIcon} r={12} />
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Txt v="item">{g.title}</Txt>
                <Txt v="body" color={colors.textVariant}>
                  {g.time}
                </Txt>
              </View>
              <Chevron />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <BottomNav active="Inicio" nav={nav} />
    </Screen>
  );
}
