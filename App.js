import 'react-native-gesture-handler';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Favorites from './src/screens/Favorites/Favorites';
import Radio from './src/screens/Radio/Radio';
import Schedule from './src/screens/Schedule/Schedule';
import About from './src/screens/About/About';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const headerHeight = getStatusBarHeight() + 50;

function infoTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Radio"
        component={Radio}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#A0ABB8',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#2F1947',
          height: 60,
          paddingTop: 5,
          paddingBottom: 5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopColor: '#2F1947',
        },
      }}
      initialRouteName="Home"
      lazy="false"
      barStyle={{backgroundColor: 'red'}}
      activeColor="#000"
      inactiveColor="#cfd8dc">
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'red',
            height: headerHeight,
            shadowColor: '#000',
            shadowOpacity: 1,
            elevation: 7,
          },
          headerTitleStyle: {color: 'white', padding: 10},
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? 'white' : '#cfd8dc', fontSize: 11}}>
              Favorites
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            <Icon name="favorite-border" size={27} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={infoTab}
        listeners={({navigation}) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            // Navigate to the Details route with params
            navigation.navigate('Home');
          },
        })}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? 'white' : '#cfd8dc', fontSize: 11}}>
              Radio
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            // <FAIcon name="play-circle" size={30} color={color} />
            <Icon name="play-circle-outline" size={28} color={color} />
            // <FontAwesomeIcon icon={faCircleDot} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          headerShown: false,
          // headerStyle: {
          //   backgroundColor: 'transparent',
          //   height: headerHeight,
          //   // shadowColor: '#000',
          //   // shadowOpacity: 1,
          //   // elevation: 7,
          // },
          // headerTitleStyle: {color: 'white', padding: 10},
          tabBarLabel: ({focused, color}) => (
            <Text style={{color: focused ? 'white' : '#cfd8dc', fontSize: 11}}>
              Schedule
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            // <FontAwesomeIcon icon={faCalendar} size={size} color={color} />
            <Icon name="date-range" size={28} color={color} />
            // <FAIcon name="calendar" size={size} color={color} />
          ),
        }}
      />
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
