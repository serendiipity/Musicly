import React, { useState } from 'react';
import { StyleSheet, Text, View , TextInput, Button } from 'react-native';

export default function App() {
  const [hostUserId, setHostUserId] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [isHost, setIsHost] = useState(false);

  const createRoom = async () => {

  };

  const joinRoom = async () => {

  };


  return (
    <View style={styles.container}>
      <Text>Musicly Yours</Text>
      <TextInput
        style ={styles.input}
        placeholder="Enter User ID"
        value={hostUserId}
        onChangeText={setHoserUserId}
      />
      {roomCode ? (
        <Room roomCode={roomCode} isHost={isHost} hostUserId={hostUserId} />
      ) : (
        <View>
          <Button title="Create Room" onPress={createRoom} />
          <TextInput
            style={styles.input}
            placeholder="Room Code"
            value={roomCode}
            onChangeText={setRoomCode}
          />
          <Button title="Join Room" onPress={joinRoom} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16
  }
});
