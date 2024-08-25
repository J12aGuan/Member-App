import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/Octicons';

import CalendarScreen from '../screens/CalendarScreen';
import AdminScreen from '../screens/AdminScreen';
import ChallengesNavigator from '../navigation/ChallengesNavigator';
import DashboardNavigator from './DashboardNavigator';
import SocialsScreen from '../screens/SocialsScreen';

import adminCheck from '../components/AdminCheck';

const Tab = createBottomTabNavigator();
const isAdmin = false;

const AppNavigator = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await adminCheck();
      setIsAdmin(adminStatus);
    };

    setInterval(() => {
      checkAdminStatus();
    }, 1000);
  }, []);

  return (<Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        elevation: 0,
        position: 'absolute',
      },
    }}
  >
    <Tab.Screen
      name="DashboardNavigator"
      component={DashboardNavigator}
      options={{
        tabBarIcon: ({ size }) => (
          <Icons name="home" size={size} color={'#fff'} />
        ),
        title: '',
      }}
    />
    <Tab.Screen
      name="Calendar"
      component={CalendarScreen}
      options={{
        tabBarIcon: ({ size }) => (
          <Icons name="calendar" size={size} color={'#fff'} />
        ),
        title: '',
      }}
    />
    {isAdmin && (
      <Tab.Screen
        name="AdminPage"
        component={AdminScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Icons name="tools" size={size} color={'#fff'} />
          ),
          title: '',
        }}
      />
    )}
    <Tab.Screen
      name="Challenges"
      component={ChallengesNavigator}
      options={{
        tabBarIcon: ({ size }) => (
          <Icons name="list-ordered" size={size} color={'#fff'} />
        ),
        title: ''
      }}
    />
    <Tab.Screen
      name="Socials"
      component={SocialsScreen}
      options={{
        tabBarIcon: ({ size }) => (
          <Icons name="people" size={size} color={'#fff'} />
        ),
        title: '',
      }}
    />
  </Tab.Navigator>
);};

export default AppNavigator;
