import * as React from 'react';
import {Text, View, SafeAreaView, ImageBackground} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useState, useEffect} from 'react';
import WeekList from '../../components/WeekList/WeekList';
import Header from '../../components/Header/Header';

function Schedule() {
  //Height of the header
  const headerHeight = getStatusBarHeight() + 50;
  const [schedule, setSchedule] = useState([]);
  // fetch weekly schedule
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://www.cjsf.ca/api/station/programs_by_week',
      );
      const json = await response.json();
      setSchedule(json);
    };
    fetchData();
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
            <WeekList data={schedule} title={'Schedule'} />
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

export default Schedule;
