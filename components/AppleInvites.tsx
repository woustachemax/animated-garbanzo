import { Marquee } from "@animatereactnative/marquee";
import React, { useState } from "react";
import { Dimensions, Image, ImageSourcePropType, StyleSheet, View, Text } from "react-native";
import Animated, { useSharedValue, useAnimatedReaction, FadeIn, FadeOut } from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
import {Stagger} from '@animatereactnative/stagger'

const images: ImageSourcePropType[] = [
  require("../assets/images/image.jpg"),
  require("../assets/images/image-1.jpg"),
  require("../assets/images/image-2.jpg"),
  require("../assets/images/image-3.jpg"),
  require("../assets/images/image-4.jpg"),
];

const { width } = Dimensions.get("window");
const _itemWidth = width * 0.62;
const _itemHeight = width * 0.8; 
const _spacing = 16;
const _itemSize = _itemWidth + _spacing
const Item = ({
  image,
  index,
}: {
  image: ImageSourcePropType;
  index: number;
}) => {
  return (
    <View
      style={{
        width: _itemWidth,
        height: _itemHeight,
        borderRadius: 16,
        overflow: "hidden",
        marginHorizontal: 8,
      }}
    >
      <Image
        source={image}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </View>
  );
};

const AppleInvites = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const offset = useSharedValue(0);
  
  useAnimatedReaction(()=>{
   const floorr = ((offset.value + width/2)/_itemSize) % images.length
   return Math.abs(Math.floor(floorr))
  }, (value)=>{
    runOnJS(setActiveIndex)(value)

  })
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , backgroundColor: '#000'}}>
      <View style={[StyleSheet.absoluteFillObject]}>
          <Animated.Image key={`images-${activeIndex}`}
          source={images[activeIndex]}  style={{flex:1}}
          blurRadius={50}
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(1000)}/>
      </View>
      <Marquee spacing={_spacing} position={offset}>
        <View style={{ flexDirection: "row"}}>
          {images.map((image, index) => (
            <Item key={`image-${index}`} image={image} index={index} />
          ))}
        </View>
      </Marquee>
      <Stagger
      initialEnteringDelay={1000}
      duration={500}
      stagger={250}
      style={{flex:0.5, justifyContent: "center", alignItems: "center"}}>
        
        <Animated.View style={{justifyContent:"center", alignContent: "center"}}>
          <Text style={{color: "white", fontWeight: "500", opacity: 0.6, fontSize: 16, textAlign: 'center', margin: 2}}>
            Welcome To
          </Text>
          <Text style={{color: "white", fontWeight: "500", fontSize: 24, textAlign: 'center', margin: 4}}>
              Siddharth's Animations
          </Text>
          <Text style={{color: "white", fontWeight: "500", fontSize: 16, opacity:0.6, textAlign: 'center', margin: 4}}>
              Building one animation at a time
          </Text>
        </Animated.View>
      </Stagger>
    </View>
  );
};

export default AppleInvites;