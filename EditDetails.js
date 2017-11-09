/**
 * Created by Alex on 11/9/2017.
 */
import React from 'react'
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import BestDestinations from "./BestDestinations";

export default class EditDetails extends React.Component{
  static navigationOptions = ({navigation}) => ({
    title: `Edit details for ${navigation.state.params.destname}`,
  });

  render() {
    const {params} = this.props.navigation.state;
    const {navigate} = this.props.navigation;
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.editContainer}>
        <View style={styles.editInputContainer}>
          <TextInput style = {styles.editInputTextView}
                     multiline = {true}
                     onChangeText={(text) => this.setState({newDetails: text})}>
              {params.destdetails}
          </TextInput>
        </View>
        <Button onPress={() => {
          params.updFunc(params.destidx, this.state.newDetails);
          goBack();
        }
        } title="Save changes" style={styles.saveButton}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  editContainer: {
    backgroundColor: '#f39c12',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editInputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: '75%',
    height: '40%',
    paddingBottom: 20,
  },
  editInputTextView: {
    height: '100%',
  },
  saveButton: {
    width: '60%',
    height: '15%',
    backgroundColor: 'blue',
  }
});