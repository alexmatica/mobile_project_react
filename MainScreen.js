/**
 * Created by Alex on 11/9/2017.
 */
import React from 'react'
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Communications from 'react-native-communications'

export default class MainScreen extends React.Component {

  static navigationOptions = {
    title: 'Welcome to Traveller React'
  };

  constructor(props){
    super(props);
    this.state = {fbName:'', fbDescription:''};
  }
  render(){
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>

        <View style={styles.oneLineTextContainer}>
          <TextInput
            style={styles.textBoxSmall}
            placeholder="Your name..."
            onChangeText={(text) => this.setState({fbName: text})}
          />
        </View>

        <View style={styles.multiLineTextContainer}>
          <TextInput
            style={styles.textBoxLarge}
            placeholder="Your feedback..."
            multiline={true}
            onChangeText={(text) => this.setState({fbDescription: text})}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <Button onPress={() => Communications.email(['alexbv2301@gmail.com'], null, null, this.state.fbName, this.state.fbDescription)}
                  title="Send Email"
                  color='#e67e22'
                  style={styles.sendBtn}>
          </Button>
        </View>
        <View style={styles.buttonsContainer}>
          <Button onPress={() => navigate('Destinations')}
                  title="Continue"
                  color="#e67e22"
                  style={styles.sendBtn}>
          </Button>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '10%',
    paddingTop: '10%',
  },

  buttonsContainer: {
    flex: 1,
    width: '60%',
  },

  sendBtn:{
    flex: 1,
    width: '50%',
    padding: 20,
  },

  oneLineTextContainer: {
    flex: 1,
    alignItems: 'center',
    width: '60%',
  },

  textBoxSmall: {
    alignItems:'center',
    paddingBottom: 20,
    width: '90%',
  },

  multiLineTextContainer: {
    flex: 4,
    alignItems:'center',
    width: '60%',
    paddingBottom: 20,
  },

  textBoxLarge: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
  }
});
