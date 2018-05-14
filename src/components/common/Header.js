//Import libraries for making component
import React from 'react';
import { Text, View } from 'react-native';

//Make component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>;
    </View>
  );
};

const styles = {
  viewStyle: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    elevation: 2,
    height: 60,
    justifyContent: 'center',
    paddingTop: 15,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  },
  textStyle: {
    fontSize: 20
  }
};
//Render component to other parts of the app
export { Header };
