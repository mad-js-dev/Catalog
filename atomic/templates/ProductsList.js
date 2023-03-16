import { React, Component, useState, useEffect } from "react";
import { StyleSheet, FlatList, SafeAreaView, Pressable, Image, Text, View} from "react-native";
import { useSelector , useDispatch } from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons';
export default function ProductsList (props) {
    let settings = useSelector(state => state.productsList.settings)

    const renderItem = ({ item }) => {
        return(
            <Item 
                id={item._id} 
                name={(item.category!=-1 && item.subcategory != -1) ? settings[1].list[item.category].list[item.subcategory].name : ""} 
                image={item.image} 
                price={item.pvp} 
                category={item.category} 
                subcategory={item.subcategory}
            />
        )
    }

    const triggerSelected = (id) => {
        props.onClick(id)
    }

    const Item = ({ id, name, price, image }) => {
        console.log(id, props.selectedId);
        return (
            <Pressable
                style={(props.selectable && id == props.selectedId)?[styles.listItem, styles.listItem_selected]:styles.listItem}
                onPress={() => triggerSelected(id)}
            >
                <Image
                    style={styles.listItem__image}
                    source={"https://fakeimg.pl/600x400/AAAAAA/"}
                />
                <div
                    style={styles.listItem__contentWrapper}
                >
                    <Text style={styles.listItem__text}>{name}</Text>
                    <Text style={styles.listItem__text}>{price}€</Text>
                </div>
            </Pressable>
        );
    }

    const Content = () => {
        let result;
        console.log(props.list)
        if(props.list.length == 0) {
            result = (
                <View style={[styles.productList__container, styles.productList__container_empty]}>
                    <View style={styles.productList__container_noResults}>
                        <Ionicons name="md-search-sharp" size={56} color="#555"/>
                        <Text>No products found</Text>
                    </View>
                </View>
            )
        } else {
            result = (
                <FlatList
                    data={props.list}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    contentContainerStyle={styles.productList__container}
                />
            )
        }
        console.log(result)
        return result
    }

    return (
        <SafeAreaView style={styles.productList}>
             <Content />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    productList: {
        flex: 1,
        marginTop: 20,
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
        flexDirection: "row",
        alignItems: "end",
        position: "relative",
        border: "4px solid rgba(0,0,0,0)",
    },
    listItem_selected: {
        border: "4px solid rgba(0,0,0,0.6)",
        boxSizing: "border-box",
    },
    listItem__image: {
        display: "block",
        width: "100%",
        height: 200
    },
    listItem__contentWrapper: {
        position: "absolute",
        right: 0,
        padding: 10
    },
    listItem__text: {
        flexBasis: "100%",
        paddingLeft: 30,
        paddingRight: 5,
        fontSize: 24,
        fontWeight: "bold",
        display: "block",
        textShadow: "0px 0px 5px #000",
        color: "#FFF",
        textAlign: "right"
    },
    listItem__icon: {
        flexBasis: "auto",
        marginRight: 15,
    },
});

  