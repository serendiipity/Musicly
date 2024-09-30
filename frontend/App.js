import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import RoomManager from './RoomManager';
import { firebase } from './firebaseConfig';

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const signUp = async () => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      setUser(userCredential.user);
      setEmail('');
      setPassword('');
      Alert.alert("you have successfully signed up");
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      
      setUser(userCredential.user);
      setEmail('');
      setPassword('');
      Alert.alert("you have successfully signed in");
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {!user ? (
        <View>
          <Text>Hello world</Text>
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
          <Button title="Sign Up" onPress={signUp} />
          <Button title="Sign In" onPress={signIn} />
        </View>
      ) : (
        <RoomManager hostUserId={user.uid} />

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
});
