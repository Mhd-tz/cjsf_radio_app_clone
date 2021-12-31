import * as React from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useState, useEffect} from 'react';
import Card from '../Card/Card';

export default function DayList({
  data,
  scheduleData,
  width,
  height,
  upcoming,
  schedule,
  favorites,
}) {
  const renderItem = ({item}) => (
    <Card
      width={width}
      height={height}
      title={item.title}
      startTime={item.start_time}
      endTime={item.end_time}
      description={item.description}
      shortDescription={item.short_description}
      id={item.id}
      upcoming={upcoming}
    />
  );
  const renderSchItem = ({item}) => (
    <Card
      width={width}
      height={height}
      title={item.title}
      startTime={item.start_time}
      endTime={item.end_time}
      description={item.description}
      shortDescription={item.short_description}
      id={item.id}
      schedule={schedule}
    />
  );
  const renderModal = () => {
    if (upcoming) {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={item => item.program_id.toString()}
            renderItem={renderItem}
          />
        </SafeAreaView>
      );
    } else if (schedule) {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={item => item.program_id.toString()}
            renderItem={renderSchItem}
          />
        </SafeAreaView>
      );
    } else if (favorites) {
      return <SafeAreaView style={styles.container}></SafeAreaView>;
    }
  };
  return <View>{renderModal()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'column',
  },
});
