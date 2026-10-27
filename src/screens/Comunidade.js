import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { Avatar, BottomNav, Chip, ChipRow, Fab, IconButton, PhotoBox, Screen, TopBar, Txt } from '../ui';
import { Heart, MessageSquare, Plus, Search, User, Users } from '../icons';

const FILTERS = ['Todos', 'Cachorros', 'Gatos', 'Eventos'];

export default function Comunidade({ nav, params, data }) {
  const [tab, setTab] = useState(params.tab || 'geral');
  const [filter, setFilter] = useState('Todos');
  const posts = data.posts.filter((p) => p.feed === tab);

  return (
    <Screen bottomBg={colors.surfaceHigh}>
      <TopBar title="Comunidade">
        <IconButton icon={Users} onPress={() => nav.go('Grupos')} />
        <IconButton icon={Search} />
      </TopBar>

      {/* Abas */}
      <View style={{ flexDirection: 'row', height: 48 }}>
        <TabButton label="Geral" on={tab === 'geral'} onPress={() => setTab('geral')} />
        <TabButton label="Meus grupos" on={tab === 'grupos'} onPress={() => setTab('grupos')} />
      </View>
      <View style={{ height: 1, backgroundColor: colors.divider }} />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 16, paddingBottom: 96 }}>
        {tab === 'geral' ? (
          // a fileira de filtros fica recortada pela borda, como no PDF
          <ChipRow height={31} style={{ marginBottom: 16, overflow: 'hidden' }}>
            {FILTERS.map((f) => (
              <Chip key={f} label={f} selected={filter === f} onPress={() => setFilter(f)} />
            ))}
          </ChipRow>
        ) : null}

        <View style={{ paddingHorizontal: 16, gap: 16 }}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} showGroup={tab === 'grupos'} photoHeight={tab === 'grupos' ? 120 : 148} onPress={() => nav.go('Postagem', { id: post.id })} />
          ))}
        </View>
      </ScrollView>

      <View>
        <Fab icon={Plus} label="Postar" onPress={() => nav.go('NovaPostagem')} />
      </View>
      <BottomNav active="Comunidade" nav={nav} />
    </Screen>
  );
}

function TabButton({ label, on, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Txt v="bodyMedium" color={on ? colors.primary : colors.textVariant} style={{ marginTop: 0 }}>
        {label}
      </Txt>
      {on ? <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, backgroundColor: colors.primary }} /> : null}
    </Pressable>
  );
}

export function PostCard({ post, showGroup, photoHeight = 148, onPress }) {
  const meta = post.where ? `${post.time} · ${post.where}` : post.time;
  return (
    <Pressable onPress={onPress} style={{ backgroundColor: colors.surfaceHigh, borderRadius: 16, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
      {showGroup ? (
        <View style={{ height: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <User size={16} color={colors.primary} />
          <Txt v="bodyMedium" color={colors.primary} style={{ marginLeft: 6, fontSize: 12, lineHeight: 16, letterSpacing: 0.1 }}>
            {post.group}
          </Txt>
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar letter={post.initials} size={40} textSize={post.initials.length > 1 ? 14 : 16} />
        <View style={{ marginLeft: 12 }}>
          <Txt v="item">{post.author}</Txt>
          <Txt v="caption" color={colors.textVariant}>
            {meta}
          </Txt>
        </View>
      </View>

      <Txt v="body" style={{ marginTop: 12 }}>
        {post.text}
      </Txt>

      {post.photo ? <PhotoBox iconSize={32} style={{ height: photoHeight, marginTop: 12 }} /> : null}

      <View style={{ height: 48, flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
        <Heart size={20} color={colors.textVariant} style={{ marginLeft: 2 }} />
        <Txt v="body" color={colors.textVariant} style={{ marginLeft: 8 }}>
          {post.likes}
        </Txt>
        <MessageSquare size={20} color={colors.textVariant} style={{ marginLeft: 30 }} />
        <Txt v="body" color={colors.textVariant} style={{ marginLeft: 8 }}>
          {post.comments}
        </Txt>
      </View>
    </Pressable>
  );
}
