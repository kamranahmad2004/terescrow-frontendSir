import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { SetStateAction } from 'react';
import { Message } from '@/app/chatwithagent';
import { Image } from 'expo-image';
import { COLORS } from '@/constants';

type PropTypes = {
  item: Message;
  setImagePreview: React.Dispatch<SetStateAction<string | null>>;
};
const MessageItem = ({ item, setImagePreview }: PropTypes) => {
  return (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.otherMessage,
      ]}
    >
      {item.image && (
        <TouchableOpacity onPress={() => setImagePreview(item.image as string)}>
          <Image source={{ uri: item.image }} style={styles.dynamicImage} />
        </TouchableOpacity>
      )}
      {!item.image && (
        <Text
          style={[
            styles.messageText,
            item.isUser
              ? styles.userMessageTextColor
              : styles.otherMessageTextColor,
          ]}
        >
          {item.text}
        </Text>
      )}
      <Text
        style={[
          styles.timestamp,
          { alignSelf: item.isUser ? 'flex-end' : 'flex-start' },
        ]}
      >
        {new Date().toLocaleTimeString()}
      </Text>
    </View>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '70%',
    borderRadius: 10,
    marginVertical: 5,
    paddingVertical: 10,
  },
  userMessage: { alignSelf: 'flex-end' },
  otherMessage: { alignSelf: 'flex-start' },
  userMessageTextColor: { backgroundColor: '#DCF8C6' },
  otherMessageTextColor: { backgroundColor: '#E5E5E5' },
  messageText: { fontSize: 16, padding: 15, borderRadius: 8 },
  timestamp: { fontSize: 12, marginTop: 5, color: COLORS.grayscale400 },
  dynamicImage: { width: '100%', height: undefined, aspectRatio: 1 },
});