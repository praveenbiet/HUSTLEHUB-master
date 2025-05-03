// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import StudentHome from '../screens/student/StudentHome';
import AdminSignInScreen from '../screens/admin/AdminSignInScreen';
import PostJobScreen from '../screens/admin/PostJobScreen';
import ApplyJobScreen from '../screens/student/ApplyJobScreen';
import ViewPostedJobsScreen from '../screens/admin/ViewPostedJobsScreen';
import JobApplicationsScreen from '../screens/admin/JobApplicationsScreen';
import MyApplicationsScreen from '../screens/student/MyApplicationsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="SignIn" 
          component={SignInScreen}
          options={{ title: 'Sign In' }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen 
          name="StudentHome" 
          component={StudentHome}
          options={{ title: 'Student Home' }}
        />
        <Stack.Screen 
          name="AdminSignIn" 
          component={AdminSignInScreen}
          options={{ title: 'Admin Sign In' }}
        />
        <Stack.Screen 
          name="PostJob" 
          component={PostJobScreen}
          options={{ title: 'Post Job' }}
        />
        <Stack.Screen 
          name="ApplyJob" 
          component={ApplyJobScreen}
          options={{ title: 'Apply for Job' }}
        />
        <Stack.Screen 
          name="ViewPostedJobs" 
          component={ViewPostedJobsScreen}
          options={{ title: 'Posted Jobs' }}
        />
        <Stack.Screen 
          name="JobApplications" 
          component={JobApplicationsScreen}
          options={{ title: 'Job Applications' }}
        />
        <Stack.Screen 
          name="MyApplications" 
          component={MyApplicationsScreen}
          options={{ title: 'My Applications' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
