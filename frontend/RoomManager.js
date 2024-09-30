import React, { useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import Room from './Room';

const RoomManager = ({ hostUserId }) => {
	const [isCreatingRoom, setIsCreatingRoom] = useState(false);
	const [isJoiningRoom, setIsJoiningRoom] = useState(false);
	const [currentRoomId, setCurrentRoomId] = useState(null);

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
		setCurrentRoomId(null);
	};

	const handleCreateRoom = (roomId) => {
		setCurrentRoomId(roomId);
		setIsCreatingRoom(false);
	}

	const handleJoinRoom = (roomId) => {
		setCurrentRoomId(roomId);
		setIsJoiningRoom(false);
	}

	const handleLeaveRoom = () => {
		setCurrentRoomId(null);
	}

	return (
		<View>
			{currentRoomId ? (
				<Room roomId={currentRoomId} onLeave={handleLeaveRoom} />
			) :	isCreatingRoom ? (
				<CreateRoom hostUserId={hostUserId} onBack={handleBack} onRoomCreated={handleCreateRoom}/>
			) : isJoiningRoom ? (
				<JoinRoom onBack={handleBack} onRoomJoined={handleJoinRoom}/>
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