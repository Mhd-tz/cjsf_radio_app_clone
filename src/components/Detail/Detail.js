import * as React from 'react';
import {
  Text,
  View,
  SectionList,
  RefreshControl,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import AutoLink from 'react-native-autolink';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import {useState, useEffect, useRef, useCallback, memo} from 'react';

export default function Detail({
  isModalVisible,
  setIsModalVisible,
  title,
  description,
  startTime,
  endTime,
  upcoming,
  id,
  isFavorite,
  isFavoriteIcon,
  isFavoriteColor,
  setIsFavorite,
  setIsFavoriteIcon,
  setIsFavoriteColor,
  changeState,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likedIcon, setLikedIcon] = useState('heart-outline');
  const [likedIconColor, setLikedIconColor] = useState('white');

  useEffect(() => {
    if (isFavorite) {
      setIsLiked(isFavorite);
      setLikedIcon(isFavoriteIcon);
      setLikedIconColor(isFavoriteColor);
    }
  }, [isFavorite]);

  const makeFavorite = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikedIcon('heart');
      setLikedIconColor('red');
      setIsFavorite(true);
      setIsFavoriteIcon('heart');
      setIsFavoriteColor('red');
      _storeData();
    } else {
      setIsLiked(false);
      setLikedIcon('heart-outline');
      setLikedIconColor('white');
      setIsFavorite(false);
      setIsFavoriteIcon('heart-outline');
      setIsFavoriteColor('white');
      _removeData();
    }
  };

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem(id + '', 'is');
      console.log('stored');
      console.log(AsyncStorage.getItem(id + ''));
    } catch (error) {
      console.log('Error saving data' + error);
    }
  };

  const _removeData = async () => {
    try {
      await AsyncStorage.removeItem(id + '');
      console.log('removed');
    } catch (error) {
      console.log('Error removing data' + error);
    }
  };
  // set the isModalVisible state to false when the modal is closed
  const closeModal = () => {
    setIsModalVisible(false);
    if (isLiked != isFavorite) {
      changeState();
    }
  };

  const renderModalContent = () => {
    if (upcoming) {
      return (
        <View>
          <Modal
            style={styles.modal}
            onBackButtonPress={closeModal}
            isVisible={isModalVisible}
            animationType="fade">
            <View style={styles.container}>
              <View
                style={{
                  width: '100%',
                  height: 50,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {/* <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => {
                    console.log('like button pressed');
                    makeFavorite();
                  }}>
                  <IIcon name={likedIcon} size={25} color={likedIconColor} />
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => closeModal()}>
                  <Icon name="close" size={28} color="white" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.scrollContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>
                    StartTime: {startTime} - End-Time: {endTime}
                  </Text>
                </View>
                <View style={styles.descriptionContainer}>
                  <AutoLink
                    style={styles.description}
                    text={description}
                    urlStyle={{color: '#0066ff'}}
                    onPress={url => {
                      console.log(url);
                    }}
                  />
                </View>
              </ScrollView>
            </View>
          </Modal>
        </View>
      );
    } else {
      return (
        <View>
          <Modal
            onBackButtonPress={closeModal}
            style={styles.modal}
            isVisible={isModalVisible}
            animationType="fade">
            <View style={styles.container}>
              <View
                style={{
                  width: '100%',
                  height: 50,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => {
                    console.log('like button pressed');
                    makeFavorite();
                    // makeLiked();
                    // makeLiked();
                  }}>
                  <IIcon name={likedIcon} size={25} color={likedIconColor} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => closeModal()}>
                  <Icon name="close" size={28} color="white" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.scrollContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>
                    Start-Time: {startTime} - End-Time: {endTime}
                  </Text>
                </View>
                <View style={styles.descriptionContainer}>
                  <AutoLink
                    style={styles.description}
                    text={description}
                    urlStyle={{color: '#0066ff'}}
                    onPress={url => {
                      console.log(url);
                    }}
                  />
                </View>
              </ScrollView>
            </View>
          </Modal>
        </View>
      );
    }
  };
  return <View>{renderModalContent()}</View>;
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 25,
    margin: 0,
    maxHeight: '80%',
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: '100%',
    width: '35%',
    backgroundColor: 'black',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  likeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: '100%',
    width: '35%',
    backgroundColor: '#432762',
  },
  likeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContainer: {
    width: '100%',
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  timeContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
  },
  descriptionContainer: {
    width: '100%',
    justifyContent: 'center',
    aliItems: 'flex-start',
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
});
