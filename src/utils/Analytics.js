import analytics from '@react-native-firebase/analytics';

const logEvent = async (eventName, eventData) => {
  await analytics().logEvent(eventName, eventData);
};

const logSelectContent = async (contentType, itemId) => {
  await analytics().logSelectContent({
    content_type: contentType,
    item_id: itemId,
  });
};

export {logEvent, logSelectContent};
