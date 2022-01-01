import * as React from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import {useState, useEffect} from 'react';

import RadioImage1 from '../../../assets/images/RadioImage1.png';
import RadioImage2 from '../../../assets/images/RadioImage2.png';
import RadioImage3 from '../../../assets/images/RadioImage3.png';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export default function Card({
  title,
  startTime,
  endTime,
  description,
  shortDescription,
  id,
  width,
  height,
  upcoming,
  schedule,
  favorites,
}) {
  const images = [RadioImage1, RadioImage2, RadioImage3];
  const [imageIndex, setImageIndex] = useState(0);
  // RandomImage
  useEffect(() => {
    const changeImage = () => {
      const randomNumber = Math.floor(Math.random() * images.length);
      setImageIndex(randomNumber);
    };
    changeImage();
  }, []);

  // const backgroundColor = [
  //   '#1d3557',
  //   '#457b9d',
  //   '#a8dadc',
  //   '#e63946',
  //   '#e76f51',
  //   '#f4a261',
  //   '#e9c46a',
  //   '#2a9d8f',
  //   '#00CEFF',
  //   '#ef476f',
  //   '#264653',
  //   '#9b5de5',
  // ];
  const backgroundColor = [
    '#ff4b1f',
    '#FF0099',
    '#8E2DE2',
    '#DCE35B',
    '#f12711',
    '#ee0979',
    '#00B4DB',
    '#00b09b',
    '#159957',
    '#C33764',
  ];
  const gradientColor = [
    '#45B649',
    '#ff6a00',
    '#4A00E0',
    '#b91d73',
    '#f5af19',
    '#237A57',
    '#0083B0',
    '#96c93d',
    '#155799',
    '#1D2671',
  ];
  const randomColor =
    backgroundColor[Math.floor(Math.random() * backgroundColor.length)];

  const randomGradientColor =
    gradientColor[Math.floor(Math.random() * gradientColor.length)];

  const renderModal = () => {
    if (upcoming) {
      return (
        <View style={styles.upcomingContainer}>
          <TouchableOpacity
            style={[styles.upcomingCard, {width: width, height: height}]}>
            <View style={styles.upcomingImage}>
              <Image
                style={{
                  flex: 1,
                  width: '90%',
                  height: undefined,
                  resizeMode: 'contain',
                }}
                source={images[imageIndex]}
              />
            </View>
            <View style={styles.upcomingTitle}>
              <Text style={styles.upcomingTitleText}>{title}</Text>
            </View>
            <View style={styles.upcomingTime}>
              <Text style={styles.upcomingTimeText}>
                {startTime} : {endTime}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log('reminder button pressed');
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#8316E8', '#D424A1']}
                style={styles.reminderButton}>
                {/* <Icon name="notifications-none" size={23} color="black" /> */}
                <IIcon
                  name="ios-notifications-outline"
                  size={23}
                  color="white"
                />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() => {
                console.log('more has been pressed');
              }}>
              <Icon name="more-vert" size={23} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      );
    } else if (schedule) {
      return (
        <View>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            colors={[randomColor, randomGradientColor]}
            style={[styles.scheduleCard, {width: width, height: height}]}>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.time}>
                {startTime} : {endTime}
              </Text>
              <Text numberOfLines={2} style={styles.description}>
                {shortDescription}
              </Text>
              <View style={styles.details}>
                <IIcon name="md-heart-outline" size={23} color="black" />
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      );
    }
  };
  return <View>{renderModal()}</View>;
}

const styles = StyleSheet.create({
  upcomingContainer: {
    flex: 1,
  },
  upcomingCard: {
    marginTop: 15,
    shadowOffset: {height: 3},
    shadowRadius: 8,
    shadowOpacity: 1,
    borderRadius: 50,
    padding: 10,
    elevation: 5,
    backgroundColor: '#432762',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upcomingImage: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  upcomingTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20,
    marginBottom: 25,
  },
  upcomingTitleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    fontFamily: 'Helvetica',
  },
  upcomingTime: {
    position: 'absolute',
    bottom: 0,
    left: 75,
    marginBottom: 10,
  },
  upcomingTimeText: {
    fontStyle: 'italic',
    color: 'white',
    fontFamily: 'Helvetica',
    fontSize: 14,
    fontWeight: '300',
  },
  reminderButton: {
    backgroundColor: 'white',
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  moreButton: {
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0,
  },
  /*******************Schedule********************/
  scheduleCard: {
    marginLeft: 25,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 10,
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    fontFamily: 'Helvetica',
    marginBottom: 5,
  },
  time: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'white',
    fontFamily: 'Helvetica',
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Helvetica',
    marginBottom: 5,
  },
  details: {
    bottom: -5,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
