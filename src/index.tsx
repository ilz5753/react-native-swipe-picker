import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface SwipePickerId {
  id: string;
}

export interface SwipePickerItem<T> {
  item: T;
  index: number;
  itemHeight: number;
}
export interface SwipePickerProps<T extends SwipePickerId> {
  itemHeight: number;
  items: T[];
  renderItem(itemData: SwipePickerItem<T>): React.JSX.Element;
  // visibleItems?: 3 | 5 | 7;
  /**
   * for now just supports `3` items
   */
  visibleItems?: 3;
  onSelectItem(item: T): void;
  duration?: number;
  disabled?: boolean;
  overlayColor?: string;
}

// interface ISwipePickerRef {}

export default function SwipePicker<T extends SwipePickerId>({
  itemHeight,
  items,
  renderItem,
  visibleItems,
  duration = 500,
  onSelectItem,
  disabled,
  overlayColor = 'rgba(0, 0, 0, 0.24)',
}: SwipePickerProps<T>) {
  let vi = useMemo(() => {
    let r = 3;
    // switch (visibleItems) {
    //   // case 3:
    //   case 5:
    //   case 7:
    //     r = visibleItems;
    //   default:
    //     break;
    // }
    return r;
  }, [visibleItems]);
  //   let [activeIndex, setActiveIndex] = useState(0);
  //   let select = useCallback(
  //     () => onSelectItem(items[activeIndex]),
  //     [onSelectItem, activeIndex, items],
  //   );
  // let vi = useMemo(() => visibleItems ?? 3, [visibleItems]);
  let timing = useMemo(() => ({ duration }), [duration]);
  let vih = useMemo(() => Math.floor(vi / 2), [vi]);
  let length = useMemo(() => items.length, [items]);
  let maxHeight = useMemo(() => vi * itemHeight, [vi, itemHeight]);
  let maxItems = useMemo(() => length - (vih + 1), [vih, length]);
  let maxSwipeHeight = useMemo(
    () => maxItems * itemHeight,
    [maxItems, itemHeight]
  );
  let start = useMemo(() => vih * itemHeight, [vih, itemHeight]);
  let ty = useSharedValue(start);
  let hty = useSharedValue(start);
  let update = useCallback(
    (Ty: number, hasTiming = false) => {
      'worklet';
      let half = itemHeight * 0.5;
      let resultTy = Ty,
        // ind = activeIndex;
        index = 0;
      if (Ty > start - half) {
        resultTy = start;
        index = 0;
      } else if (Ty < -maxSwipeHeight + half) {
        resultTy = -maxSwipeHeight;
        index = length - 1;
      } else {
        for (let i = 1; i < length; i++) {
          let p = (-i + 1) * itemHeight - half;
          let n = p + itemHeight;
          if (Ty >= p && Ty < n) {
            resultTy = p + half;
            index = i;
          }
        }
      }
      let currentItem = items[index]!;
      if (hasTiming)
        ty.value = withTiming(resultTy, timing, (f) => {
          //   if (f) runOnJS(setActiveIndex)(ind);
          if (f) runOnJS(onSelectItem)(currentItem);
        });
      else {
        ty.value = resultTy;
        // runOnJS(setActiveIndex)(ind);
        runOnJS(onSelectItem)(currentItem);
      }
      hty.value = resultTy;
    },
    [itemHeight, start, maxSwipeHeight, length, timing, onSelectItem]
  );
  let gesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate(({ translationY }) => {
          let t = hty.value + translationY;
          ty.value = t;
          //   update(t);
        })
        .onEnd(() => {
          update(ty.value, true);
        })
        .enabled(!disabled),
    [disabled]
  );
  let translateStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: ty.value,
      },
    ],
  }));
  let overlayStyles = useMemo(
    () => [{ height: start, backgroundColor: overlayColor }, styles.overlay],
    [start, overlayColor]
  );
  // useImperativeHandle(ref, () => {
  //   return {};
  // });
  return (
    <View
      {...{
        style: [{ height: maxHeight }, styles.container],
      }}
    >
      <GestureDetector {...{ gesture }}>
        <Animated.View
          {...{
            style: [translateStyle],
          }}
        >
          {items.map((item, index) => (
            <View {...{ key: item.id }}>
              {renderItem({ item, index, itemHeight })}
            </View>
          ))}
        </Animated.View>
      </GestureDetector>
      <View
        {...{
          style: [overlayStyles, styles.zeroTop],
        }}
      />
      <View
        {...{
          style: [overlayStyles, styles.zeroBottom],
        }}
      />
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  overlay: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  zeroTop: {
    top: 0,
  },
  zeroBottom: {
    bottom: 0,
  },
});
