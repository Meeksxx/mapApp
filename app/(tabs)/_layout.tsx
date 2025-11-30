import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => (
  <Stack>
    <Stack.Screen
      name="index"
      options={{
        title: 'Home',
        headerTitleAlign: 'center',   // <-- THIS CENTERS THE TITLE
      }}
    />
  </Stack>
);

export default Layout;
