import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { BottomActions, Button, Chip, ChipWrap, Field, Screen, TopBar, Txt } from '../ui';

const REASONS = ['Facilidade de uso', 'Encontrar locais', 'Comunidade', 'Outro'];

export default function Feedback({ nav }) {
  const [nota, setNota] = useState(5);
  const [motivo, setMotivo] = useState('Facilidade de uso');
  const [texto, setTexto] = useState('');

  return (
    <Screen>
      <TopBar title="Enviar feedback" onBack={nav.back} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Txt v="body" color={colors.textVariant} style={{ marginTop: 0 }}>
          Sua opinião ajuda a melhorar o PetConnect.
        </Txt>

        <Txt v="itemMedium" style={{ marginTop: 24 }}>
          Como você avalia o aplicativo?
        </Txt>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
          {[1, 2, 3, 4, 5].map((n) => {
            const on = n === nota;
            return (
              <Pressable
                key={n}
                onPress={() => setNota(n)}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  borderWidth: on ? 0 : 1,
                  borderColor: colors.outline,
                  backgroundColor: on ? colors.primary : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Txt v="item" color={on ? colors.onPrimary : colors.textVariant}>
                  {n}
                </Txt>
              </Pressable>
            );
          })}
        </View>

        <Txt v="itemMedium" style={{ marginTop: 24 }}>
          Qual o motivo principal?
        </Txt>
        <ChipWrap style={{ marginTop: 12 }}>
          {REASONS.map((r) => (
            <Chip key={r} label={r} selected={motivo === r} onPress={() => setMotivo(r)} />
          ))}
        </ChipWrap>

        <Field
          label="Conte com detalhes"
          placeholder="Escreva aqui o que você gostou ou o que poderia melhorar"
          value={texto}
          onChangeText={setTexto}
          multiline
          height={122}
          style={{ marginTop: 20 }}
        />
      </ScrollView>

      <BottomActions>
        <Button label="Enviar feedback" onPress={nav.back} />
      </BottomActions>
    </Screen>
  );
}
