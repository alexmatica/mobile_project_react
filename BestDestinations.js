/**
 * Created by Alex on 11/9/2017.
 */
import React from 'react'
import {StyleSheet, View, Text, FlatList, Image, RefreshControl} from 'react-native'
import TouchableItem from "./node_modules/react-navigation/lib-rn/views/TouchableItem";
import {Destination} from "./Destination";

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

  constructor(props){
    super(props);
    this._onRefresh = this._onRefresh.bind(this);
    this.state = {
      refreshing: false,
    };

    destinations = [
      new Destination("Miami", "Editme", 5),
      new Destination("Austria", "Editme", 4),
      new Destination("London", "Editme", 3),
      new Destination("Vegas", "Editme", 3),
      new Destination("Codlea", "Editme", 5),
      new Destination("Brasov", "Editme", 4),
      new Destination("Cluj-Napoca", "Editme", 3),
      new Destination("Bucuresti", "Editme", 3),
      new Destination("Blaj", "Editme", 5),
      new Destination("Indonesia", "Editme", 4),
      new Destination("China", "Editme", 3),
      new Destination("Japan", "Editme", 3),
      new Destination("Singapore", "Editme", 5),
      new Destination("Whatever", "Editme", 4),
      new Destination("Destination", "Editme", 3),
      new Destination("AnotherOne", "Editme", 3),
      new Destination("Ghimbav", "Editme", 5),
      new Destination("Cristian", "Editme", 4),
      new Destination("Tarnita", "Editme", 3),
      new Destination("Baciu", "Editme", 3),
    ];
  }
  _onRefresh() {
    this.setState({refreshing:true});
    this.setState({refreshing:false});
  }

  render(){
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
          data={destinations}
          keyExtractor={(item, index) => index}
          renderItem={({item}) =>
            <View style={styles.listItemContainer}>
              <Image style={styles.itemImage} source={require('./images/globe.png')}/>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <TouchableItem style={styles.itemDescription}
                             onPress={() => navigate('Edit', {edititm: item,
                                                              refreshFunc: this._onRefresh})} >
                <Text style={styles.itemDescriptionText}>
                  {item.description}
                </Text>
              </TouchableItem>
              <Text style={styles.itemRating}>{item.rating}</Text>
              <Image style={styles.itemImage} source={require('./images/thumbsup.png')}/>
            </View>
          }
        />
      </View>
    );
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