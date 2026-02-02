import Chat from "@/components/Chat";
import { chatItem, Messages } from "@/components/faker";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [messages, setMessages] = useState<chatItem[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => [...prev, Messages()]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Chat
        data={messages}
        renderItems={({ item }) => (
          <View style={styles.messageContainer}>
            <View style={styles.messageBubble}>
              <Text style={styles.username}>{item.user.name}</Text>
              <Text style={styles.message}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 50,
  },
  messageContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 12,
    borderRadius: 12,
  },
  username: {
    color: "#4A9EFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  message: {
    color: "white",
    fontSize: 16,
  },
});
