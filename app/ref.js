import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Relay, { 
  Route,
  RootContainer,
  DefaultNetworkLayer
} from 'react-relay'


Relay.injectNetworkLayer(new DefaultNetworkLayer('http://172.18.4.101:3000/graphql'))


class UserRoute extends Route {
  static paramDefinitions = {
    userID: { required: true }
  }
  static queries = {
    user: () => Relay.QL`
      query { 
        user(keyword: $userID)
      }
    `
  }
  static routeName = 'UserRoute'
}


class UserInfo extends Component {

  renderRow(rowData) {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.rowButton}
          onPress={() => this.handleRowPress(rowData)}>
          <View style={styles.rowWrapper}>
            <Image
              style={styles.thumbnail}
              source={{uri: rowData.highThumbnail}} />
            <Text style={styles.title}>{rowData.videoTitle}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const user = this.props.user
    return (
	<View>	
    <ListView
      style={styles.items}
      dataSource={user.items}
      renderRow={this.renderRow.bind(this)} />
	</View>

    )
  }
}

UserInfo = Relay.createContainer(UserInfo, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        regionCode,
        items{
		kind,
		videoId,
		videoDescription,
		videoTitle,
		highThumbnail,
		statistics{likes,dislikes,views,comments}}
      }
    `
  }
})

class RelayApp extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <RootContainer
          Component={UserInfo}
          route={new UserRoute({userID: '1'})}
          renderFetched={(data) => <UserInfo {...this.props} {...data} />}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  items: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RelayApp', () => RelayApp)
