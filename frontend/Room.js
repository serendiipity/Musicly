import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, Alert } from 'react-native';
import { firestore, FieldValue } from './firebaseConfig';
import SpotifyManager from './SpotifyManager';

const Room = ({ roomId, onLeave }) => {
	const [playlist, setPlaylist] = React.useState([]);
	const [songInput, setSongInput] = useState('');

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

	const addSongToPlaylist = async (newSong) => {
		const roomRef = firestore.collection('rooms').doc(roomId);

		try {
			await roomRef.update({
				playlist: FieldValue.arrayUnion(newSong),
			});
			setPlaylist((prev) => [...prev, newSong]);
		} catch (error) {
			Alert.alert('error', `unable to add song ${error.message}`);
		}
	};

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
			<SpotifyManager onSongAdded={addSongToPlaylist} />
			<Button title="Leave Room" onPress={onLeave} />
		</View>
	);
};

export default Room;