import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import colors from '../misc/colors';
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import NoteInputModal from '../components/NoteInputModal';
import Note from '../components/Note';
import { useNotes } from '../contexts/NoteProvider';
import NotFound from '../components/NotFound';



const NoteScreen = ({ user, navigation }) => {

  const [greet, setGreet] = useState('')
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false)
  const { notes, setNotes, findNotes } = useNotes()
  const [resultNotFound, setResultNotFound] = useState(false);
  // const [notes, setNotes] = useState([]) 
  const findGreet = () => {
    const hrs = new Date().getHours()
    if (hrs == 0 || hrs < 12) return setGreet('Morning')
    if (hrs == 1 || hrs < 17) return setGreet('Afternoon')
    setGreet('Evening')

  }
  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    console.log(note)

  };
  const reverseData = data => {
    return data.sort((a, b) => {
      const aInt = parseInt(a.time);
      const bInt = parseInt(b.time);
      if (aInt < bInt) return 1;
      if (aInt == bInt) return 0;
      if (aInt > bInt) return -1;
    });
  };
  // const findNotes = async () => {
  //   const result = await AsyncStorage.getItem('notes')
  //   if (result != null) setNotes(JSON.parse(result))
  // }
  const openNote = note => {
    console.log(notes, '111')
    navigation.navigate('NoteDetail', { note });
  };
  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };
  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findNotes();
  };
  useEffect(() => {
    // AsyncStorage.clear()
    findGreet()
    // findNotes()
  }, [])

  const reverseNotes = reverseData(notes);

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
          {notes.length ? (
            <SearchBar containerStyle={{ marginVertical: 15 }}
              value={searchQuery} onChangeText={handleOnSearchInput}
              onClear={handleOnClear}
              />

          ) : null}
          {
            resultNotFound ? <NotFound /> :
             <FlatList
              data={reverseNotes}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 15,
              }}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Note onPress={() => openNote(item)} item={item} />
              )}
            />
          }

          {
            !notes.length ? <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View> :
              null
          }

        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn onPress={() => setModalVisible(true)} />

      <NoteInputModal visible={modalVisible} onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit} />

    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },


});

export default NoteScreen;
