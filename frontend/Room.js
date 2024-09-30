import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, Alert } from 'react-native';
import { firestore, FieldValue } from './firebaseConfig';

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

	const addSongToPlaylist = async () => {
		if (!songInput) {
			Alert.alert('error', 'please enter a song title');
			return;
		}

		const newSong = {title: songInput, id: Date.now().toString() };
		const roomRef = firestore.collection('rooms').doc(roomId);

		try {
			await roomRef.update({
				playlist: FieldValue.arrayUnion(newSong),
			});
			setPlaylist((prev) => [...prev, newSong]);
			setSongInput('');
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
			<TextInput
				placeholder="Enter song title"
				value={songInput}
				onChangeText={setSongInput}
				style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
			/>
			<Button title="Add song" onPress={addSongToPlaylist} />
			<Button title="Leave Room" onPress={onLeave} />
		</View>
	);
};

export default Room;