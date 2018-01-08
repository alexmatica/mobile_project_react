import React from 'react';
import {StackNavigator} from "react-navigation";
import MainScreen from "./MainScreen";
import BestDestinations from "./BestDestinations";
import EditDetails from "./EditDetails";
import firebase from 'firebase';

const SimpleNavi = StackNavigator({
  Home: {screen: MainScreen},
  Destinations: {screen: BestDestinations},
  Edit: {screen: EditDetails},
});

export default class App extends React.Component {

  componentWillMount(){
      var config = {
          apiKey: "AIzaSyBjfKe3RvG0YvV2yh_fJUpNMSPzon8KrQw",
          authDomain: "mobileprojectreactnative.firebaseapp.com",
          databaseURL: "https://mobileprojectreactnative.firebaseio.com",
          projectId: "mobileprojectreactnative",
          storageBucket: "",
          messagingSenderId: "891705302910"
      };
      firebase.initializeApp(config);
  }

  render(){
      return <SimpleNavi/>;
  }

}





