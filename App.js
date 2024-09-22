import React, { useState } from 'react';
import { StyleSheet, Text, View , TextInput, Button } from 'react-native';
import Room from './Room';

export default function App() {
  const [hostUserId, setHostUserId] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [isHosting, setIsHosting] = useState(null);
  const [joined, setJoined] = useState(false);

  const createRoom = async () => {
    try {
      const response = await fetch('http://localhost:8081/createRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hostUserId })
      });
      const data = await response.json();
      setRoomCode(data.roomId);
      setJoined(true);
      setIsHosting(true);
    } catch (error) {
      console.error(error);
    }
  };

  const joinRoom = async () => {
    try {
      await fetch('http://localhost:8081/joinRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roomId: roomCode, userId: hostUserId })
      });
      setJoined(true);
      setIsHosting(false);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      <Text>Musicly Yours</Text>
      {!joined ? (
        <View>
          {isHosting === null && (
            <View>
              <Button title="Host Room" onPress={() => setIsHosting(true)} />
              <Button title="Join Room" onPress={() => setIsHosting(false)} />
            </View>
          )}
          {isHosting === true && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Enter User ID"
                value={hostUserId}
                onChangeText={setHostUserId}
              />
              <Button title="Create Room" onPress={createRoom} />
              {roomCode && <Text>Room Code: {roomCode}</Text>}
            </View>
          )}
          {isHosting === false && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Enter Room Code"
                value={roomCode}
                onChangeText={setRoomCode}
              />
              <Button title="Join Room" onPress={joinRoom} />
            </View>
          )}
        </View>
      ) : (
        <Room roomCode={roomCode} isHosting={false} hostUserId={hostUserId} />
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
  }
});
