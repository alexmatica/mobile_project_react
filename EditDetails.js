/**
 * Created by Alex on 11/9/2017.
 */
import React from 'react'
import {Button, StyleSheet, Text, TextInput, View, AsyncStorage, Alert} from "react-native";
import {Destination} from "./Destination";
import {Pie} from 'react-native-pathjs-charts';

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

      let data = [
          {
              "name": "Dummy",
              "length": 20
          },
          {
              "name": "Dummier",
              "length": 35
          },
          {
              "name": "Dummest",
              "length": 45
          }
      ];
      let options = {
          margin: {
              top: 20,
              left: 20,
              right: 20,
              bottom: 20
          },
          width: 200,
          height: 200,
          color: '#27ae60',
          r: 10,
          R: 100,
          legendPosition: 'topLeft',
          animate: {
              type: 'oneByOne',
              duration: 2,
              fillTransition: 3
          },
          label: {
              fontFamily: 'Arial',
              fontSize: 12,
              fontWeight: true,
              color: '#2c3e50'
          }
      };

    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleInputContainer}>
          <TextInput style={styles.centeredInputStyle}
              onChangeText={(text) => this.setState({newTitle: text})}>
              {params.edititm.name}
          </TextInput>
        </View>
        <View style={styles.editInputContainer}>
          <TextInput style = {styles.centeredInputStyle}
                     multiline = {true}
                     onChangeText={(text) => this.setState({newDetails: text})}>
              {params.edititm.description}
          </TextInput>
        </View>

          <View style={styles.saveButtonContainer}>
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
            } title="Save changes"/>
          </View>
          <View style={styles.chartContainer}>
              <Pie
                data = {data}
                options = {options}
                accessorKey = "length"
              />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#2980b9',
    flex: 1,
  },

  titleInputContainer: {
    width: '90%',
    height: '20%',
    marginLeft: '5%',
    paddingTop: '5%',
  },

  centeredInputStyle: {
    textAlign: 'center',
  },

  editInputContainer: {
    width: '80%',
    height: '20%',
    marginLeft: '10%',
  },

  saveButtonContainer: {
    width: '60%',
    height: '15%',
    paddingTop: '5%',
    marginLeft: '20%',
  },
  chartContainer: {
      alignItems: 'center',
      justifyContent: 'center'
  }
});