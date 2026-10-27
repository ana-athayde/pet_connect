import { useRef, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { colors, type } from '../theme';
import { Avatar, IconButton, Screen, Txt } from '../ui';
import { ChevronLeft, EllipsisVertical, Send } from '../icons';

export default function Tutor({ nav, data, setData }) {
  const [text, setText] = useState('');
  const scroll = useRef(null);

  function send() {
    if (!text.trim()) return;
    const msg = { id: 'm' + Date.now(), me: true, text: text.trim() };
    setData((d) => ({ ...d, messages: [...d.messages, msg] }));
    setText('');
  }

  return (
    <Screen>
      {/* Cabeçalho da conversa */}
      <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', paddingRight: 4 }}>
        <Pressable onPress={nav.back} style={{ width: 48, height: 48, marginLeft: 3, marginRight: 5, alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={30} color={colors.textVariant} strokeWidth={1.6} />
        </Pressable>
        <Avatar letter="T" size={40} />
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Txt v="itemMedium">Tutor</Txt>
          <Txt v="caption" color={colors.textVariant}>
            Online agora
          </Txt>
        </View>
        <IconButton icon={EllipsisVertical} />
      </View>
      <View style={{ height: 1, backgroundColor: colors.divider }} />

      <ScrollView
        ref={scroll}
        onContentSizeChange={() => scroll.current && scroll.current.scrollToEnd({ animated: false })}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, gap: 12 }}
      >
        <Txt v="caption" color={colors.textVariant} style={{ alignSelf: 'center', marginTop: 16, marginBottom: 0 }}>
          Hoje
        </Txt>
        {data.messages.map((m) => (
          <View
            key={m.id}
            style={{
              alignSelf: m.me ? 'flex-end' : 'flex-start',
              maxWidth: 261,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 16,
              borderTopRightRadius: m.me ? 4 : 16,
              backgroundColor: m.me ? colors.primaryContainer : colors.surfaceHigh,
            }}
          >
            <Txt v="body" color={m.me ? colors.onPrimaryContainer : colors.text}>
              {m.text}
            </Txt>
          </View>
        ))}
      </ScrollView>

      <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24, gap: 8 }}>
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={send}
          placeholder="Digite uma mensagem"
          placeholderTextColor={colors.textVariant}
          style={[type.item, { flex: 1, height: 56, borderRadius: 28, backgroundColor: colors.searchField, paddingHorizontal: 20, color: colors.text, outlineStyle: 'none' }]}
        />
        <Pressable
          onPress={send}
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          }}
        >
          <Send size={20} color={colors.white} style={{ marginLeft: -2, marginTop: 2 }} />
        </Pressable>
      </View>
    </Screen>
  );
}
