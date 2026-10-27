import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { Button, Screen, Tag, Txt } from '../ui';
import { ChevronLeft, Clock, Cup, MapPin, Pad, Plus } from '../icons';

const BIG_ICONS = { pad: Pad, cup: Cup, plus: Plus };

export default function Local({ nav, params, data }) {
  const place = data.places.find((p) => p.id === params.id) || data.places[1];
  const [saved, setSaved] = useState(false);
  const Icon = BIG_ICONS[place.icon];

  return (
    <Screen>
      <ScrollView style={{ flex: 1 }}>
        <Hero onBack={nav.back}>
          <Icon size={64} color={colors.photoIcon} strokeWidth={1.5} />
        </Hero>

        <View style={{ paddingHorizontal: 16 }}>
          <Txt v="headline" style={{ marginTop: 24 }}>
            {place.name}
          </Txt>
          <Txt v="body" color={colors.textVariant} style={{ marginTop: 0 }}>
            {place.kind} · {place.distance} de você
          </Txt>

          <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
            {place.tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </View>

          <Txt v="body" style={{ marginTop: 16, lineHeight: 21 }}>
            {place.about}
          </Txt>

          <InfoLine icon={MapPin} text={place.address} style={{ marginTop: 19 }} />
          <InfoLine icon={Clock} text={place.hours} style={{ marginTop: 8 }} />
        </View>
      </ScrollView>

      <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingBottom: 16 }}>
        <Button label="Como chegar" style={{ flex: 1 }} />
        <Button label={saved ? 'Salvo' : 'Salvar'} kind="tonal" style={{ flex: 1 }} onPress={() => setSaved(!saved)} />
      </View>
    </Screen>
  );
}

// Foto de capa (ainda sem imagem) com botão de voltar flutuante
export function Hero({ onBack, children }) {
  return (
    <View style={{ height: 232, backgroundColor: colors.photo, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
      {children}
      <Pressable
        onPress={onBack}
        style={{
          position: 'absolute',
          left: 8,
          top: 8,
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        }}
      >
        <ChevronLeft size={30} color={colors.text} strokeWidth={1.6} />
      </Pressable>
    </View>
  );
}

function InfoLine({ icon: Icon, text, style }) {
  return (
    <View style={[{ height: 48, flexDirection: 'row', alignItems: 'center' }, style]}>
      <Icon size={22} color={colors.textVariant} style={{ marginHorizontal: 1 }} />
      <Txt v="body" style={{ marginLeft: 16 }}>
        {text}
      </Txt>
    </View>
  );
}
