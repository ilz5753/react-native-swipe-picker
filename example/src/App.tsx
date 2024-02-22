import React from 'react';

import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Example from './Example';

export default function App() {
  return (
    <GestureHandlerRootView style={[styles.f1]}>
      <Example />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  aic: {
    alignItems: 'center',
  },
  f1: {
    flex: 1,
  },
  jcc: {
    justifyContent: 'center',
  },
  fdr: {
    flexDirection: 'row',
  },
  jcsb: {
    justifyContent: 'space-between',
  },
  gap: {
    gap: 8,
  },
});
