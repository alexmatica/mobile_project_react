/**
 * Created by Alex on 11/9/2017.
 */
import React from 'react'
import {Button, StyleSheet, Text, TextInput, View, AsyncStorage} from "react-native";
import {Destination} from "./Destination";

export default class EditDetails extends React.Component{
  static navigationOptions = ({navigation}) => ({
    title: `Edit details`,
  });

  constructor(props){
    super(props);
    const {params} = this.props.navigation.state;
    this.state = {
      newTitle: params.edititm.name,
      newDetails: params.edititm.description
    };
  }

  render() {
    const {params} = this.props.navigation.state;
    const {navigate} = this.props.navigation;
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.editContainer}>
        <View style={styles.titleInputContainer}>
          <TextInput
              onChangeText={(text) => this.setState({newTitle: text})}>
              {params.edititm.name}
          </TextInput>
        </View>
        <View style={styles.editInputContainer}>
          <TextInput
                     multiline = {true}
                     onChangeText={(text) => this.setState({newDetails: text})}>
              {params.edititm.description}
          </TextInput>
        </View>
        <Button onPress={() => {
            if (params.edititm.name !== '') {
              console.log('name not null, updating');
                AsyncStorage.getItem(params.edititm.id.toString()).then((item) => {
                    let itemJ = JSON.parse(item);
                    itemJ['name'] = this.state.newTitle;
                    itemJ['description'] = this.state.newDetails;
                    AsyncStorage.setItem(params.edititm.id.toString(), JSON.stringify(itemJ)).done();
                }).done();
            }
            else {
              console.log('name is null, add new!');
                let current_id = -1;
              AsyncStorage.getAllKeys().then((keys)=>{
                console.log('got all keys, in then');
                  for (let i = 0; i < keys.length; i++) {
                      const id = parseInt(keys[i], 10);
                      if (id > current_id) {
                          current_id = id;
                      }
                  }
                  console.log('the current id is {}', current_id);
                  current_id++;
                  let d = new Destination(this.state.newTitle, this.state.newDetails, 5, 'x.png');
                  d.setId(current_id);
                  console.log(JSON.stringify(d));
                  AsyncStorage.setItem(current_id.toString(), JSON.stringify(d)).done();
              }).done();
                params.refreshFunc();
                goBack();
            }
        }
        } title="Save changes" style={styles.saveButton}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  editContainer: {
    backgroundColor: '#34495e',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleInputContainer: {
    width: '90%',
    height: '30%',
    padding: 5
  },
  editInputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: '75%',
    height: '20%',
    paddingBottom: 20,
  },
  saveButton: {
    width: '60%',
    height: '15%',
    backgroundColor: 'blue',
  }
});