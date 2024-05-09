import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

const NoteInputModal = ({ visible, onClose, onSubmit,note,isEdit }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  // useEffect(() => {
  //   if (isEdit) {
  //     setTitle(note.title);
  //     setDesc(note.desc);
  //   }
  // }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle('');
      setDesc('');
    }
    onClose()

    // } else {
    //   onSubmit(title, desc);
    //   setTitle('');
    //   setDesc('');
    // }
    // onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setDesc('');
    }
    onClose();
  };
  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  return (
    <>
      <StatusBar />
      <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={text => handleOnChangeText(text, 'title')}
            placeholder='Title'
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={desc}
            multiline
            placeholder='Note'
            style={[styles.input, styles.desc]}
            onChangeText={text => handleOnChangeText(text, 'desc')}
          />
          <View style={styles.btnContainer}>

            <TouchableOpacity style={styles.icon} onPress={handleSubmit}>
              <Image source={require('../../assets/check.png')} style={{ height: 30, width: 30, }} />
            </TouchableOpacity>
            {
              title.trim() || desc.trim() ?
                <TouchableOpacity style={styles.icon} onPress={() => closeModal()}>
                  <Image source={require('../../assets/close1.webp')} style={{ height: 30, width: 30 }} />
                </TouchableOpacity> :
                null
            }

          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    paddingVertical: 15,
    justifyContent: 'space-evenly',
    // backgroundColor: 'green'
  },
  icon: {
    backgroundColor: colors.PRIMARY,
    // padding: 15,
    borderRadius: 50,
    // elevation: 5,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // position:'absolute',
    // right:15,
    // bottom:50,
    zIndex: 1,


  },
});

export default NoteInputModal;
