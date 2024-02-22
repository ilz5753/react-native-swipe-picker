# @ilz5753/react-native-swipe-picker

`@ilz5753/react-native-swipe-picker` is a React Native library that provides an inline picker component with a swipe-to-select-an-item interaction. It is similar to the input mechanism used in apps like SHealth, where users can swipe left or right to select a value from a list of options.
This library allows you to create a user-friendly and intuitive picker component for your React Native applications, making it easier for users to input data or make selections without the need for traditional dropdown menus or modal pickers.

## Installation

```sh
npm install @ilz5753/react-native-swipe-picker
# yarn
yarn add @ilz5753/react-native-swipe-picker
# bun
bun add @ilz5753/react-native-swipe-picker
```

## Usage

```tsx
import SwipePicker, {
  type ISwipePickerId,
  type ISwipePickerItem,
} from '@ilz5753/react-native-swipe-picker';

//

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

const accounts: Account[] = [JennieNichols];

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
          <Text>{item.fullName}</Text>
          <Text>{item.address}</Text>
        </View>
      </View>
    </View>
  );
}

export default function Example() {
  const [activeAccount, setActiveAccount] = useState(JennieNichols);
  let onSelectItem = useCallback((acc: Account) => setActiveAccount(acc), []);
  return (
    <View style={[styles.f1, styles.aic, styles.jcc, styles.gap8]}>
      <SwipePicker
        {...{
          items: accounts,
          renderItem: RenderAccount,
          itemHeight,
          onSelectItem,
        }}
      />
      {activeAccount && (
        <Animated.View
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
      )}
    </View>
  );
}
```

## Features

The `@ilz5753/react-native-swipe-picker` library offers several features to help you create a customizable and accessible inline picker component for your React Native applications:

1. **Swipe-to-select interaction:** Users can easily swipe left or right to select a value from a list of options, providing a more intuitive and engaging experience compared to traditional dropdown menus or modal pickers.
2. **Customizable appearance:** You can customize various aspects of the picker component, such as the text color, background color, font size, and item padding. This allows you to match the component's appearance to your app's theme and branding.
3. **Lightweight and performant:** The component is lightweight and designed to have minimal impact on the performance of your React Native applications, ensuring a smooth and responsive user experience.
4. **Cross-platform support:** The library works well on both iOS and Android platforms, enabling you to create consistent user experiences across different devices and operating systems.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

This project Licensed under the [MIT License](/LICENSE).

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
