import { React, createElement } from 'react';
import { View, StyleSheet, TextInput, Text, Pressable } from 'react-native';
import * as Device from 'expo-device';
import {Picker} from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { CreateResponsiveStyle, DEVICE_SIZES, useDeviceSize, maxSize, minSize } from 'rn-responsive-styles'
import { processStyle } from '../helpers/styles'

export default function Input(props) { 
  const styles = useStyles()
  const deviceSize = useDeviceSize()
  let inheritedStyles = (props.style == undefined) ? {} : props.style;
  let containerStyles = (props.halfWidth) ? [styles.container, inheritedStyles.container, styles.columnHalf] : [styles.container, inheritedStyles.container]
  containerStyles = (props.thirdWidth) ? [styles.container, inheritedStyles.container, styles.columnThird] : containerStyles
  const label = (props.label != "") ?
  (<Text style={Object.assign( {}, styles.inputLabel, inheritedStyles.inputLabel)}>{props.label}</Text>) : <Text></Text>;

  let input = "";
  let inputStyle = null
  
  switch(props.type) {
    case "number":
    case "textarea":
    case "text":
      if(props.type == "number") {
        inputStyle = processStyle(styles.numberInput)  
      }else if (props.type == "textarea") {
        inputStyle = processStyle(styles.textareaInput)
      }else {//text
        inputStyle = processStyle(styles.textInput) 
      }
      input = (
        <View style={processStyle(styles.input)} >
          <TextInput 
            style={inputStyle}
            value={props.value} 
            multiline = {props.type === "textarea"}
            keyboardType = { (props.type == "number") ? "decimal-pad" : "default"}
            onChange={(change) => {
              console.log('meh')
              props.onChange(change.nativeEvent.text)
            }}
            blurOnSubmit={true}
          />
        </View>
      )
     
    break;
    case "date":
      
      const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
          value: new Date(props.value),
          onChange: (evt, data) => {
            props.onChange(data)
          },
          mode: 'date',
        });
      };

      console.log(minSize(DEVICE_SIZES.LG), minSize(DEVICE_SIZES.LG).includes(deviceSize))
      
      if(minSize(DEVICE_SIZES.LG), minSize(DEVICE_SIZES.LG).includes(deviceSize)) {
        input = (
            <View style={processStyle(styles.input)} >
              {
                createElement('input', {
                  style: processStyle(processStyle(styles.dateInput)),
                  type: 'date',
                  value: props.value,
                  onInput: (change) => {
                    props.onChange(change.target.value)
                  }
                })
              }
            </View>
          )
      } else {
        input = (
            <View style={processStyle(styles.input)} >
              <Pressable style={processStyle(styles.dateInput)}
                onPress={() => showMode('date')}
              >

              </Pressable>
              
            </View>
          )
      }
      break;
    case "select":
      //console.log(props.values)
      const listItems = (
        props.values.map((item, id) => {
          return (<Picker.Item key={id} label={item.name} value={item.value} style={styles.inputItem}/>)
        })
      )
      
      input = (
        <View style={processStyle([processStyle(styles.input), inheritedStyles.input])}>
          <Picker
            style={processStyle(styles.picker)}
            selectedValue={props.value}
            onValueChange={(itemSelected, value) => {
              console.log(itemSelected, value)
              props.onChange(value)
            }}
          >
              <Picker.Item key="-1" label={props.undefinedLabel} value="-1" />
              {listItems}
            </Picker>
        </View>
      )
      break;
  }

  return (
    <View style={containerStyles}>
      { label }
      { input }
    </View>
  )
}

const useStyles = CreateResponsiveStyle(
  {
    container: {
      flexGrow: 12,
      width: "100%"
    },
    inputLabel: {
      fontWeight: "bold",
      marginBottom: 7,
      paddingLeft: 5
    },
    prefix: {
      position: "absolute",
      left: "0.8rem",
      bottom: 32,
    },
    input: {
      margin: 5,
      marginBottom: 10,
      backgroundColor: "#FFF",
    },
    input__prefixed: {
      paddingLeft: "1.6rem",
    },
    textInput: {
      border: "1px solid #767676",
      borderRadius: 2,
      height: 40,
    },
    dateInput: {
      height: 40,
      paddingLeft: 10,
    },
    numberInput: {
      border: "1px solid #767676",
      borderRadius: 2,
    },
    textareaInput: {
      border: "1px solid #767676",
      borderRadius: 2,
      height: 150,
      minHeight: 150,
      backgroundColor: "#FFF",
      marginBottom: 20
    },
    
    columnHalf: {
      flexBasis: "48%",
    },
    columnThird: {
      flexBasis: "33%",
    },
    picker: {
      minHeight: "auto",
    },
  },
  {
    [minSize(DEVICE_SIZES.LG)]: {
      picker: {
        minHeight: 42,
      },
    }
  }
);
const styles = StyleSheet.create({
  container: {
    flexGrow: 12,
    width: "100%"
  },
  inputLabel: {
    fontWeight: "bold",
    marginBottom: 7,
    paddingLeft: 5
  },
  prefix: {
    position: "absolute",
    left: "0.8rem",
    bottom: 32,
  },
  input: {
    height: "auto",
    margin: 5,
    marginBottom: 10
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
    flexBasis: "33%",
  },
});