'use strict';
import React, {Component} from 'react';
import Home from '../containers/home';
import SearchResult from '../containers/searchResult';
import VideoDetail from '../containers/videoDetail';

export default class Route extends Component{
    render() {
        let routeId = this.props.route.id;
        let ComponentToRender = '';

        switch (routeId) {
            case 'home':
                ComponentToRender = Home;
                break;
            case 'searchResult':
                ComponentToRender = SearchResult;
                break;
            case 'videoDetail':
                ComponentToRender = VideoDetail;
                break;        
            default:
        }

        return (
            <ComponentToRender ref="mainComponent" navigator={this.props.navigator} currentRoute={this.props.route} {...this.props.route.passProps}/>
        );
    }
}
