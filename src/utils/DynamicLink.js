import dynamicLinks from '@react-native-firebase/dynamic-links';

const generateLink = async id => {
  try {
    const link = await dynamicLinks().buildShortLink(
      {
        link: `https://reactnativemovieapp.page.link/eNh4?productId=${id}`,
        domainUriPrefix: 'https://reactnativemovieapp.page.link',
        android: {
          packageName: 'com.reactnativemovieapp',
        },
      },
      dynamicLinks.ShortLinkType.DEFAULT,
    );
    console.log('link:', link);
    return link;
  } catch (error) {
    console.log('Generating Link Error:', error);
  }
};

export {generateLink};
