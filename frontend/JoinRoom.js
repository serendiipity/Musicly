import React, { useState } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import { firestore } from './firebaseConfig';

const JoinRoom = ({ onBack, onRoomJoined }) => {
	const [roomId, setRoomId] = useState('');

	const handleJoinRoom = async () => {
		try {
			const roomRef = firestore.collection('rooms').doc(roomId);
			const roomDoc = await roomRef.get();
			if (roomDoc.exists) {
				Alert.alert('success', `you have joined room ${roomId}`);
				onRoomJoined(roomId);
			} else {
				Alert.alert('error', 'room not found');
			}
		} catch (error) {
			Alert.alert('error', `unable to join room ${error.message}`);
		}
	};

	return (
		<View>
			<TextInput
				placeholder="Enter room ID"
				value={roomId}
				onChangeText={setRoomId}
				style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
			/>
			<Button title="Join room" onPress={handleJoinRoom} />
			<Button title="Back" onPress={onBack} />
		</View>
	);
};

export default JoinRoom;
