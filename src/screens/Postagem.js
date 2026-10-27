import { useState } from 'react';
import { Modal, Pressable, ScrollView, TextInput, View } from 'react-native';
import { colors, type } from '../theme';
import { Avatar, ConfirmDialog, IconButton, PhotoBox, Screen, TopBar, Txt } from '../ui';
import { EllipsisVertical, Heart, MessageSquare, Pencil, Send, Share, Trash } from '../icons';

export default function Postagem({ nav, params, data, setData }) {
  const post = data.posts.find((p) => p.id === params.id) || data.posts[0];
  const [menu, setMenu] = useState(false);
  const [confirm, setConfirm] = useState(null); // 'post' | id do comentário
  const [text, setText] = useState('');
  const meta = post.where ? `${post.time} · ${post.where}` : post.time;

  function sendComment() {
    if (!text.trim()) return;
    const comment = { id: 'c' + Date.now(), author: 'Você', initials: 'S', time: 'agora', text: text.trim(), mine: true };
    setData((d) => ({ ...d, comments: [...d.comments, comment] }));
    setText('');
  }

  function confirmDelete() {
    if (confirm === 'post') {
      setData((d) => ({ ...d, posts: d.posts.filter((p) => p.id !== post.id) }));
      setConfirm(null);
      nav.back();
    } else {
      setData((d) => ({ ...d, comments: d.comments.filter((c) => c.id !== confirm) }));
      setConfirm(null);
    }
  }

  return (
    <Screen>
      <TopBar title="Postagem" onBack={nav.back}>
        <IconButton icon={EllipsisVertical} onPress={() => setMenu(true)} />
      </TopBar>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <View style={{ height: 40, flexDirection: 'row', alignItems: 'center' }}>
          <Avatar letter={post.initials} size={40} textSize={post.initials.length > 1 ? 14 : 16} />
          <View style={{ marginLeft: 12 }}>
            <Txt v="item">{post.author}</Txt>
            <Txt v="caption" color={colors.textVariant}>
              {meta}
            </Txt>
          </View>
        </View>

        {post.photo ? <PhotoBox iconSize={40} style={{ height: 200, marginTop: 16 }} /> : null}

        <Txt v="body" style={{ marginTop: 16 }}>
          {post.text}
        </Txt>

        <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, marginTop: 12 }}>
          <Heart size={20} color={colors.textVariant} style={{ marginLeft: 2 }} />
          <Txt v="item" color={colors.textVariant} style={{ marginLeft: 8 }}>
            {post.likes}
          </Txt>
          <MessageSquare size={20} color={colors.textVariant} style={{ marginLeft: 27 }} />
          <Txt v="item" color={colors.textVariant} style={{ marginLeft: 8 }}>
            {post.comments}
          </Txt>
        </View>

        <Txt v="sectionTitle" style={{ marginTop: 16 }}>
          Comentários
        </Txt>

        <View style={{ marginTop: 18, gap: 17 }}>
          {data.comments.map((c) => (
            <View key={c.id} style={{ flexDirection: 'row' }}>
              <Avatar letter={c.initials} size={32} textSize={c.initials.length > 1 ? 12 : 14} />
              <View style={{ flex: 1, marginLeft: 12, marginTop: -1 }}>
                <Txt v="bodyMedium">
                  {c.author}
                  <Txt v="body" color={colors.textVariant}>
                    {' · '}
                    {c.time}
                  </Txt>
                </Txt>
                <Txt v="body">{c.text}</Txt>
              </View>
              {c.mine ? (
                <Pressable onPress={() => setConfirm(c.id)} style={{ width: 40, alignItems: 'flex-end', paddingTop: 2 }}>
                  <Trash size={20} color={colors.textVariant} />
                </Pressable>
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Campo de comentário */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 16, paddingTop: 8, gap: 8 }}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Adicionar comentário"
          placeholderTextColor={colors.placeholder}
          onSubmitEditing={sendComment}
          style={[type.item, { flex: 1, height: 56, borderRadius: 28, borderWidth: 1, borderColor: colors.outline, paddingHorizontal: 20, color: colors.text, outlineStyle: 'none' }]}
        />
        <Pressable onPress={sendComment} style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
          <Send size={24} color={colors.white} style={{ marginLeft: -2, marginTop: 2 }} />
        </Pressable>
      </View>

      {/* Menu da postagem */}
      <Modal transparent visible={menu} animationType="fade" onRequestClose={() => setMenu(false)}>
        <Pressable style={{ flex: 1, backgroundColor: colors.scrim }} onPress={() => setMenu(false)}>
          <View
            style={{
              position: 'absolute',
              top: 56,
              right: 8,
              width: 220,
              paddingVertical: 8,
              borderRadius: 12,
              backgroundColor: colors.dialog,
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
              elevation: 4,
            }}
          >
            <MenuItem icon={Pencil} label="Editar" onPress={() => { setMenu(false); nav.go('NovaPostagem', { id: post.id }); }} />
            <MenuItem icon={Share} label="Compartilhar" onPress={() => setMenu(false)} />
            <MenuItem icon={Trash} label="Excluir postagem" color={colors.error} onPress={() => { setMenu(false); setConfirm('post'); }} />
          </View>
        </Pressable>
      </Modal>

      <ConfirmDialog
        visible={confirm === 'post'}
        title="Excluir postagem?"
        message="A postagem e os comentários dela serão removidos da comunidade."
        confirmLabel="Excluir postagem"
        onCancel={() => setConfirm(null)}
        onConfirm={confirmDelete}
      />
      <ConfirmDialog
        visible={confirm !== null && confirm !== 'post'}
        title="Excluir comentário?"
        onCancel={() => setConfirm(null)}
        onConfirm={confirmDelete}
      />
    </Screen>
  );
}

function MenuItem({ icon: Icon, label, color = colors.text, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ height: 48, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
      <Icon size={24} color={color === colors.text ? colors.textVariant : color} />
      <Txt v="item" color={color} style={{ marginLeft: 12 }}>
        {label}
      </Txt>
    </Pressable>
  );
}
