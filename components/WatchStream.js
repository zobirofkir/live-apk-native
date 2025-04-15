import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Video } from "expo-av";
import tw from "twrnc";

const { width, height } = Dimensions.get("window");

const WatchStream = ({ stream, onBack }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      videoRef.current.playAsync();
    } else {
      videoRef.current.pauseAsync();
    }
  };

  const onLoad = () => {
    setIsLoading(false);
  };

  const onError = (e) => {
    console.log("Video error:", e);
    setError("فشل تحميل البث");
    setIsLoading(false);
  };

  return (
    <View style={tw`flex-1 bg-black`}>
      <View style={tw`absolute top-0 left-0 right-0 z-10 flex-row items-center p-4`}>
        <TouchableOpacity style={tw`bg-white/30 p-2 rounded-full mr-4`} onPress={onBack}>
          <Text style={tw`text-white`}>Back</Text>
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold`}>{stream.title}</Text>
      </View>

      <View style={tw`flex-1`}>
        {isLoading && (
          <View style={tw`absolute inset-0 justify-center items-center`}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}

        {error ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-white text-lg`}>{error}</Text>
            <TouchableOpacity
              style={tw`mt-4 bg-white/30 p-3 rounded-full`}
              onPress={() => {
                setError(null);
                setIsLoading(true);
              }}
            >
              <Text style={tw`text-white`}>إعادة المحاولة</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Video
            ref={videoRef}
            source={{ uri: stream.rtmp_url }}
            rate={1.0}
            volume={1.0}
            isMuted={isMuted}
            resizeMode="cover"
            shouldPlay={!isPaused}
            isLooping
            onLoad={onLoad}
            onError={onError}
            style={{ width: width, height: height }}
          />
        )}

        <View style={tw`absolute bottom-0 left-0 right-0 p-4`}>
          <View style={tw`flex-row justify-between items-center`}>
            <TouchableOpacity
              style={tw`bg-white/30 p-3 rounded-full`}
              onPress={toggleMute}
            >
              <Text style={tw`text-white`}>{isMuted ? "🔇" : "🔊"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`bg-white/30 p-3 rounded-full`}
              onPress={togglePause}
            >
              <Text style={tw`text-white`}>{isPaused ? "▶️" : "⏸️"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`absolute bottom-20 left-4 right-4`}>
          <View style={tw`bg-black/50 p-4 rounded-lg`}>
            <Text style={tw`text-white text-lg font-semibold`}>
              {stream.title}
            </Text>
            <Text style={tw`text-white/70 mt-2`}>Room: {stream.room}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WatchStream;
