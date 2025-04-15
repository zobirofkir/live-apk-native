import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Video from "react-native-video";
import tw from "twrnc";

const { width, height } = Dimensions.get("window");

const WatchStream = ({ stream, onBack }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const onLoad = () => {
    setIsLoading(false);
  };

  const onError = (err) => {
    console.log("Video error:", err);
    setError("Failed to load stream");
    setIsLoading(false);
  };

  return (
    <View style={tw`flex-1 bg-black`}>
      <View
        style={tw`absolute top-0 left-0 right-0 z-10 flex-row items-center p-4`}
      >
        <TouchableOpacity
          style={tw`bg-white/30 p-2 rounded-full mr-4`}
          onPress={onBack}
        >
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
              <Text style={tw`text-white`}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Video
            ref={videoRef}
            source={{
              uri: stream.rtmp_url,
              type: "m3u8", // or 'mp4' depending on your stream type
            }}
            style={tw`w-full h-full`}
            resizeMode="cover"
            repeat={true}
            paused={isPaused}
            muted={isMuted}
            controls={false}
            onLoad={onLoad}
            onError={onError}
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
          />
        )}

        {/* Overlay Controls */}
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

        {/* Stream Info */}
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
