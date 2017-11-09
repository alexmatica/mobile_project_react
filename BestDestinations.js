/**
 * Created by Alex on 11/9/2017.
 */
import React from 'react'
import {StyleSheet, View, Text, FlatList, Image} from 'react-native'
import Destination from './Destination'

function getDestination(name, description, rating){
  return {
    name,
    description,
    rating
  };
}

export default class BestDestinations extends React.Component{
  constructor(props){
    super(props);

    this.destinations = [
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

  }
  render(){
    let items =[];
    for (let i=0; i<this.destinations.length; i++){
        items.push({key: this.destinations[i].name,
                    value:this.destinations[i]});
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={({item}) =>
            <View style={styles.listItemContainer}>
              <Text style={styles.itemTitle}>{item.value.name}</Text>
              <Text style={styles.itemDescription}>{item.value.description}</Text>
              <Text style={styles.itemRating}>{item.value.rating}</Text>
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
    fontSize: 16,
    height: 30,
    width: '30%',
    color: '#ecf0f1',
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
  }
});