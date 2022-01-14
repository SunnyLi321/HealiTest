/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  TextInput,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import foodData from './database.json'


const App: () => Node = () => {
  const database = require('./database.json')

  const data = Object.entries(database) 


  const renderItem = ({ item }) => (
    <View style = {styles.item}>
      
      <Text style = {styles.text}>{item[1].text}</Text>
      <FlatList
        data={Object.entries(item[1].tags)}
        renderItem={({item}) => {
         
          return <View style={styles.tagbox}><Text style = {styles.tags}>{item}</Text></View>
        
        }}
        keyExtractor={item => item}
      />
      
    </View>
  );

  const [Searchterm, setSearchterm] = React.useState('') 
  const onChangeSearch = query => setSearchterm(query);

  const filteredData = Searchterm
  ? data.filter(x =>
      x[1].text.toLowerCase().includes(Searchterm.toLowerCase())
    )
  : data;

  
  return (
    <SafeAreaView>
      <Text style = {styles.title}>Browse Food</Text>
      <TextInput style={styles.searchBar}
        placeholder="Search.."
        onChangeText={onChangeSearch}
        value={Searchterm}
        clearButtonMode="always"
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 2,
    paddingVertical:10,
    marginLeft:20,
    marginRight:20
  },
  text:{
    fontSize : 16,
    color: "#6A6A6A",
    textTransform: 'capitalize'
  },
  title:{
    fontSize : 32,
    color: "#1F4F46",
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    fontWeight: 'bold'
  },
  searchBar:{
    fontSize:16,
    color:"#6A6A6A",
    borderWidth:1,
    borderColor:"#E8E8E8",
    marginLeft:20,
    marginRight:20,
    paddingVertical:5,
    borderRadius:5
  },
  tags:{
    fontSize:16,
    color:"white",
    marginLeft:5
  },
  tagbox:{
    borderWidth:1,
    borderColor:"#E8E8E8",
    paddingVertical:5,
    borderRadius:25,
    marginRight:235,
    backgroundColor: "darkgreen"
  }
});

export default App;
