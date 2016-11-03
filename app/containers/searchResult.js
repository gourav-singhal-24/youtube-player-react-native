'use strict'
import React, {Component} from 'react';
import {
	View,
	ListView,
	StyleSheet,
	TextInput,
	Image,
	Platform,
	TouchableNativeFeedback,
	ScrollView,
	Text,
	ActivityIndicatorIOS,
	ProgressBarAndroid
} from 'react-native';
import { RootContainer } from 'react-relay'
import * as RelayComponent from './relayComponent';
import { connect } from 'react-redux';
import { playVideo, searchYouTubeAPI, addToFavourites } from '../actions/youTubeActions';
import {bindActionCreators} from 'redux';
import Button from 'apsl-react-native-button';

class SearchResult extends Component {
	constructor(props) {
	  super(props);
	  this.state = { keyword: "" };
	}

	handleSubmit(event) {
		if(this.state.keyword==="")
			Alert.alert("Please enter something to search.");
		else{
			this.props.searchYouTubeAPI(this.state.keyword);
			this.props.navigator.replace({
			  title: 'searchResult',
			  id : 'searchResult',
			});
		}

	}

	render() {

		let { UserRoute, UserInfo } = RelayComponent;
		let { searchKeyword } = this.props.videoDetails;
		return (
			<View style={styles.container}>	
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
				<RootContainer
				  Component={UserInfo}
				  route={new UserRoute({Keyword: searchKeyword})}
				  renderLoading={function() {
				    if (Platform.OS === 'ios')
				      return (
				        <View style={styles.loader}>  
				              <ActivityIndicatorIOS
				                style={{height: 80}}
				                size="large"/> 
				        </View>
				    )
				    else
				      return (
				        <View style={styles.loader}>  
				              <ProgressBarAndroid color="gray"/>
				        </View>
				    )
				  }}
				  renderFetched={(data) => <ScrollView><UserInfo {...this.props} {...data} /></ScrollView>}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F1F1F1',
	},
	loader:{
		flexDirection:'row',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf:'center'
	},
	search:{
		flexDirection: 'row',
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
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
	searchButton: {
		borderColor: 'transparent',
		backgroundColor: '#ffffff',
		borderRadius: 0,
		borderWidth: 3,
		padding:10,
		height: 60,
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

export default connect(state => ({
	  videoDetails: state.videoDetails
	}),
	(dispatch) => ({
	  playVideo: bindActionCreators(playVideo, dispatch),
	  searchYouTubeAPI: bindActionCreators(searchYouTubeAPI, dispatch),
	  addToFavourites: bindActionCreators(addToFavourites, dispatch)
	})
)(SearchResult);