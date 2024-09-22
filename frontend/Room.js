import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Room = ({ roomCode, isHosting, hoserUserId }) => {
	return (
		<View style={styles.container}>
			<Text>Room Code: {roomCode}</Text>
			{isHosting ? (
				<Text>You are hosting the room as {hostUserId}.</Text>
			) : (
				<Text>You are joining the room as {hostUserId}.</Text>
			)}
		</View>
	);	
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Room;