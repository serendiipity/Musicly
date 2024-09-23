import React from 'react';
import { View, Button, Text, Alert } from 'react-native';

const RoomManager = ({ hostUserId }) => {
	const hostRoom = () => {
		Alert.alert("Hosting Room", `User with ID ${hostUserId} is hosting`);
	};

	const joinRoom = () => {
		Alert.alert("joining room", "you are joining a room");
	};

	return (
		<View>
			<Text>Welcome {hostUserId}</Text>
			<Button title="host room" onPress={hostRoom} />
			<Button title="join room" onPress={joinRoom} />
		</View>
	);
};

export default RoomManager;