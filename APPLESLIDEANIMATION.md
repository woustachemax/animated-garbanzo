# Apple Slider Animation, X Trend

> This is an attempt to replicate the apple's sliding animation in React Native.

## Dependencies

The Dependencies used here are:

- React Native Reanimated
- React Native Gesture Handler
- Animate React Native Marquee
- Animate React Native Stagger

The command for the same is, `pnpm add react-native-reanimated react-native-gesture-handler @animatereactnative/marquee @animatereactnative/stagger`

## Marquee or @animatereactnative/marquee

What Marquee does is, it kind of adds motion to its child components so they appear like a train. For that to run smoothly, one has to have gesture handler root view as a parent to the exported component that has the Marquee dependency in it, kind of like:
```tsx
import AppleInvites from "@/components/AppleInvites";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  return (
    <GestureHandlerRootView>
      <AppleInvites />
    </GestureHandlerRootView>
  );
}
```

As a result of which, one gets a beautiful animation like:

<img src="readme-assets/Marquee.gif" width="400" alt="Marquee Animation" />

The Marquee itself can also accept parameters like spacing, positioning etc.

## react-native-gesture-handler

The Gesture Handler root view has many usecases but for this particular usecase we've just used GestureHandlerRootView to wrap around our `AppleInvites.tsx` in the `index.tsx` file

## react-native-reanimated

Reanimated is what powers the smooth animations in this project. We're using `useSharedValue` to track the scroll offset, and `useAnimatedReaction` to watch for changes in that offset and update the background image accordingly.

The `useSharedValue` creates a value that can be updated from the UI thread without going back to JavaScript thread, making animations buttery smooth. The `useAnimatedReaction` works like a watcher that runs code whenever the shared value changes.

We also use `runOnJS` from react-native-worklets to safely update React state from the animation thread, which is necessary because `setActiveIndex` is a regular JavaScript function that needs to run on the JS thread.

## How the Background Image Changes

The background image changes based on which card is currently in the center of the screen as the marquee scrolls. This is done using `useAnimatedReaction` which watches the scroll offset and calculates which image should be active.

The calculation takes the scroll position, adds half the screen width to center it, divides by the item size to get the index, and uses modulo to wrap around when reaching the end of the images array. This creates the infinite scrolling effect where the background smoothly transitions between images as you scroll through the cards.