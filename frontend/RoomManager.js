import React, { useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

const RoomManager = ({ hostUserId }) => {
	const [isCreatingRoom, setIsCreatingRoom] = useState(false);
	const [isJoiningRoom, setIsJoiningRoom] = useState(false);

	const hostRoom = () => {
		setIsCreatingRoom(true);
		Alert.alert("Hosting Room", `User with ID ${hostUserId} is hosting`);
	};

	const joinRoom = () => {
		setIsJoiningRoom(true);
		Alert.alert("joining room", "you are joining a room");
	};

	const handleBack = () => {
		setIsCreatingRoom(false);
		setIsJoiningRoom(false);
	};

	return (
		<View>
			{isCreatingRoom ? (
				<CreateRoom hostUserId={hostUserId} onBack={handleBack} />
			) : isJoiningRoom ? (
				<JoinRoom onBack={handleBack} />
			) : (
				<>
					<Text>Welcome {hostUserId}</Text>
					<Button title="host room" onPress={hostRoom} />
					<Button title="join room" onPress={joinRoom} />
				</>
			)}
		</View>
	);
};

export default RoomManager;