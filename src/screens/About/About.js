import * as React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useState, useEffect, useRef, useCallback, memo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/Header/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ABOUT_BODY1,
  ABOUT_HEADER1,
  ABOUT_HEADER2,
  ABOUT_HEADER3,
  ABOUT_BODY2,
  ABOUT_BODY3,
} from '../../../assets/constants/ABOUT_SCREEN.js';

export default function About({navigation, route}) {
  return (
    <View style={styles.container}>
      {/* <Header title="About" height={10} backgroundColor={'red'} isAbout /> */}
      <View style={styles.headerContainer}>
        <View style={styles.backIconContainer}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}>
            <Icon name="ios-arrow-back" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>About</Text>
        </View>
      </View>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}>
            <View style={styles.aboutHeaderContainer}>
              <Text style={styles.header}> {ABOUT_HEADER1}</Text>
            </View>
            <View style={styles.aboutBodyContainer}>
              <Text style={styles.body}>{ABOUT_BODY1}</Text>
            </View>
            <View style={styles.aboutHeaderContainer}>
              <Text style={styles.header}>{ABOUT_HEADER2}</Text>
            </View>
            <View style={styles.aboutBodyContainer}>
              <Text style={styles.body}>{ABOUT_BODY2}</Text>
            </View>
            <View style={styles.aboutHeaderContainer}>
              <Text style={styles.header}>{ABOUT_HEADER3}</Text>
            </View>
            <View style={styles.aboutHeaderContainer}>
              <Text style={styles.body}>{ABOUT_BODY3}</Text>
            </View>
            <View style={styles.footerContainer}>
              <Text style={styles.footer}>footer</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    backgroundColor: '#F9F7F6',
  },
  headerContainer: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
    height: '10%',
    backgroundColor: '#3D225A',
  },
  backIconContainer: {
    position: 'absolute',
    left: 10,
  },
  backIcon: {
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  aboutHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    // backgroundColor: 'blue',
  },
  header: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    // paddingTop: 50,
  },
  aboutBodyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  body: {
    color: 'black',
    fontSize: 15,
    lineHeight: 25,
    // textAlign: 'justify',
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 25,
    // backgroundColor: 'blue',
  },
  footer: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    // paddingTop: 50,
  },
});
