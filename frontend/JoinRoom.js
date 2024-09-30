import React from 'react';
import { View, Text, Button } from 'react-native';

const JoinRoom = ({ onBack }) => {
	const handleJoinRoom = () => {
		console.log('Room joined');
	};

	return (
		<View>
			<Text>Join room</Text>
			<Button title="Join" onPress={handleJoinRoom} />
			<Button title="Back" onPress={onBack} />
		</View>
	);
};

export default JoinRoom;
