import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Favorites from './src/screens/Favorites/Favorites';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const headerHeight = getStatusBarHeight() + 50;

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      }}
      initialRouteName="Home"
      lazy="false"
      barStyle={{backgroundColor: '#fff'}}
      activeColor="#000"
      inactiveColor="#cfd8dc">
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'green',
            height: headerHeight,
            shadowColor: '#000',
            shadowOpacity: 1,
            elevation: 7,
          },
          headerTitleStyle: {color: 'white', padding: 10},
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? '#000' : '#cfd8dc', fontSize: 12}}>
              Favorites
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            <Icon name="favorite-border" size={28} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Home"
        component={Radio}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? '#000' : '#cfd8dc', fontSize: 12}}>
              Radio
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            // <FAIcon name="play-circle" size={30} color={color} />
            <Icon name="play-circle-outline" size={28} color={color} />
            // <FontAwesomeIcon icon={faCircleDot} size={size} color={color} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'blue',
            height: headerHeight,
            shadowColor: '#000',
            shadowOpacity: 1,
            elevation: 7,
          },
          headerTitleStyle: {color: 'white', padding: 10},
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? '#000' : '#cfd8dc', fontSize: 12}}>
              Schedule
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            // <FontAwesomeIcon icon={faCalendar} size={size} color={color} />
            <Icon name="date-range" size={28} color={color} />
            // <FAIcon name="calendar" size={size} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
