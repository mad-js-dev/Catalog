import { React, useState } from "react";
import { View, StyleSheet, TextInput, Text, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Accordion(props) { 
  const [ display, setDisplay ] = useState(props.display);

return (
  <div  style={styles.accordion__wrapper}>
      <Pressable  style={styles.accordion__header} onPress={() => setDisplay(!display)}>
        <Ionicons 
            name={ props.headerIcon }
            size={24} 
            />
        <Text>{(display)?"Hide " + props.title:"Show " + props.title} </Text>
      </Pressable>

      <div style={ (display) ? 
          styles.accordion__content :
          {...styles.accordion__content, ...styles.accordion__content_hidden}
      }>
        {props.content}
      </div>
  </div>
 )
}

const styles = StyleSheet.create({
  accordion__wrapper: {
    border: "1px solid",
    borderRadius: 5, 
  },
  accordion__header: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
    padding: 10,
    textAlign: "right",
  },
  accordion__content: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    height: "100%",
    overflow: "hidden",
    margin: 10,
},
accordion__content_hidden: {
    minHeight: 0,
    height: 0,
    margin: 0,
},
});