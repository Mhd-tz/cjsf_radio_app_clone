import * as React from 'react';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Header.style';

export default function Header({
  title,
  backgroundColor,
  height,
  isRadio,
  isSchedule,
  isFavorites,
  isAbout,
}) {
  const navigation = useNavigation();

  const radioHeaderHeight = getStatusBarHeight() + 50;
  const aboutHeaderHeight = getStatusBarHeight() + 40;

  const onPressAbout = () => {
    console.log('onPressAbout');
    navigation.navigate('About');
  };

  // const onPressBack = () => {
  //   navigation.goBack();
  // };

  if (isAbout) {
    return (
      <View style={[styles.container, {height: height}]}>
        <View style={[styles.aboutHeader, {backgroundColor: backgroundColor}]}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}>
            <Icon name="ios-arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.aboutTitle}>{title}</Text>
        </View>
      </View>
    );
  } else if (isRadio) {
    return (
      <View style={[styles.container, {height: height}]}>
        <View style={[styles.radioHeader, {backgroundColor: backgroundColor}]}>
          <Text style={styles.radioTitle}>{title}</Text>
          <TouchableOpacity
            style={styles.aboutIcon}
            onPress={() => navigation.navigate('About')}>
            <View style={styles.aboutIcon}>
              <Icon
                name="md-information-circle-outline"
                size={30}
                color={'white'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (isSchedule) {
    return (
      <View style={[styles.scheduleContainer, {height: height}]}>
        <View
          style={[styles.scheduleHeader, {backgroundColor: backgroundColor}]}>
          <Text style={styles.scheduleTitle}>{title}</Text>
        </View>
      </View>
    );
  }
}
