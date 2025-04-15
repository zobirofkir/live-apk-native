import React, { useState } from "react";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import StartLive from "./components/StartLive";
import WatchStream from "./components/WatchStream";
import StreamsList from "./components/StreamsList";

const App = () => {
  const [screen, setScreen] = useState("home");
  const [selectedStream, setSelectedStream] = useState(null);

  const goBack = () => {
    setScreen("home");
    setSelectedStream(null);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`flex-1`}>
        {screen === "home" && (
          <View style={tw`flex-1 justify-center items-center gap-4`}>
            <TouchableOpacity
              style={tw`bg-red-500 w-64 py-4 rounded-full`}
              onPress={() => setScreen("start")}
            >
              <Text style={tw`text-white text-center text-lg font-bold`}>
                Start Stream
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-blue-500 w-64 py-4 rounded-full`}
              onPress={() => setScreen("list")}
            >
              <Text style={tw`text-white text-center text-lg font-bold`}>
                Watch Stream
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {screen === "start" && <StartLive onBack={goBack} />}

        {screen === "list" && (
          <StreamsList
            onSelectStream={(stream) => {
              setSelectedStream(stream);
              setScreen("watch");
            }}
            onBack={goBack}
          />
        )}

        {screen === "watch" && (
          <WatchStream stream={selectedStream} onBack={goBack} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;
