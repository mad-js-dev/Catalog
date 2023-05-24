import { React, Component, useState, useEffect } from "react";
import { StyleSheet, Image, Text, View, ScrollView, Pressable } from "react-native";
import { useSelector , useDispatch } from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons';
import { updateProduct } from '../../store/productsSlice'
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CreateResponsiveStyle, DEVICE_SIZES, useDeviceSize, minSize } from 'rn-responsive-styles'
import { processStyle } from '../00-helpers/styles'

import Input from "../02-molecules/Input";
import Accordion from "../02-molecules/Accordion";

export default function Playground(props) { 
    console.log(props)
    const styles = useStyles()
    const dispatch = useDispatch();
    const isFocused = useIsFocused()
    
    let products = useSelector(state => state.productsList.products)
    let settings = useSelector(state => state.productsList.settings)
    const [ subcategories, setSubcategories ] = useState([]);


    const initialState = {
        name: "",
        state: -1,
        condition: -1,
        category: -1,
        subcategory: -1,
        designer: -1,
        color1: -1,
        color2: -1,
        material: -1,
        size: -1,
        description: "",
        pricebought: 0,
        salesprice: 0,
        pvp: 0,
        provider: "",
        paymentMethod: "",
        dateBought: Date.now(),
        dateSold: Date.now(),
        datePayed: Date.now(),
        invoice: "",
        paymentLocation: "",
    } 

    const [product, setProduct] = useState(initialState);

    useEffect(()=>{
        if(props.id.length != 0){
            let newProduct = products.filter((elem) => {
                if(elem._id == props.id) return true
            })[0]
            setProduct(newProduct);
            updateSubcategories( newProduct.category)
        }
    }, [props.id])

    const updateProperty = (change, prop) => {
        let newValue = {...product};
        newValue[prop] = change;
        
        if(prop=='category') {
            newValue.subcategory = - 1;
            updateSubcategories(newValue.category)
        }

        setProduct(newValue)
        props.onChange(newValue)
    };

    const updateSubcategories = (change) => {
        setSubcategories((change == "-1") ? [] : settings[1].list[change].list)
    };
    
    function Content() {
        let result;
        if(props.id == "") {
            result = (
            <View style={processStyle(styles.productsDetails_empty)}>
                <View style={processStyle(styles.productsDetails_noResults)}>
                    <Ionicons name="md-close-sharp" size={56} color="#555"/>
                    <Text>No product selected</Text>
                </View>
            </View>
            )
        } else {
            result = (
            <View style={processStyle(styles.productsDetails)}>
                <View style={processStyle(styles.pictureContainer)}>
                    <Image
                        style={processStyle(styles.image)}
                        source={(product.image == '' ) ? {uri: "https://fakeimg.pl/600x400/CCCCCC/"} : "http://192.168.1.130:80/files/" + product.image}
                        resizeMeode="contain"
                    />
                    <Pressable 
                        title={ "Create product" }
                        style={processStyle(styles.image__picture_button)}
                        onPress={() => props.onPress("takePicture")}
                    >   
                       <Ionicons name="camera-outline" size={24} color="white" />
                    </Pressable>
                </View>
                <View style={processStyle(styles.productDataContainer)}>
                    <View style={processStyle(styles.productDataContainer__formWrapper)}>
                        <Input 
                            type="text" 
                            label="Product ID:"
                            value={product.name || ""}
                            onChange={(change) => updateProperty(change, "name")}
                        />
                        <Input 
                            type="select" 
                            label="Category"
                            value={product.category}
                            values={settings[1].list}
                            halfWidth={true} 
                            onChange={(change) => updateProperty(change - 1, "category")}
                        />
                        <Input 
                            type="select" 
                            label="Subcategory"
                            value={product.subcategory}
                            values={subcategories}
                            halfWidth={true} 
                            onChange={(change) => updateProperty(change - 1, "subcategory")}
                        />
                        <Input 
                            type="select" 
                            label="State"
                            value={product.state}
                            values={settings[0].list}
                            halfWidth={true} 
                            onChange={(change) => updateProperty(change - 1, "state")}
                        />
                        <Input 
                            type="select" 
                            label="Condition"
                            value={product.condition}
                            values={settings[6].list}
                            halfWidth={true} 
                            onChange={(change) => updateProperty(change - 1, "condition")}
                        />
                        <Input 
                            type="select" 
                            label="Designer"
                            value={product.designer}
                            values={settings[2].list}
                            onChange={(change) => updateProperty(change - 1, "designer")}
                         />
                        <Input 
                            type="select" 
                            label="Color 1"
                            value={product.color1}
                            values={settings[3].list}
                            halfWidth={true} 
                            onChange={(change) => updateProperty(change - 1, "color1")}
                        />
                        <Input 
                            type="select" 
                            label="Color 2"
                            value={product.color2}
                            values={settings[3].list}
                            halfWidth={true} 
                            onChange={(change) => updateProperty(change - 1, "color2")}
                        />
                        <Input 
                            type="select" 
                            label="Material"
                            value={product.material}
                            values={settings[4].list}
                            halfWidth={true} 
                            onChange={(change) => updateProperty(change - 1, "material")}
                        />
                        <Input 
                            type="select" 
                            label="Size"
                            value={product.size}
                            values={settings[5].list}
                            halfWidth={true} 
                            onChange={(change) => updateProperty(change - 1, "size")}
                        />
                        <Input 
                            type="textarea" 
                            label="Description:"
                            value={product.description || ""}
                            onChange={(change) => updateProperty(change, "description")}
                        />
                    </View>
                </View>
                <View style={processStyle(styles.paymentContainer)}>
                    <Accordion 
                        title="payment info" 
                        headerIcon="filter"
                        display={false}
                        content={(<>
                            <Input 
                                type="text" 
                                label="Product provider:"
                                value={product.provider || ""}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change, "provider")}
                            />
                            <Input 
                                type="date" 
                                label="Date bought:"
                                value={product.dateBought || ""}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change, "dateBought")}
                            />
                            <Input 
                                type="text" 
                                label="Price bought:"
                                value={product.pricebought || ""}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change, "pricebought")}
                            />
                            <Input 
                                type="date" 
                                label="Provider paied on:"
                                value={product.datePayed || ""}
                                halfWidth={true} 
                                onChange={(change) => updateProperty(change, "datePayed")}
                            />
                            <Input 
                                type="select" 
                                label={settings[21].label}
                                value={product.provPaymentMethod}
                                values={settings[21].list}
                                halfWidth={true} 
                                onChange={(change) => updateProperty(change - 1, "provPaymentMethod")}
                            /> 
                            
                            <Input 
                                type="text" 
                                label="Min. PVP:"
                                value={product.salesprice || ""}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change, "salesprice")}
                            />
                            <Input 
                                type="text" 
                                label="Price sold:"
                                value={product.pvp || ""}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change, "pvp")}
                            />
                            <Input 
                                type="date" 
                                label="Date sold:"
                                value={product.dateSold || ""}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change, "dateSold")}
                            />
                            <Input 
                                type="select" 
                                label={settings[20].label}
                                value={product.paymentMethod}
                                values={settings[20].list}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change - 1, "paymentMethod")}
                            />
                            <Input 
                                type="select" 
                                label={settings[19].label}
                                value={product.paymentLocation}
                                values={settings[19].list}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change - 1, "paymentLocation")}
                            />
                            <Input 
                                type="text" 
                                label="Invoice identifier:"
                                value={product.paymentInvoice || ""}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change, "paymentInvoice")}
                            />
                        </>)}
                    />
                </View>
            </View>
            )
        }

        return result   
    }

    return Content()
}


