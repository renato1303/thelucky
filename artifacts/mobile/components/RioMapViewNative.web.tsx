import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

type Props = {
  selectedNeighborhood: string | null;
  onNeighborhoodPress: (name: string | null) => void;
  style?: StyleProp<ViewStyle>;
};

export default function DestinationMapViewNativeWeb(_props: Props) {
  return <View />;
}
