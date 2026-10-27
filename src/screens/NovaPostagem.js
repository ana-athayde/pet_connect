import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { Avatar, BottomActions, Button, Chip, ChipWrap, Field, Screen, TopBar, Txt } from '../ui';
import { Camera } from '../icons';

const WHERE = ['Comunidade', 'Cachorros da vizinhança', 'Dúvida'];

export default function NovaPostagem({ nav, params, data, setData }) {
  const editing = data.posts.find((p) => p.id === params.id);
  const [text, setText] = useState(editing ? editing.text : '');
  const [where, setWhere] = useState('Comunidade');

  function publish() {
    if (editing) {
      setData((d) => ({ ...d, posts: d.posts.map((p) => (p.id === editing.id ? { ...p, text } : p)) }));
    } else if (text.trim()) {
      const post = {
        id: 'p' + Date.now(),
        author: data.tutor.name,
        initials: 'S',
        time: 'agora',
        where: where === 'Dúvida' ? 'Dúvida' : null,
        text: text.trim(),
        photo: false,
        likes: 0,
        comments: 0,
        group: where === 'Cachorros da vizinhança' ? where : 'Cachorros da vizinhança',
        feed: where === 'Cachorros da vizinhança' ? 'grupos' : 'geral',
        mine: true,
      };
      setData((d) => ({ ...d, posts: [post, ...d.posts] }));
    }
    nav.back();
  }

  return (
    <Screen>
      <TopBar title="Nova postagem" onBack={nav.back} close />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
        <View style={{ height: 40, flexDirection: 'row', alignItems: 'center' }}>
          <Avatar letter="S" size={40} />
          <Txt v="itemMedium" style={{ marginLeft: 10 }}>
            {data.tutor.name}
          </Txt>
        </View>

        <Field label="O que você quer compartilhar?" placeholder="Conte como foi o dia da Luna" value={text} onChangeText={setText} multiline height={162} style={{ marginTop: 24 }} />

        <Pressable
          style={{
            alignSelf: 'flex-start',
            height: 44,
            marginTop: 20,
            borderRadius: 8,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.outline,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 12,
            paddingRight: 16,
          }}
        >
          <Camera size={20} color={colors.textVariant} />
          <Txt v="bodyMedium" color={colors.textVariant} style={{ marginLeft: 12 }}>
            Adicionar foto
          </Txt>
        </Pressable>

        <Txt v="label" color={colors.textVariant} style={{ marginTop: 20 }}>
          Publicar em
        </Txt>
        <ChipWrap style={{ marginTop: 8 }}>
          {WHERE.map((w) => (
            <Chip key={w} label={w} selected={where === w} onPress={() => setWhere(w)} />
          ))}
        </ChipWrap>
      </ScrollView>

      <BottomActions>
        <Button label="Publicar" onPress={publish} />
      </BottomActions>
    </Screen>
  );
}
