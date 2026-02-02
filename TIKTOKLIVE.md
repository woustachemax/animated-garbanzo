# TikTok Message Animation

> There has been a trend of having cool animations where chat rooms are more likely to have a subtle blurness to the older messages rather than pushing them to the top of the screen cause microinteractions are important

## Dependencies

The Dependencies used here are:

- React Native Reanimated
- Expo Blur

The command for the same is, `npx expo install expo-blur react-native-reanimated`

## expo-blur or BlurView

What BlurView does is, it applies a native blur effect to its children, creating that frosted glass appearance iOS apps are known for. The blur intensity can be controlled dynamically, which is perfect for creating depth in chat interfaces where older messages fade into the background.

For the blur to work properly, you need to wrap your content and apply the blur intensity based on the message's position in the list:

```tsx
<BlurView intensity={blurIntensity} tint="dark">
  {children}
</BlurView>
```

The `intensity` prop accepts a number (0-100) where higher values create stronger blur effects, and `tint` can be "light", "dark", or "default" to match your app's theme.

## react-native-reanimated

Reanimated powers the smooth entrance animations and opacity transitions in this project. We're using `useSharedValue` to manage the translateY position and opacity of each message as it enters the chat.

The `useAnimatedStyle` hook creates animated style objects that update on the UI thread, ensuring buttery smooth 60fps animations even when messages are rapidly appearing. Each new message slides up from below with `withTiming` creating that characteristic chat-app feel.

We also use `interpolate` to create the gradient blur effect - messages further from the bottom (older messages) get progressively more blur applied, creating depth and visual hierarchy without taking up vertical space.

## How the Blur Gradient Works

The blur intensity is calculated based on each message's index in the array. Newer messages at the bottom have zero blur and full opacity, while older messages progressively blur and fade out as they move up.

The calculation uses `interpolate` to map the message index to blur intensity (0-20) and opacity (1-0.3). This creates a natural reading experience where your eye is drawn to the latest messages while older context remains visible but de-emphasized.

The FlatList automatically scrolls to the bottom when new messages arrive using `scrollToEnd`, and each message animates in with a slide-up effect using `translateY` that transitions from 100 to 0 over 500ms.
