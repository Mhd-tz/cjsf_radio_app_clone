import * as React from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  StyleSheet,
  Button,
} from 'react-native';
import {useState, useEffect} from 'react';

// import styles from './RadioCard.Style';
import ReadMore from '@fawazahmed/react-native-read-more';
import Icon from 'react-native-vector-icons/Ionicons';
import RadioImage1 from '../../../assets/images/RadioImage1.png';
import RadioImage2 from '../../../assets/images/RadioImage2.png';
import RadioImage3 from '../../../assets/images/RadioImage3.png';
import Modal from 'react-native-modal';
import Detail from '../Detail/Detail';

export default function RadioCard({
  title,
  startTime,
  endTime,
  description,
  shortDescription,
  startSpinning,
  backgroundColor,
  color,
  id,
  isFav,
}) {
  //Animation
  const [spinValue] = useState(new Animated.Value(0));

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // start spinning when the startSpinning prop is true
  if (startSpinning) {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  } else {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 0,
        duration: 0,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }

  // ReadMore
  const [readMoreProps, setReadMoreProps] = useState({
    numberOfLines: 4,
    seeMoreText: 'Read More',
    seeLessText: 'Show Less',
    seeMoreStyle: {
      fontSize: 15,
      color: '#D424A1',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      textAlign: 'right',
      paddingLeft: 10,
    },
    seeLessStyle: {
      fontSize: 15,
      color: '#D424A1',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    wrapperStyle: {},
  });

  // set the modal data to the data of the card that was clicked
  const [modalData, setModalData] = useState({
    title: title,
    startTime: startTime,
    endTime: endTime,
    description: description,
    shortDescription: shortDescription,
    backgroundColor: backgroundColor,
    color: color,
  });
  // Image renderer
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const onPress = () => {
    setIsModalVisible(!isModalVisible);
  };

  // const [isLiked, setIsLiked] = useState(false);
  // const [isFavoriteIcon, setisFavoriteIcon] = useState('heart-outline');
  // const [isFavoriteColor, setisFavoriteColor] = useState('white');

  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteIcon, setIsFavoriteIcon] = useState('heart-outline');
  const [isFavoriteColor, setIsFavoriteColor] = useState('white');

  const _onChangeState = () => {
    console.log(
      'state changing: ' +
        isFavorite +
        ' ' +
        isFavoriteIcon +
        ' ' +
        isFavoriteColor,
    );
    if (isFavorite) {
      isFavorite = false;
      setIsFavoriteIcon('heart-outline');
      setIsFavoriteColor('white');
    } else {
      isFavorite = true;
      setIsFavoriteIcon('heart');
      setIsFavoriteColor('red');
    }
    console.log(
      'state changed: ' +
        isFavorite +
        ' ' +
        isFavoriteIcon +
        ' ' +
        isFavoriteColor,
    );
  };

  useEffect(() => {
    setIsFavorite(isFav);
  }, [isFav]);

  const renderModal = () => {
    return (
      <View>
        <TouchableOpacity
          style={[styles.card, {backgroundColor: backgroundColor}]}
          onPress={onPress}>
          <View style={styles.icon}>
            <Icon name={isFavoriteIcon} size={23} color={isFavoriteColor} />
          </View>
          <Animated.View
            style={[
              styles.image,
              {transform: [{rotate: spin}]},
              {backgroundColor: color},
            ]}>
            <Image
              style={{
                flex: 1,
                width: '90%',
                height: undefined,
                resizeMode: 'contain',
              }}
              source={images[imageIndex]}
            />
            <View
              style={{
                backgroundColor: 'black',
                width: 15,
                height: 15,
                borderRadius: 50,
                position: 'absolute',
              }}
            />
          </Animated.View>
          <View style={styles.programProperties}>
            <View style={styles.title}>
              <Text style={[styles.titleText, {color: color}]}>{title}</Text>
            </View>
            <View style={styles.shortDescription}>
              <Text style={[styles.shortDescriptionText, {color: color}]}>
                {shortDescription}
              </Text>
            </View>
            <View style={styles.time}>
              <Text style={[styles.timeText, {color: color}]}>
                {startTime} : {endTime}
              </Text>
            </View>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.description}>
            <ReadMore
              {...readMoreProps}
              style={[styles.descriptionText, {color: color}]}>
              {description}
            </ReadMore>
          </View>
        </TouchableOpacity>
        <Detail
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          title={title}
          startTime={startTime}
          endTime={endTime}
          description={description}
          setIsFavorite={setIsFavorite}
          setIsFavoriteIcon={setIsFavoriteIcon}
          setIsFavoriteColor={setIsFavoriteColor}
          _onChangeState={_onChangeState}
          isFavorite={isFavorite}
          isFavoriteIcon={isFavoriteIcon}
          isFavoriteColor={isFavoriteColor}
          id={id}
        />
      </View>
    );
  };
  return <View>{renderModal()}</View>;
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: {height: 3},
    elevation: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 25,
    backgroundColor: '#432762',
    width: 35,
    height: 35,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    backgroundColor: 'black',
    flex: 1,
    height: 100,
    width: 100,
    borderRadius: 50,
    top: -40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  programProperties: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -25,
  },
  title: {
    flex: 1,
    marginTop: 5,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  shortDescription: {
    flex: 1,
    marginTop: 10,
  },
  shortDescriptionText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
  },
  time: {
    flex: 1,
    marginTop: 10,
  },
  timeText: {
    fontSize: 14,
    color: 'black',
    fontStyle: 'italic',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    borderBottomWidth: 3,
    borderBottomColor: '#432762',
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 15,
    color: 'black',
    lineHeight: 25,
    fontWeight: '400',
    textAlign: 'left',
  },
});
