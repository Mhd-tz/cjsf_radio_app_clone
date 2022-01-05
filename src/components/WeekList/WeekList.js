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

export default function WeekList({data, title, width, height}) {
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
          <DayList schedule data={item} width={width} height={height} />
        )}
        renderSectionHeader={({section: {title}}) => (
          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '500',
                marginLeft: 22,
                color: 'white',
                marginTop: 20,
              }}>
              {title}
            </Text>
            <View
              style={{
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: 'black',
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
          return (
            <View
              style={{
                height: 70,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 24,
                  marginTop: 10,
                }}>
                {title}
              </Text>
            </View>
          );
        }}
        ListFooterComponent={() => {
          return <View style={{height: 100}} />;
        }}
      />
    </View>
  );
}
