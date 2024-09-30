import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { firestore } from './firebaseConfig';
import { serverTimestamp } from 'firebase/firestore';

const CreateRoom = ({ hostUserId, onBack }) => {
	const handleCreateRoom = async () => {
		try {
			const newRoomRef = firestore.collection('rooms').doc();
			await newRoomRef.set({
				hostUserId,
				createdAt: serverTimestamp(),
			});
			Alert.alert('Room created', `Room ID: ${newRoomRef.id}`);
		} catch (error) {
			Alert.alert('error', `unable to create room ${error.message}`);
		}
	};

	return (
		<View>
			<Text>Create Room as user {hostUserId}</Text>
			<Button title="Create" onPress={handleCreateRoom} />
			<Button title="Back" onPress={onBack} />
		</View>
	);
};

export default CreateRoom;