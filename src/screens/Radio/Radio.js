import * as React from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {useState, useEffect} from 'react';
import {SwipeablePanel} from 'rn-swipeable-panel';

import styles from './Radio.Style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';
// import SoundPlayer from 'react-native-sound-player';
// import Sound from 'react-native-sound';

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

// Sound.setCategory('Playback');

// const audio = new Sound('https://www.cjsf.ca:8443/listen-hq', null, error => {
//   if (error) {
//     console.log('failed to load the sound', error);
//     return;
//   }
//   // audio.play(success => {
//   //   if (success) {
//   //     console.log('successfully finished playing');
//   //   } else {
//   //     console.log('playback failed due to audio decoding errors');
//   //   }
//   // });
//   // if loaded successfully
//   console.log(
//     'duration in seconds: ' +
//       audio.getDuration() +
//       'number of channels: ' +
//       audio.getNumberOfChannels(),
//   );
// });

// var Sound = require('react-native-sound');

// Sound.setCategory('Playback');

// var audio = new Sound('https://www.cjsf.ca:8443/listen-hq', null, error => {
//   if (error) {
//     console.log('failed to load the sound', error);
//     return;
//   }
//   // if loaded successfully
//   console.log(
//     'duration in seconds: ' +
//       audio.getDuration() +
//       'number of channels: ' +
//       audio.getNumberOfChannels(),
//   );
// });

function Radio() {
  // Height of the header
  const radioHeaderHeight = getStatusBarHeight() + 50;

  // state for the height and width of the screen
  const [width, setWidth] = useState(window.width);
  const [height, setHeight] = useState(window.height);

  // state for the Upcoming Broadcasts and fetching the data from the API
  const [upcoming, setUpcoming] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://www.cjsf.ca/api/station/upcoming');
      const json = await response.json();
      setUpcoming(json);
    };
    fetchData();
  }, []);

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

  // useEffect(() => {
  //   audio.setVolume(1);
  //   return () => {
  //     audio.release();
  //   };
  // }, []);

  // const playPause = () => {
  //   if (audio.isPlaying()) {
  //     audio.pause();
  //     setPlaying(false);
  //   } else {
  //     setPlaying(true);
  //     audio.play();
  //   }
  // };
  // const playPause = () => {
  //   if (playing) {
  //     SoundPlayer.stop();
  //     setPlaying(false);
  //   } else {
  //     SoundPlayer.playUrl('https://www.cjsf.ca:8443/listen-hq');
  //     setPlaying(true);
  //   }
  // };

  // useEffect(() => {
  //   console.log('playing', playing);
  // }, [playing]);
  //   useEffect(() => {
  //     audio.setVolume(1);
  //     return () => {
  //       audio.release();
  //     };
  //   }, []);
  //   const playPause = () => {
  //     if (audio.isPlaying()) {
  //       audio.pause();
  //       setPlaying(false);
  //     } else {
  //       setPlaying(true);
  //       audio.play(success => {
  //         if (success) {
  //           setPlaying(false);
  //           console.log('successfully finished playing');
  //         } else {
  //           setPlaying(false);
  //           console.log('playback failed due to audio decoding errors');
  //         }
  //       });
  //     }
  //   };

  // State for current radio and fetches the Now_Playing radio data from the server
  const [radioData, setRadioData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://www.cjsf.ca/api/station/now_playing',
      );
      const json = await response.json();
      setRadioData(json);
    };
    fetchData();
  }, []);

  // console logging the radio data
  useEffect(() => {
    console.log('radioData', radioData);
  }, [radioData]);

  useEffect(() => {
    console.log('upcoming', upcoming);
  }, [upcoming]);

  // const [schedule, setSchedule] = useState([]);
  // // fetch weekly schedule
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       'https://www.cjsf.ca/api/station/programs_by_week',
  //     );
  //     const json = await response.json();
  //     setSchedule(json);
  //   };
  //   fetchData();
  // }, []);

  // const [day, setDay] = useState([]);
  // // setDays to the days of the current radio program

  // useEffect(() => {
  // const fetchData = async () => {
  //   const response = await fetch(
  //     'https://www.cjsf.ca/api/station/programs_by_week',
  //   );
  // const json = await response.json();
  // // search the current radio program days and set the day state
  // const days = json.filter(
  //   item => item.program_id === radioData.program_id,
  // );
  // setDay(days);
  //   const getDays = async () => {
  //     const url = 'https://www.cjsf.ca/api/station/programs_by_week';
  //     fetch(url)
  //       .then(res => res.json())
  //       .then(res =>
  //         res.filter(item => item.program_id === radioData.program_id),
  //       )
  //       .then(res => {
  //         setDay(res);
  //       })
  //       .catch(error => console.error(error));
  //   };
  //   getDays();
  // }, []);

  // useEffect(() => {
  //   console.log('day', day);
  // }, [day]);

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
                />
              </View>
              <View style={styles.functions}>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={() => {
                    console.log('share button pressed');
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
                  }}>
                  <Icon name="menu" size={30} color="white" />
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
