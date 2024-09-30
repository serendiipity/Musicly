import React from 'react';
import { View, Text, Button } from 'react-native';

const CreateRoom = ({ onBack }) => {
	const handleCreateRoom = () => {
		console.log('Room created');
	};

	return (
		<View>
			<Text>Create Room</Text>
			<Button title="Create" onPress={handleCreateRoom} />
			<Button title="Back" onPress={onBack} />
		</View>
	);
};

export default CreateRoom;