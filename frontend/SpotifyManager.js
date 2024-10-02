import React, { useState, useEffect } from 'react';
import { View, Button, Alert, FlatList, TextInput, Text, StyleSheet } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
	authorizationEndpoint: 'https://accounts.spotify.com/authorize',
	tokenEndpoint: 'https://accounts.spotify.com/api/token',
	revocationEndpoint: 'https://accounts.spotify.com/revoke',
};

const CLIENT_ID = 'd11889cf108049eaa3a7e633b8623992';

const SpotifyManager = ({ onSongAdded }) => {
	const [accessToken, setAccessToken] = useState(null);
	const [searchResults, setSearchResults] = useState([]);
	const [songInput, setSongInput] = useState('');

	const redirectUri = AuthSession.makeRedirectUri({
		useProxy:true,
	});

	console.log("Redirect URI:", redirectUri);

	const [request, response, promptAsync] = AuthSession.useAuthRequest(
		{
			clientId: CLIENT_ID,
			scopes: ['user-library-read', 'user-library-modify'],
			redirectUri,
			responseType: AuthSession.ResponseType.Token,
		},
		discovery
	);

	useEffect(() => {
		if  (response?.type === 'success') {
			const { access_token } = response.params;
			setAccessToken(access_token);
			Alert.alert('Success', 'you are authenticated with spotify');
		}
	}, [response]);

	const handleSpotifyAuth = () => {
		promptAsync();
	};

	const searchSongs = async () => {
		if (!accessToken) {
			Alert.alert('error', 'please authenticate with spotify first');
			return;
		}

		if (!songInput) {
			Alert.alert('error', 'please enter a song title');
			return;
		}

		try {
			const response = await fetch(
				`https://api.spotify.com/v1/search?q=${encodeURIComponent(songInput)}&type=track`, 
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const data = await response.json();
			setSearchResults(data.tracks.items);
		} catch (error) {
			Alert.alert('error', `unable to search songs: ${error.message}`);
		}
	};

	const addSongFromSearch = async (song) => {
		onSongAdded({ title: song.name, id: song.id });
		setSearchResults([]);
	};

	return (
		<View>
			<Button title="authenticate with spotify" onPress={handleSpotifyAuth} />
			<Button title="Search" onPress={searchSongs} />
			<TextInput
				placeholder="search for a song"
				value={songInput}
				onChangeText={setSongInput}
				style={{ borderWidth: 1, marginBottom: 140, padding: 5 }}
			/>
			<FlatList
				data={searchResults}
				renderItem={({ item }) => (
					<View>
						<Text>{item.name} - {item.artists.map(artist => artist.name).join(', ')}</Text>
						<Button title="add to playlist" onPress={() => addSongFromSearch(item)} />
					</View>
				)}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.listPadding}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	listPadding: {
		paddingBottom: 100,
	},
});

export default SpotifyManager;