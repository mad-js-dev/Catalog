import { React } from "react";
import { TouchableHighlight, Image, Text, View, FlatList} from "react-native";
import { useSelector } from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateResponsiveStyle, DEVICE_SIZES, useDeviceSize, maxSize, minSize } from 'rn-responsive-styles'
import { processStyle } from '../helpers/styles'

export default function ProductsList(props) { 
  const styles = useStyles()
  let settings = useSelector(state => state.productsList.settings) 

  const triggerSelected = (id) => {
    console.log(id)
    props.onClick(id)
  }

  const Item = ({ id, name, price, image }) => {
    console.log('fuuu', id)
    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => triggerSelected(id)}
        >
            <View style={(props.selectable && id == props.selectedId)?processStyle(styles.listItem_selected):processStyle(styles.listItem)}>
              <Image
                style={processStyle(styles.listItem__image)}
                source={{uri: "https://fakeimg.pl/600x400/AAAAAA/"}}
                />
              <View
                style={processStyle(styles.listItem__contentWrapper)}
                >
                <Text style={processStyle(styles.listItem__text)}>{name}</Text>
                <Text style={processStyle(styles.listItem__text)}>{(price > 0)?price+"€": ""}</Text>
              </View>
            </View>
        </TouchableHighlight>
    );
  }

const renderItem = (item) => {
  console.log(item)
  return(
    <Item 
        id={item.item._id} 
        name={(settings[1].list[item.item.category] != undefined && item.item.subcategory != -1) ? settings[1].list[item.item.category].list[item.item.subcategory].name : ""} 
        image={item.item.image} 
        price={item.item.pvp} 
        category={item.item.category} 
        subcategory={item.item.subcategory}
    />
  )
}

const Content = () => {
  let result;
  console.log(props.list)
  if(props.list== undefined || props.list.length == 0) {
      result = (
          <View style={[processStyle(styles.productList__container), processStyle(styles.productList__container_empty)]}>
              <View style={processStyle(styles.productList__container_noResults)}>
                  <Ionicons name="md-search-sharp" size={56} color="#555"/>
                  <Text>No products found</Text>
              </View>
          </View>
      )
  } else {
      result = (
        <View>
          <FlatList
              data={props.list}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              contentContainerStyle={styles.productList__container}

          />
        </View>
      )
  }
  console.log(result)
  return result
}

  return (
    <View style={styles.productList}>
      <Content />
    </View>
  )
}


const useStyles = CreateResponsiveStyle(
  {
      productList: {
          flex: 1,
      },
      column: {
          flexWrap: "wrap",
      },
      productList___container: {
          overflow: 'hidden',
          height: "100%",
      },
      productList__container_empty: {
          marginTop: 50,
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
      },
      productList__container_noResults: {
          color: "#333",
      },
      listItem: {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderWidth: 4,
          borderColor: "rgba(125,125,125,0)",
      },
      listItem_selected: {
        display: "flex",
          flexDirection: "column",
          width: "100%",
          borderWidth: 4,
          borderColor: "rgba(125,125,125,1)",
      },
      listItem__image: {
          //display: "block",
          width: "100%",
          height: 200,
          pointerEvents: "none"
      },
      listItem__contentWrapper: {
          position: "absolute",
          right: 0,
          bottom: 0,
          padding: 10
      },
      listItem__text: {
          flexBasis: "100%",
          paddingLeft: 30,
          paddingRight: 5,
          fontSize: 24,
          fontWeight: "bold",
          textShadow: "0px 0px 5px #000",
          color: "#FFF",
          textAlign: "right"
      },
      listItem__icon: {
          flexBasis: "auto",
          marginRight: 15,
      },
  },
  {
      [maxSize(DEVICE_SIZES.MD)]: {
          listItem: {
              //width: "50%",
          },
      },
      [minSize(DEVICE_SIZES.LG)]: {
          listItem: {
              //width: "100%",
          },
      }
  }
);
