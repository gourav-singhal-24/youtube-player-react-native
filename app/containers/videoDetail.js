'use strict'
import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	WebView,
	Dimensions,
	TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';

class VideoDetails extends Component {

	constructor(props) {
	  super(props);
	}

	getVideoId() {
		return this.props.videoDetails.playVideoId
	}

	getPlayer() {
		const {height, width} = Dimensions.get('window');
		const videoId = this.getVideoId()
		return `<!DOCTYPE html><html><body><iframe src='https://www.youtube.com/embed/${videoId}'
    style="width:100%; height:270px;" frameborder="0"></iframe></object></body></html>`;
	}

	render() {
		const player = this.getPlayer();

		return (
			<View style={styles.container}>
				<View style={styles.webview}>
					<WebView
						html={player}
						javaScriptEnabledAndroid={true} />
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	webview: {
		height: 290
	}
})

export default connect(state => ({
	  videoDetails: state.videoDetails
	})
)(VideoDetails);