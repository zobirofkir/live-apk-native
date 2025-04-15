import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

const WatchStream = ({ stream, onBack }) => {
  return (
    <View style={tw`flex-1 bg-black`}>
      <View style={tw`flex-row items-center p-4`}>
        <TouchableOpacity
          style={tw`bg-white/30 p-2 rounded-full mr-4`}
          onPress={onBack}
        >
          <Text style={tw`text-white`}>Back</Text>
        </TouchableOpacity>
        <Text style={tw`text-white text-2xl font-bold`}>Watching Stream</Text>
      </View>
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-white text-2xl font-bold mb-4`}>
          {stream.title}
        </Text>
        <View style={tw`bg-white/10 p-4 rounded-lg w-11/12`}>
          <Text style={tw`text-white/70 mb-2`}>RTMP URL:</Text>
          <Text style={tw`text-white mb-4`}>{stream.rtmp_url}</Text>
          <Text style={tw`text-white/70 mb-2`}>Room Name:</Text>
          <Text style={tw`text-white`}>{stream.room}</Text>
        </View>
      </View>
    </View>
  );
};

export default WatchStream;
