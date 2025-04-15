import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import tw from "twrnc";
import axios from "axios";

const StartLive = ({ onBack }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [title, setTitle] = useState("");
  const [stream, setStream] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const startStream = async () => {
    try {
      const res = await axios.post("http://192.168.1.119/api/streams", {
        title: title,
        user_id: null,
      });

      setStream(res.data);
      setIsStreaming(true);
    } catch (error) {
      console.log("Error creating the stream:", error);
    }
  };

  const stopStream = () => {
    setIsStreaming(false);
    setStream(null);
  };

  const flipCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };

  if (hasPermission === null) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-black`}>
        <Text style={tw`text-white text-lg`}>
          Requesting camera permission...
        </Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-black`}>
        <Text style={tw`text-white text-lg`}>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-black`}>
      <Camera style={tw`flex-1`} type={cameraType} ref={cameraRef}>
        <View style={tw`flex-1 justify-between p-4`}>
          <View style={tw`flex-row justify-between items-center`}>
            <TouchableOpacity
              style={tw`bg-white/30 p-2 rounded-full`}
              onPress={flipCamera}
            >
              <Text style={tw`text-white`}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-white/30 p-2 rounded-full`}
              onPress={onBack}
            >
              <Text style={tw`text-white`}>Close</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`bg-black/50 p-4 rounded-lg`}>
            {!isStreaming ? (
              <>
                <TextInput
                  placeholder="Enter stream title"
                  placeholderTextColor="white"
                  onChangeText={setTitle}
                  value={title}
                  style={tw`text-white border-b border-white/50 py-2 mb-4`}
                />
                <TouchableOpacity
                  style={tw`bg-red-500 py-3 rounded-full`}
                  onPress={startStream}
                >
                  <Text style={tw`text-white text-center text-lg font-bold`}>
                    Start Stream
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={tw`items-center`}>
                <Text style={tw`text-white text-lg mb-4`}>
                  Streaming: {title}
                </Text>
                <TouchableOpacity
                  style={tw`bg-red-500 py-3 rounded-full w-full`}
                  onPress={stopStream}
                >
                  <Text style={tw`text-white text-center text-lg font-bold`}>
                    Stop Stream
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Camera>
    </View>
  );
};

export default StartLive;
