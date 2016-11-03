'use strict'
import React, {Component} from 'react';
import {
	View,
	Text,
	TextInput,
	Image,
	StyleSheet,
	Alert,
	Platform,
	TouchableNativeFeedback
} from 'react-native';
import { searchYouTubeAPI } from '../actions/youTubeActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button';

class Search extends Component {
	constructor(props) {
	  super(props);
	  this.state = { keyword: "" };
	}

	handleSubmit(event) {
		if(this.state.keyword==="")
			Alert.alert("Please enter something to search.");
		else{
			this.props.actions(this.state.keyword);
			this.props.navigator.push({
			  title: 'searchResult',
			  id : 'searchResult',
			});
		}

	}

	render() {
		return (
			<View style={styles.container}>
				<Image
					style={styles.logo}
					source={require('../images/youtube-logo.png')} />
				<View style={styles.search}>	
					<TextInput
						style={styles.searchInput}
						value={this.state.keyword}
						onChangeText={(keyword) => this.setState({keyword})}
						onSubmitEditing={this.handleSubmit.bind(this)}
						placeholder="Search for videos" />	
					<Button  background={(Platform.OS === 'android') ? 
							TouchableNativeFeedback.Ripple('#f39c12', true) : null} 
							style={styles.searchButton}
							onPress={this.handleSubmit.bind(this)}>
						<Image
						  	style={styles.icon}
						  	source={require('../images/search.png')} />
					</Button>
				</View>	
			</View>
		)
	}
}



var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#F1F1F1',
		paddingTop: 100,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20
	},
	search: {
		flex: 1,
		flexDirection: 'row',
		alignSelf: 'center'
	},
	searchButton: {
		borderColor: 'transparent',
		backgroundColor: '#ffffff',
		borderRadius: 0,
		borderWidth: 3,
		padding:10,
		height: 60,
	},
	logo: {
		width: 250,
		height: 150,
		alignSelf: 'center'
	},
	searchInput: {
		backgroundColor: '#ffffff',
		height: 60,
		padding: 10,
		borderWidth: 3,
		borderColor: '#cccccc',
		borderRadius: 0,
		flex:1,
	},
	icon: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		height: 30,
		width: 30
	}
})

export default connect(null,
  (dispatch) => ({
    actions: bindActionCreators(searchYouTubeAPI, dispatch)
  })
)(Search);
