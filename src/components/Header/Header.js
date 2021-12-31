import * as React from 'react';
import {useState} from 'react';
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
  const [about, setAbout] = useState(false);
  //function to toggle about
  // const toggleAbout = () => {
  //   setAbout(!about);
  // };

  const radioHeaderHeight = getStatusBarHeight() + 50;
  const aboutHeaderHeight = getStatusBarHeight() + 40;

  if (isAbout) {
    return (
      <View style={[styles.aboutContainer, {height: aboutHeaderHeight}]}>
        <View style={[styles.aboutHeader, {backgroundColor: 'blue'}]}>
          <TouchableOpacity style={styles.backIcon}>
            <Text style={styles.backIconText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.aboutTitle}>About</Text>
        </View>
      </View>
    );
  } else if (isRadio) {
    return (
      <View style={[styles.container, {height: height}]}>
        <View style={[styles.radioHeader, {backgroundColor: backgroundColor}]}>
          <Text style={styles.radioTitle}>{title}</Text>
          <TouchableOpacity style={styles.aboutIcon}>
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
