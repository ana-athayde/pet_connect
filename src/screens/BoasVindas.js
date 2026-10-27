import { View } from 'react-native';
import { colors } from '../theme';
import { Button, IconTile, Screen, Txt } from '../ui';
import { Calendar, MapPin, Paw, Users } from '../icons';

const FEATURES = [
  { icon: Calendar, title: 'Rotina e saúde', text: 'Lembretes, vacinas e consultas.' },
  { icon: MapPin, title: 'Locais pet-friendly', text: 'Parques, cafés e veterinários por perto.' },
  { icon: Users, title: 'Comunidade', text: 'Tutores que ajudam e avisam quando um pet some.' },
];

export default function BoasVindas({ nav }) {
  return (
    <Screen>
      {/* Faixa de topo com o logotipo */}
      <View
        style={{
          height: 320,
          backgroundColor: colors.primaryContainer,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          alignItems: 'center',
        }}
      >
        <View style={{ marginTop: 86, width: 96, height: 96, borderRadius: 30, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
          <Paw size={50} color={colors.white} strokeWidth={2} />
        </View>
        <Txt v="headline" color={colors.onPrimaryContainer} style={{ marginTop: 15 }}>
          PetConnect
        </Txt>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <Txt v="screenTitle" style={{ marginTop: 24 }}>
          Tudo para cuidar do seu pet,{'\n'}em um só lugar
        </Txt>

        <View style={{ marginTop: 12 }}>
          {FEATURES.map((f) => (
            <View key={f.title} style={{ height: 80, flexDirection: 'row', alignItems: 'center' }}>
              <IconTile icon={f.icon} size={48} r={12} />
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Txt v="item">{f.title}</Txt>
                <Txt v="body" color={colors.textVariant}>
                  {f.text}
                </Txt>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 32, gap: 8 }}>
        <Button label="Começar" onPress={() => nav.go('CadastroTutor')} />
        <Button label="Já tenho conta" kind="text" onPress={() => nav.go('Login')} />
      </View>
    </Screen>
  );
}
