import React, { useEffect, useRef, useState } from "react";
import { Animated, ImageSourcePropType, StyleSheet } from "react-native";

type Props = {
  pool: ImageSourcePropType[];
  interval?: number;
  fadeDuration?: number;
  firstSource?: ImageSourcePropType | { uri: string } | null;
  onFirstImageDisplay?: () => void;
  blurRadius?: number;
};

export function RotatingBackground({
  pool,
  interval = 10_000,
  fadeDuration = 1500,
  firstSource = null,
  onFirstImageDisplay,
  blurRadius = 0,
}: Props) {
  const resolvedPool = firstSource
    ? [firstSource as ImageSourcePropType, ...pool]
    : pool;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx,    setNextIdx]    = useState(1 % resolvedPool.length);
  const nextOpacity   = useRef(new Animated.Value(0)).current;
  const timerRef      = useRef<ReturnType<typeof setInterval> | null>(null);
  const firstFiredRef = useRef(false);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      Animated.timing(nextOpacity, {
        toValue: 1,
        duration: fadeDuration,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (!finished) return;
        setCurrentIdx((c) => {
          setNextIdx((c + 2) % resolvedPool.length);
          return (c + 1) % resolvedPool.length;
        });
        nextOpacity.setValue(0);
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleFirstLoad() {
    if (!firstFiredRef.current && onFirstImageDisplay) {
      firstFiredRef.current = true;
      onFirstImageDisplay();
    }
  }

  return (
    <>
    <View pointerEvents="none">
      <Animated.Image
        source={resolvedPool[nextIdx]}
        style={[StyleSheet.absoluteFill, { opacity: nextOpacity }]}
        resizeMode="cover"
        blurRadius={20}
      />
    </View>
    <View pointerEvents="none">
      <Animated.Image
        source={resolvedPool[currentIdx]}
        style={[StyleSheet.absoluteFill, { opacity: 1 }]} resizeMode="cover"
        blurRadius={20}
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFillObject,
  },
});
