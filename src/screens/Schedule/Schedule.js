import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useState, useEffect} from 'react';
import WeekList from '../../components/WeekList/WeekList';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Schedule() {
  //Height of the header
  const headerHeight = getStatusBarHeight() + 50;
  const [schedule, setSchedule] = useState([]);
  // fetch weekly schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        scheduleData = await AsyncStorage.getItem('schedule');
        scheduleData = JSON.parse(scheduleData);
        setSchedule(scheduleData);
      } catch (e) {
        console.log('error fetching the schedule:' + e);
      }
    };
    fetchSchedule();
  }, []);

  // useEffect(() => {
  //   console.log('schedule', schedule);
  // }, [schedule]);
  return (
    <ImageBackground
      source={require('../../../assets/images/ScheduleBackground.jpg')}
      style={{width: '100%', height: '100%', flex: 1}}>
      <View style={{flex: 1, padding: 0, margin: 0}}>
        <SafeAreaView>
          <View>
            <WeekList
              data={schedule}
              title={'Schedule'}
              width={0.4 * Dimensions.get('window').width}
              height={0.3 * Dimensions.get('screen').height}
            />
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

export default Schedule;
