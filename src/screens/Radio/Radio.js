import * as React from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Share,
  Linking,
} from 'react-native';
import {useState, useEffect} from 'react';
import {SwipeablePanel} from 'rn-swipeable-panel';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Radio.Style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

import Header from '../../components/Header/Header.js';
import RadioCard from '../../components/RadioCard/RadioCard';
import DayList from '../../components/DayList/DayList';

const window = Dimensions.get('window');

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

var audio = new Sound('https://www.cjsf.ca:8443/listen-hq', null, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      audio.getDuration() +
      'number of channels: ' +
      audio.getNumberOfChannels(),
  );
});

function Radio() {
  // State for current radio and fetches the Now_Playing radio data from the server
  const [radioData, setRadioData] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://www.cjsf.ca/api/station/now_playing',
      );
      const json = await response.json();
      setRadioData(json);
    };
    // const retrieveLikedData = async () => {
    //   isLiked = await AsyncStorage.getItem(radioData.program_id);
    //   if (isLiked === 'is') {
    //     setIsLiked(true);
    //   } else {
    //     setIsLiked(false);
    //   }
    //   console.log('is liked: ' + isLiked);
    // };
    const fetchSchedule = async () => {
      const response = await fetch(
        'https://www.cjsf.ca/api/station/programs_by_week',
      );
      const json = await response.json();
      AsyncStorage.setItem('schedule', JSON.stringify(json));
    };
    const fetchUpcoming = async () => {
      const response = await fetch('https://www.cjsf.ca/api/station/upcoming');
      const json = await response.json();
      setUpcoming(json);
    };
    fetchData().then(() => {
      // retrieveLikedData();
    });
    fetchSchedule();
    fetchUpcoming();
  }, []);

  // Height of the header
  const radioHeaderHeight = getStatusBarHeight() + 50;

  // state for the height and width of the screen
  const [width, setWidth] = useState(window.width);
  const [height, setHeight] = useState(window.height);

  // state for the upcoming broadcasts panel
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: false,
    showCloseButton: true,
    closeOnTouchOutside: true,
    noBackgroundOpacity: true,
    noBar: true,
    scrollViewProps: {
      horizontal: true,
      showsHorizontalScrollIndicator: false,
    },
    onlySmall: true,
    barTextStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'red',
    },
    style: {
      height: Dimensions.get('screen').height * 1.12,
      paddingTop: 20,
      paddingBottom: 0,
      paddingLeft: 20,
      paddingRight: 20,
      opacity: 1,
      backgroundColor: 'rgba(39,2,61,1)',
      blurRadius: 1,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    closeRootStyle: {
      backgroundColor: 'white',
    },
    closeIconStyle: {
      backgroundColor: 'black',
      fontSize: 30,
    },

    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);
  const openPanel = () => {
    setIsPanelActive(true);
  };
  const closePanel = () => {
    setIsPanelActive(false);
  };

  // state for radio player
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    audio.setVolume(1);
    return () => {
      audio.release();
    };
  }, []);

  const playPause = () => {
    if (audio.isPlaying()) {
      audio.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
      audio.play(success => {
        if (success) {
          setPlaying(false);
          console.log('successfully finished playing');
        } else {
          setPlaying(false);
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };

  // share function
  const onShare = async () => {
    const url = 'https://www.cjsf.ca';
    const title = radioData.title;
    try {
      const result = await Share.share({
        message:
          'Tune in and join me to listen to "' +
          title +
          '" featured on CJSF 90.1 FM today! ' +
          url,
      });
      if (result.action === Share.sharedAction) {
        console.log('Shared');
      } else {
        alert('Share was cancelled');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // console logging the radio data
  useEffect(() => {
    console.log('radioData', radioData);
  }, [radioData]);

  useEffect(() => {
    console.log('upcoming', upcoming);
  }, [upcoming]);

  const [isModalVisible, setModalVisible] = useState(false);

  const renderMoreModal = () => {
    return (
      <View>
        <Modal
          style={{justifyContent: 'center'}}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          isVisible={isModalVisible}
          animationIn="slideInUp">
          <View
            style={{
              backgroundColor: 'white',
              padding: 30,
              borderRadius: 15,
              maxHeight: '80%',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '80%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottomWidth: 2,
                  paddingBottom: 10,
                  borderBottomColor: 'rgba(0,0,0,0.5)',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  More Options
                </Text>
              </View>
              <View style={{width: '100%', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 35,
                    marginBottom: 20,
                    // margin: 30,
                  }}
                  onPress={() => {
                    console.log('view on site clicked');
                    Linking.openURL('https://www.cjsf.ca');
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#3D225A',
                    }}>
                    Learn More on Website
                  </Text>
                  <Icon name="chevron-right" size={20} color="blue" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  // render the radio Screen
  return (
    <ImageBackground
      source={require('../../../assets/images/radioBackground.png')}
      style={{flex: 1, width: '100%', height: '100%'}}>
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}>
            <View style={styles.container} back>
              <Header
                title={'On Air Now'}
                backgroundColor={'transparent'}
                height={radioHeaderHeight}
                isRadio
              />
              <View style={styles.radioStation}>
                <RadioCard
                  title={radioData.title}
                  startTime={radioData.start_time}
                  endTime={radioData.end_time}
                  description={radioData.description}
                  shortDescription={radioData.short_description}
                  startSpinning={playing}
                  backgroundColor={'#573979'}
                  color={'#FFFEFF'}
                  id={radioData.program_id}
                  isFav={isLiked}
                />
              </View>
              <View style={styles.functions}>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={() => {
                    console.log('share button pressed');
                    onShare();
                  }}>
                  <IIcon
                    name="share-social-outline"
                    size={30}
                    color={'white'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    playPause();
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 0}}
                    colors={['#8316E8', '#D424A1']}
                    style={styles.playButton}>
                    <Icon
                      name={!playing ? 'play-arrow' : 'pause'}
                      size={40}
                      color="white"
                    />
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() => {
                    console.log('more button pressed');
                    setModalVisible(true);
                  }}>
                  <Icon name="menu" size={30} color="white" />
                  {renderMoreModal()}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <View style={styles.panel}>
            <TouchableOpacity
              style={[
                !isPanelActive ? styles.panelActive : styles.panelInActive,
              ]}
              onPress={() => {
                openPanel();
              }}>
              <Text style={styles.panelButtonText}>Upcoming Broadcasts</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <SwipeablePanel {...panelProps} isActive={isPanelActive}>
          <View
            style={{
              position: 'absolute',
              top: -5,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
              }}>
              Upcoming Broadcasts
            </Text>
          </View>
          <View style={{position: 'absolute', marginTop: 10}}>
            <DayList
              data={upcoming}
              upcoming
              // width={'100%'}
              width={0.88 * Dimensions.get('screen').width}
              // height={0.08 * Dimensions.get('window').height}
              // height={0.075 * Dimensions.get('screen').height}
            />
          </View>
        </SwipeablePanel>
      </View>
    </ImageBackground>
  );
}

export default Radio;
