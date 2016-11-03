'use strict'
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
  Image,
  StyleSheet,
  Alert
} from 'react-native';

import Relay, { 
  Route,
  RootContainer,
  DefaultNetworkLayer
} from 'react-relay';

Relay.injectNetworkLayer(new DefaultNetworkLayer('http://172.18.2.195:3000/graphql'))


export class UserRoute extends Route {
  static paramDefinitions = {
    Keyword: { required: true }
  }
  static queries = {
    user: () => Relay.QL`
      query { 
        user(keyword: $Keyword)
      }
    `
  }
  static routeName = 'UserRoute'
}

export class UserInfo extends Component {
  constructor(props) {
  	super(props);
  	let user = this.props.user;
    this.sortByLikesPercentage(user.items);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { 
      dataSource: ds.cloneWithRows(user.items), 
      favourites: this.props.videoDetails.favourites
    };
  }

  sortByLikesPercentage(videoList){
    videoList.sort(function (a, b) {
      if (parseInt(a.statistics[0].likes)/parseInt(a.statistics[0].dislikes) < parseInt(b.statistics[0].likes)/parseInt(b.statistics[0].dislikes)) {
        return 1;
      }
      if (parseInt(a.statistics[0].likes)/parseInt(a.statistics[0].dislikes) > parseInt(b.statistics[0].likes)/parseInt(b.statistics[0].dislikes)) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  handleRowPress(rowData) {
    this.props.playVideo(rowData.videoId);
    this.props.navigator.push({
      title: 'videoDetail',
      id : 'videoDetail',
    });
  }

  handleFavouritePress(rowData) {
    this.props.addToFavourites(rowData);
    this.props.navigator.replace({
      title: 'searchResult',
      id : 'searchResult',
    });
  }


  renderRow(rowData) {
    let favourite;
    let flag=0;      
    if(this.state.favourites.length>0) {
      favourite = this.state.favourites.map((video)=>{
        if(rowData.videoId===video.videoId){
          flag=1;
          return (<Image
            style={styles.icon}
            source={require('../images/favourite.png')} />)
        }
      });     
    }  

    if(!flag)
      favourite = <Image
          style={styles.icon}
          source={require('../images/not-favourite.png')} />;

    return (
      <View style={styles.row}>

        <View style={styles.rowButton}>

          <View style={styles.rowWrapper}>
            <TouchableOpacity style={styles.rowWrapper} onPress={() => this.handleRowPress(rowData)}>
              <Image
                style={styles.thumbnail}
                source={{uri: rowData.mediumThumbnail}} />
              <Text style={styles.title}>{rowData.videoTitle}</Text>   
            </TouchableOpacity>  
            <TouchableOpacity onPress={() => this.handleFavouritePress(rowData)}>
              { favourite }
            </TouchableOpacity>
          </View>
          <View style={styles.rowWrapperLeft}>
            <Image
              style={styles.icon}
              source={require('../images/likes.png')} />
            <Text>{rowData.statistics[0].likes}</Text>  
            <Image
              style={styles.icon}
              source={require('../images/dislikes.png')} />  
            <Text>{rowData.statistics[0].dislikes}</Text>  
          </View> 

        </View>

      </View>
    )
  }

  render () {
    return (
		<View>
		    <ListView
		      style={styles.items}
		      dataSource={this.state.dataSource}
		      renderRow={this.renderRow.bind(this)}/>
		</View>
    );
  }
}

UserInfo = Relay.createContainer(UserInfo, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        items{
      		videoId,
          videoTitle,
      		mediumThumbnail,
      		statistics{likes,dislikes}
        }
      }
    `
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  items: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    padding: 10,
  },
  footer: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#E62117',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  moreButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  row: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 10
  },
  rowWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowWrapperLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    height:30
  },
  rowButton: {
    padding: 10,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    color: '#4078C0',
    fontWeight: 'bold'
  },
  thumbnail: {
    width: 120,
    height: 90
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginLeft:10,
  }
})

