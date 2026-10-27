import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { Avatar, Button, Screen, TopBar, Txt } from '../ui';
import { MessageSquare, Users } from '../icons';

export default function Grupo({ nav, params, data, setData }) {
  const group = data.groups.find((g) => g.id === params.id) || data.groups[0];
  const posts = data.posts.filter((p) => p.group === group.name && p.feed === 'geral');

  function join() {
    setData((d) => ({ ...d, groups: d.groups.map((g) => (g.id === group.id ? { ...g, member: !g.member } : g)) }));
  }

  return (
    <Screen>
      <TopBar title="Grupo" onBack={nav.back} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center' }}>
            <Users size={32} color={colors.primary} />
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Txt v="screenTitle">{group.name}</Txt>
            <Txt v="body" color={colors.textVariant}>
              {group.members} membros
            </Txt>
          </View>
        </View>

        <Txt v="body" style={{ marginTop: 16 }}>
          {group.about}
        </Txt>

        <Button label={group.member ? 'Sair do grupo' : 'Entrar no grupo'} kind={group.member ? 'tonal' : 'filled'} onPress={join} style={{ marginTop: 16 }} />

        <Txt v="sectionTitle" style={{ marginTop: 19 }}>
          Últimas postagens
        </Txt>

        <View style={{ marginTop: 16, gap: 16 }}>
          {posts.map((post) => (
            <Pressable key={post.id} onPress={() => nav.go('Postagem', { id: post.id })} style={{ backgroundColor: colors.surfaceHigh, borderRadius: 16, paddingHorizontal: 16, paddingTop: 16, paddingBottom: post.mine ? 12 : 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Avatar letter={post.initials} size={40} textSize={post.initials.length > 1 ? 14 : 16} />
                <View style={{ marginLeft: 12 }}>
                  <Txt v="item">{post.author}</Txt>
                  <Txt v="caption" color={colors.textVariant}>
                    {post.time}
                  </Txt>
                </View>
              </View>
              <Txt v="body" style={{ marginTop: 12 }}>
                {post.text}
              </Txt>
              {post.mine ? (
                <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                  <MessageSquare size={20} color={colors.textVariant} style={{ marginLeft: 2 }} />
                  <Txt v="body" color={colors.textVariant} style={{ marginLeft: 8 }}>
                    {post.comments} comentários
                  </Txt>
                </View>
              ) : null}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
