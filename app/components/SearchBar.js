import React from 'react';
import { View, StyleSheet, TextInput, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../misc/colors';

const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.searchBar}
          placeholder='Search here..'
        />
      </View>
      <View>
        {value ? (

          <TouchableOpacity onPress={onClear} style={styles.clearIcon} >
            <Image source={require('../../assets/cross.webp')} style={{ height: 20, width: 20, resizeMode: 'cover' }} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
  },
  container: {
    // justifyContent: 'center',
    // backgroundColor:'red'
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
    // bottom:10,
    // backgroundColor: 'green'
  },
});

export default SearchBar;
