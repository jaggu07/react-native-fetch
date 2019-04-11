/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, FlatList} from 'react-native';
import { Card, ListItem, Button, Icon, Tile } from 'react-native-elements'
import Moment from 'moment';


type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    // return fetch('http://vizifyblooddonors.herokuapp.com/api/healthtips')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(responseJson)
    //     this.setState({
    //       isLoading: false,
    //       dataSource: responseJson.message,
    //     }, function(){

    //     });

    //   })
    //   .catch((error) =>{
    //     console.error(error);
    //   });
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        console.log('success', JSON.parse(request.responseText).message);
        this.setState({
                isLoading: false,
                dataSource: JSON.parse(request.responseText).message,
              }, function(){
      
              });
      
      } else {
        console.warn('error');
      }
    };

    request.open('GET', 'http://vizifyblooddonors.herokuapp.com/api/healthtips');
    request.send();
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    _renderList = (item) =>{
     return (   
        <Card>
          <Tile
            imageSrc={{uri:"https://images.pexels.com/photos/767240/pexels-photo-767240.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}}
            title={item.title}
            featured
            caption={item.content}
            imageContainerStyle={styles.tileStyle}
            containerStyle={styles.outer}
          />
          <Text style={styles.date}>{Moment(item.date).fromNow()}</Text>
          </Card>
 
     )
    }

    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => _renderList(item)}
          style={styles.containerList}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#F5FCFF',
    marginTop:50
  },
  containerList: {
  },
  tileStyle:{
    width:"100%",
    
  },
  outer:{
    width:'auto',
    
  },
  date:{
    marginTop:15,
    textAlign: 'right'
  }

});
