'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  BackAndroid,
  Navigator,
  StyleSheet,
  View,
  ActivityIndicatorIOS,
  Platform,
  Text,
  AsyncStorage
} from 'react-native';
import Route from './route';
import ToolbarAndroid from 'ToolbarAndroid';


let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});


export default class Index extends Component{

  componentWillMount() {
    console.disableYellowBox = true;
    console.disableRedBox = true;
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
        id : 'home',
        title: 'Home'
      }}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}
        renderScene={this.renderScene}/>
    );
  }

  renderScene(route, navigator) {
    _navigator = navigator;
   return (
    <View {...route.props} {...navigator.props}> 
     {/*<ToolbarAndroid
        actions={[]}
        onIconClicked={navigator.pop}
        style={styles.toolbar}
        titleColor="white"
        title={route.title} />*/}
     <Route
       ref={this.onLoadedScene}
       route={route}
       navigator={navigator}
       {...route.props}/>
    </View>   
   );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#06588a',
    height: 40,
    textAlign: 'center'
  },
  progressContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
});
