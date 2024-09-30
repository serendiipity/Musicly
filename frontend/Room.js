import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { firestore } from './firebaseConfig';

const Room = ({ roomId, onLeave }) => {
	const [playlist, setPlaylist] = React.useState([]);

	React.useEffect(() => {
		const fetchPlaylist = async () => {
			const roomRef = firestore.collection('rooms').doc(roomId);
			const roomDoc = await roomRef.get();
			if (roomDoc.exists) {
				setPlaylist(roomDoc.data().playlist || []);
			}
		};

		fetchPlaylist();
	}, [roomId]);

	const renderItem = ({ item }) => (
		<Text>{item.title}</Text>
	);

	return (
		<View>
			<Text>Room ID: {roomId}</Text>
			<FlatList
				data={playlist}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
			<Button title="Leave Room" onPress={onLeave} />
		</View>
	);
};

export default Room;