const useStyles = CreateResponsiveStyle(
{
    productsDetails: {
        display: "flex",
        height: "86vh",  
        flexWrap: "wrap",
        maxheight: "100%"
    },
    productsDetails_empty: {
        display: "flex",
        flexWrap: "wrap",
        maxheight: "100%"
    },
    productsDetails_noResults: {
        color: "#333",
        marginLeft: "auto",
        marginRight: "auto",
    },
    pictureContainer: {
        flexBasis: 1,
    },
    producInformation: {
        flexBasis: 3, 
        flexGrow: 1,
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    image: {
        height: 250,
        width: "100%",
    },
    image__picture_button: {
        position: "absolute",
        bottom: 0,
        right: 0,
        padding: 3,
        border: "2px solid #FFF",
        borderRadius: 3,
        margin: 6,
    },
    h1: {
        fontSize: "3rem",
    },
    h2: {
        marginTop: 0,
        fontSize: "2.5rem",
    },
    h3: {
        fontSize: "2rem",
    },
    designerField: {
        fontSize: 34,
        height: "auto",
        maxWidth: 340,
    },
    productsDetails: {
        display: "flex", 
        flexWrap: "wrap",
        flexDirection: "column", 
    },
    pictureContainer: {
        //flexBasis: "content",
    },
    paymentContainer: {
        paddingLeft: 6,
        paddingRight: 6,
    },
    productDataContainer: {
        paddingRight: 12,
    },
    productDataContainer__formWrapper: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-between",
      height: "auto",
    }
},
{
    [minSize(DEVICE_SIZES.LG)]: {
        productsDetails: {
            height: "80vh",
            alignContent: "space-between",
        },
        productsDetails_empty: {
            height: "86vh",  
            justifyContent: "center",
            textAlign: "center",
        },
        pictureContainer: {
            width: 420,
            order: 1,
        },
        image: {
          //display: "block",
          //width: "100%",
          //height: "100%",
          //maxWidth: "450px",
          //maxHeight: "300px",
          //minHeight: "calc(100vw / 3 * 2)",
          //marginBottom: 0
       },
        paymentContainer: {
            maxWidth: 420,
            order: 2,
            paddingLeft: 0,
            paddingRight: 0,
        },
        productDataContainer: {
            width: "50%",
            order: 3,
            paddingBottom: 0,
            paddingRight: 0,

        },
        image: {
            maxHeight: "300px",
            minHeight: "33vh",
        },
        image__picture_button: {
            display: "none",
        },
    }
} 
);