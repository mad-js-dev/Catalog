import { React, useState } from "react";
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Accordion(props) { 
  const [ display, setDisplay ] = useState(props.display);

return (
    <View style={styles.accordion__wrapper}>
        <Pressable  style={styles.accordion__header} onPress={() => setDisplay(!display)}>
          <Ionicons 
              name={ props.headerIcon }
              size={24} 
              />
          <Text>{(display)?"Hide " + props.title:"Show " + props.title} </Text>
        </Pressable>

        <View style={ (display) ? 
            styles.accordion__content :
            {...styles.accordion__content, ...styles.accordion__content_hidden}
          }>
          {props.content}
        </View>
    </View>
 )
}

const styles = StyleSheet.create({
  accordion__wrapper: {
    border: "1px solid",
    borderRadius: 5, 
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 4,
    marginRight: 4,
  },
  accordion__header: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 10,
    textAlign: "right",
  },
  accordion__content: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "auto",
    overflow: "hidden",
    padding: 7,
},
accordion__content_hidden: {
    minHeight: 0,
    height: 0,
    margin: 0,
    padding: 0,
},
});