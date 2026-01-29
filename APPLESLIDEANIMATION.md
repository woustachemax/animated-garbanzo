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
