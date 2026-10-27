import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { colors } from '../theme';
import { Button, Field, Screen, Txt } from '../ui';
import { Eye, Paw } from '../icons';

export default function Login({ nav }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <Screen>
      <View style={{ flex: 1, paddingHorizontal: 24, alignItems: 'center' }}>
        <View style={{ marginTop: 106, width: 88, height: 88, borderRadius: 28, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
          <Paw size={46} color={colors.white} />
        </View>

        <Txt v="headline" style={{ marginTop: 16, textAlign: 'center' }}>
          Bem-vindo ao{'\n'}PetConnect
        </Txt>
        <Txt v="body" color={colors.textVariant} style={{ marginTop: 4 }}>
          Mais conexão. Mais cuidado.
        </Txt>

        <Field label="E-mail" placeholder="nome@exemplo.com" value={email} onChangeText={setEmail} keyboardType="email-address" style={{ alignSelf: 'stretch', marginTop: 32 }} />
        <Field label="Senha" placeholder="Sua senha" value={senha} onChangeText={setSenha} secure right={Eye} style={{ alignSelf: 'stretch', marginTop: 20 }} />

        <Pressable style={{ alignSelf: 'flex-end', height: 40, justifyContent: 'center', paddingHorizontal: 12, marginTop: 16 }}>
          <Txt v="bodyMedium" color={colors.primary}>
            Esqueci a senha
          </Txt>
        </Pressable>

        <Button label="Entrar" onPress={() => nav.tab('Inicio')} style={{ alignSelf: 'stretch', marginTop: 16 }} />
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 32, alignItems: 'center' }}>
        <Txt v="body" color={colors.textVariant}>
          Ainda não tem conta?
        </Txt>
        <Button label="Criar conta" kind="tonal" onPress={() => nav.go('CadastroTutor')} style={{ alignSelf: 'stretch', marginTop: 4 }} />
      </View>
    </Screen>
  );
}
