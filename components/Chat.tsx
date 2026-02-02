import { BlurView } from "expo-blur";
import React, { useEffect } from "react";
import { FlatList, FlatListProps, ListRenderItem, View } from "react-native";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

type TikTokMessageProps<T> = Omit<FlatListProps<T>, "renderItem"> & {
  renderItems: ListRenderItem<T>;
};

function AnimatedItem({
  index,
  children,
  totalItems,
}: {
  index: number;
  children: React.ReactNode;
  totalItems: number;
}) {
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 500 });
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  const blurIntensity = Math.min(index * 3, 20);
  const fadeOpacity = interpolate(
    index,
    [0, 3, totalItems],
    [1, 0.8, 0.3],
    Extrapolation.CLAMP,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value * fadeOpacity,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <BlurView intensity={blurIntensity} tint="dark">
        {children}
      </BlurView>
    </Animated.View>
  );
}

export default function Chat<T>({
  renderItems,
  data,
  ...rest
}: TikTokMessageProps<T>) {
  const flatListRef = React.useRef<FlatList>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [data?.length]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        {...rest}
        data={data}
        inverted={false}
        showsVerticalScrollIndicator={false}
        renderItem={(props) => {
          return (
            <AnimatedItem
              index={data!.length - 1 - props.index}
              totalItems={data?.length || 0}
            >
              {renderItems(props)}
            </AnimatedItem>
          );
        }}
      />
    </View>
  );
}
