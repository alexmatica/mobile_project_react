/**
 * Created by Alex on 11/9/2017.
 */
import React from 'react'
import {StyleSheet, View, Text, FlatList, Image, RefreshControl} from 'react-native'
import Destination from './Destination'
import TouchableItem from "./node_modules/react-navigation/lib-rn/views/TouchableItem";

function getDestination(name, description, rating){
  return {
    name,
    description,
    rating
  };
}

export default class BestDestinations extends React.Component{
  static navigationOptions = {
    title: 'Best destinations',
  };

  destinations = [
    getDestination("Miami", "Editme", 5),
    getDestination("Austria", "Editme", 4),
    getDestination("London", "Editme", 3),
    getDestination("Vegas", "Editme", 3),
    getDestination("Codlea", "Editme", 5),
    getDestination("Brasov", "Editme", 4),
    getDestination("Cluj-Napoca", "Editme", 3),
    getDestination("Bucuresti", "Editme", 3),
    getDestination("Blaj", "Editme", 5),
    getDestination("Indonesia", "Editme", 4),
    getDestination("China", "Editme", 3),
    getDestination("Japan", "Editme", 3),
    getDestination("Singapore", "Editme", 5),
    getDestination("Whatever", "Editme", 4),
    getDestination("Destination", "Editme", 3),
    getDestination("AnotherOne", "Editme", 3),
    getDestination("Ghimbav", "Editme", 5),
    getDestination("Cristian", "Editme", 4),
    getDestination("Tarnita", "Editme", 3),
    getDestination("Baciu", "Editme", 3),
  ];

  constructor(props){
    super(props);
    this._updateItem = this._updateItem.bind(this);
    this.state = {
      refreshing: false,
    };
  }
  _onRefresh() {
    this.setState({refreshing:true});
    this.setState({refreshing:false});
  }

  render(){
    let items =[];
    for (let i=0; i<this.destinations.length; i++){
        items.push({key: this.destinations[i].name,
                    value:this.destinations[i]});
    }
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          data={items}
          renderItem={({item}) =>
            <View style={styles.listItemContainer}>
              <Image style={styles.itemImage} source={require('./images/globe.png')}/>
              <Text style={styles.itemTitle}>{item.value.name}</Text>
              <TouchableItem style={styles.itemDescription}
                             onPress={() => navigate('Edit', {destname: item.value.name,
                                                              destdetails: item.value.description,
                                                              destidx: this.destinations.map(function (dest) {return dest.name}).indexOf(item.value.name),
                                                              updFunc: this._updateItem})} >
                <Text style={styles.itemDescriptionText}>
                  {item.value.description}
                </Text>
              </TouchableItem>
              <Text style={styles.itemRating}>{item.value.rating}</Text>
              <Image style={styles.itemImage} source={require('./images/thumbsup.png')}/>
            </View>
          }
        />
      </View>
    );
  }

  _updateItem(index, newDescription){
    this.destinations[index].description = newDescription;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#7f8c8d',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#95a5a6',
    marginTop: 2,
  },

  itemTitle: {
    fontSize: 16,
    height: 30,
    width: '40%',
    color: 'black',
  },

  itemDescription: {
    height: 30,
    width: '30%',
  },

  itemDescriptionText: {
    fontSize: 16,
    color: 'white',
  },

  itemRating: {
    fontSize: 18,
    height: 30,
    width: '5%',
    color: 'black',
  },

  itemImage: {
    height: 40,
    width: 40,
    padding: 3,
  }
});