import * as types from '../constants/actionTypes';

const initialState = {
  searchKeyword: null,
  playVideoId: null,
  favourites: []
};

export default function videoDetails(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH:
      return { ...state, searchKeyword: action.payload };

    case types.PLAY_VIDEO:
      return { ...state, playVideoId: action.payload };  

    case types.ADD_TO_FAVOURITE: {
      let arr=state.favourites;
      let arr2=[];
      let flag=0;

      console.log(arr,state,action.payload);

      for(let i=0;i<arr.length;i++){
        if(arr[i].videoId===action.payload.videoId){
          flag=1;
          delete arr[i];

        }
        else{
          flag=2;
          arr2.push(arr[i]);
        }
      }
      
      if(flag==0 || flag==2)
        arr2.push(action.payload);

      console.log(state);
      return { ...state, favourites: arr2 };    
    }
      
    default:
      return state;
  }
}
