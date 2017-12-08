/**
 * Created by Alex on 11/9/2017.
 */
import React from 'react'
import {StyleSheet, View, Text, FlatList, Image, RefreshControl, Button, AsyncStorage} from 'react-native'
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
    this.destinations = []
  }
  _onRefresh() {
    this.setState({refreshing:true});
    this.destinations = [];
    AsyncStorage.getAllKeys().then((keys) => {
      for (let i=0; i<keys.length; i++){
        AsyncStorage.getItem(keys[i]).then((item) =>{
          let itemJ = JSON.parse(item);
          let dest = new Destination(itemJ['name'], itemJ['description'],itemJ['rating'], itemJ['photo']);
          dest.setId(itemJ['id']);
          if(itemJ['id'] !== null)
            this.destinations.push(dest);
        }).done();
      }
    }).then(this.setState({refreshing:false})).done();

    this.setState({refreshing:false});
  }

  componentWillMount(){
    this._onRefresh();
  }

  render(){
    const {navigate} = this.props.navigation;
    if (this.state.refreshing === true){
      return (
          <View style={styles.container}>
            <Text>Best destinations are loading...</Text>
          </View>
      );
    } else
    return (
      <View style={styles.container}>
        <Button title="Add Destination"
          onPress={() => {
            let d = new Destination('','',0,'');
            navigate('Edit', {edititm: d, refreshFunc:this._onRefresh})
          }}>

        </Button>
        <FlatList
          refreshControl={
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
            />
          }
          data={this.destinations}
          keyExtractor={(item, index) => index}
          renderItem={({item}) =>
            <View style={styles.listItemContainer}>
              <Image style={styles.itemImage} source={require('./images/globe.png')}/>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <TouchableItem style={styles.itemDescription}
                             onPress={() => navigate('Edit', {edititm: item,
                                 refreshFunc: this._onRefresh})}
                             on
              >
                <Text style={styles.itemDescriptionText}>
                  {item.description}
                </Text>
              </TouchableItem>
              <Text style={styles.itemRating}>{item.rating}</Text>
              <TouchableItem
                onPress={() => {
                    AsyncStorage.removeItem(item.id.toString()).done();
                    this._onRefresh();
                }
                }
              >
                <Image style = {styles.itemImage} source={require('./images/thumbsup.png')}/>
              </TouchableItem>
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