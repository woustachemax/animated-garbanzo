import { Marquee } from "@animatereactnative/marquee";
import React from "react";
import { Dimensions, Image, ImageSourcePropType, View } from "react-native";

const images: ImageSourcePropType[] = [
  require("../assets/images/image.jpg"),
  require("../assets/images/image-1.jpg"),
  require("../assets/images/image-2.jpg"),
  require("../assets/images/image-3.jpg"),
  require("../assets/images/image-4.jpg"),
];

const { width } = Dimensions.get("window");
const _itemWidth = width * 0.62;
const _itemHeight = width * 1.67;

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
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Marquee>
        <View style={{ flexDirection: "row" }}>
          {images.map((image, index) => (
            <Item key={`image-${index}`} image={image} index={index} />
          ))}
        </View>
      </Marquee>
    </View>
  );
};

export default AppleInvites;
