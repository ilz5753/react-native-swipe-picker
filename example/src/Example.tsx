import React, { useCallback, useMemo, useState } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';
import SwipePicker, {
  type ISwipePickerId,
  type ISwipePickerItem,
} from '@ilz5753/react-native-swipe-picker';

const itemHeight = 90;

interface Account extends ISwipePickerId {
  fullName: string;
  address: string;
  uri: string;
}

const JennieNichols: Account = {
  id: '0',
  fullName: 'Jennie Nichols',
  address: 'Valwood Pkwy',
  uri: 'https://randomuser.me/api/portraits/women/1.jpg',
};
const LuisHayes: Account = {
  id: '1',
  fullName: 'Luis Hayes',
  address: 'Brown Terrace',
  uri: 'https://randomuser.me/api/portraits/men/1.jpg',
};
const TimmothyJennings: Account = {
  id: '2',
  fullName: 'Timmothy Jennings',
  address: 'Little York Rd',
  uri: 'https://randomuser.me/api/portraits/men/2.jpg',
};
const JeanneWatkins: Account = {
  id: '3',
  fullName: 'Jeanne Watkins',
  address: 'Paddock Way',
  uri: 'https://randomuser.me/api/portraits/men/3.jpg',
};
const MarleneTorres: Account = {
  id: '4',
  fullName: 'Marlene Torres',
  address: 'Sandy Lake Rd',
  uri: 'https://randomuser.me/api/portraits/women/2.jpg',
};

const accounts: Account[] = [
  JennieNichols,
  LuisHayes,
  TimmothyJennings,
  JeanneWatkins,
  MarleneTorres,
];

function RenderAccount({ item, itemHeight }: ISwipePickerItem<Account>) {
  let imgSize = useMemo(() => itemHeight * 0.75, [itemHeight]);
  return (
    <View
      style={[
        styles.fdr,
        styles.aic,
        styles.jcsb,
        styles.ph8,
        { height: itemHeight },
      ]}
    >
      <View style={[styles.fdr, styles.aic, styles.gap8]}>
        <Image
          style={[
            { width: imgSize, height: imgSize, borderRadius: imgSize / 2 },
          ]}
          source={{ uri: item.uri }}
        />
        <View style={[styles.gap8]}>
          <Text style={[styles.fullName]}>{item.fullName}</Text>
          <Text style={[styles.address]}>{item.address}</Text>
        </View>
      </View>
    </View>
  );
}
export default function Example() {
  const [activeAccount, setActiveAccount] = useState(JennieNichols);
  let onSelectItem = useCallback((acc: Account) => setActiveAccount(acc), []);
  return (
    <View style={[styles.f1, styles.ph8, styles.pv24, styles.gap24]}>
      <Text style={[styles.title]}>Select your account</Text>
      <SwipePicker
        {...{
          items: accounts,
          renderItem: RenderAccount,
          itemHeight,
          onSelectItem,
        }}
      />
      <Text style={[styles.title]}>Selected account</Text>
      <Animated.View
        style={[styles.selected]}
        entering={FadeInUp}
        exiting={FadeOutUp}
        layout={LinearTransition}
      >
        <RenderAccount
          {...{
            item: activeAccount,
            itemHeight,
            index: 0,
          }}
        />
      </Animated.View>
    </View>
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
  gap8: {
    gap: 8,
  },
  gap24: {
    gap: 24,
  },
  ph8: {
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 21,
    fontWeight: '900',
    color: 'black',
    textAlign: 'center',
  },
  fullName: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
  },
  address: {
    fontSize: 15,
    fontWeight: '400',
    color: 'gray',
  },
  pv24: {
    paddingVertical: 24,
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});
