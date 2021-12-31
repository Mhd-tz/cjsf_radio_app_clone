import * as React from 'react';
import {
  Text,
  View,
  SectionList,
  RefreshControl,
  Dimensions,
} from 'react-native';

import {useState, useEffect} from 'react';

import DayList from '../DayList/DayList';

export default function WeekList({data}) {
  var daysData = [
    data.Sunday,
    data.Monday,
    data.Tuesday,
    data.Wednesday,
    data.Thursday,
    data.Friday,
    data.Saturday,
  ];

  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  var date = new Date();
  var today = date.getDay();
  console.log('todayData', daysData[today]);

  return (
    <View>
      <SectionList
        scrollEventThrottle={50}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <DayList
            schedule
            data={item}
            width={0.75 * Dimensions.get('window').width}
            height={130}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                marginLeft: 22,
                color: 'grey',
              }}>
              {title}
            </Text>
            <View
              style={{
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                marginLeft: 22,
              }}
            />
          </View>
        )}
        sections={[
          {title: 'Today', data: [daysData[today]]},
          {title: 'Tomorrow', data: [daysData[today + 1]]},
          {title: days[(today + 2) % 7], data: [daysData[(today + 2) % 7]]},
          {title: days[(today + 3) % 7], data: [daysData[(today + 3) % 7]]},
          {title: days[(today + 4) % 7], data: [daysData[(today + 4) % 7]]},
          {title: days[(today + 5) % 7], data: [daysData[(today + 5) % 7]]},
          {title: days[(today + 6) % 7], data: [daysData[(today + 6) % 7]]},
        ]}
        keyExtractor={(item, index) => item + index.toString()}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={() => {
          return <View style={{height: 10}} />;
        }}
        ListFooterComponent={() => {
          return <View style={{height: 25}} />;
        }}
      />
    </View>
  );
}
