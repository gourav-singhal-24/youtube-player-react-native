import * as types from '../constants/actionTypes';

export function searchYouTubeAPI(keyword) {
  return {
    type: types.SEARCH,
    payload: keyword
  };
}

export function playVideo(videoId) {
  return {
    type: types.PLAY_VIDEO,
    payload: videoId
  };
}

export function addToFavourites(videoData) {
  return {
    type: types.ADD_TO_FAVOURITE,
    payload: videoData
  };
}

