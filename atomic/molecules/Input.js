import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';


export default function Input(props) { 
  let inheritedStyles = (props.style == undefined) ? {} : props.style;
  let containerStyles = (props.halfWidth) ? [styles.container, inheritedStyles.container, styles.columnHalf] : [styles.container, inheritedStyles.container]
  containerStyles = (props.thirdWidth) ? [styles.container, inheritedStyles.container, styles.columnThird] : containerStyles
  const label = (props.label != "") ?
  (<Text style={[styles.inputLabel, inheritedStyles.inputLabel ]}>{props.label}</Text>) : <Text></Text>;

  let input = "";
  let prefix = "";
  
  switch(props.type) {
    case "text":
    case "number":
    case "textarea":
      if(props.prefix) {
        prefix = (<Text style={[styles.prefix, inheritedStyles.prefix]}>{props.prefix}</Text>)
      }
      let inputStyles = (props.type === "textarea") ? [styles.input, inheritedStyles.input, styles.textArea] : [styles.input, inheritedStyles.input]
      inputStyles = (props.prefix) ? [inputStyles, styles.input__prefixed, inheritedStyles.input__prefixed] : inputStyles
      
      input = (
      <TextInput 
        style={inputStyles} 
        value={props.value} 
        multiline = {props.type === "textarea"}
        keyboardType = { (props.type == "number") ? "decimal-pad" : "default"}
        onChange={(change) => {
          props.onChange(change.nativeEvent.text)
        }}
      />)
      break;
    case "date":
      input = (
        <input 
          style={{...styles.dateInput, ...inheritedStyles.dateInput}}
          type="date" 
          value={props.value} 
          onChange={(change) => {
            props.onChange(change.target.value)
          }}
        />
      )
      break;
    case "select":
      //console.log(props.values)
      const listItems = (
        props.values.map((item, id) => {
          return (<Picker.Item key={id} label={item.name} value={item.value} />)
        })
      )

      input = (
        <Picker
          style={{...styles.input, ...inheritedStyles.input}} 
          selectedValue={props.value}
          onValueChange={(itemSelected, value) => {
            console.log(itemSelected, value)
            props.onChange(value)
          }}
        >
            <Picker.Item key="-1" label={props.undefinedLabel} value="-1" />
            {listItems}
          </Picker>
      )
      break;
  }

  return (
    <View style={containerStyles}>
      { label }
      { (prefix!="")?prefix:null }
      { input }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 12,
    width: "100%"
  },
  inputLabel: {
    fontWeight: "bold",
    marginBottom: 7
  },
  prefix: {
    position: "absolute",
    left: "0.8rem",
    bottom: 32,
  },
  input: {
    height: "auto",
    borderBottomWidth: 1,
    padding: 10,
  },
  input__prefixed: {
    paddingLeft: "1.6rem"
  },
  dateInput: {
    height: 40,
    paddingLeft: 10
  },
  textArea: {
    minHeight: 120,
    borderWidth: 1,
    backgroundColor: "white"
  },
  columnHalf: {
    flexBasis: "48%",
  },
  columnThird: {
    flexBasis: "30%",
  },
});