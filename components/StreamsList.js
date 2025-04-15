import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import tw from "twrnc";
import axios from "axios";

const StreamsList = ({ onSelectStream, onBack }) => {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.119/api/streams")
      .then((res) => setStreams(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={tw`flex-1 bg-black`}>
      <View style={tw`flex-row items-center p-4`}>
        <TouchableOpacity
          style={tw`bg-white/30 p-2 rounded-full mr-4`}
          onPress={onBack}
        >
          <Text style={tw`text-white`}>Back</Text>
        </TouchableOpacity>
        <Text style={tw`text-white text-2xl font-bold`}>Live Streams</Text>
      </View>
      <FlatList
        data={streams}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw`p-4`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`bg-white/10 p-4 rounded-lg mb-4`}
            onPress={() => onSelectStream(item)}
          >
            <Text style={tw`text-white text-lg font-semibold`}>
              {item.title}
            </Text>
            <Text style={tw`text-white/70 mt-2`}>Room: {item.room}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default StreamsList;
