import { React, Component, useState, useEffect } from "react";
import { StyleSheet, Image, Text, View, AppRegistry } from "react-native";
import { useSelector , useDispatch } from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons';
import { updateProduct } from '../../store/productsSlice'
import { useIsFocused } from '@react-navigation/native'

import Input from "../molecules/Input";
import Accordion from "../molecules/Accordion";

export default function ProductDetails(props) { 
    const dispatch = useDispatch();
    const isFocused = useIsFocused()
    
    let products = useSelector(state => state.productsList.products)
    let settings = useSelector(state => state.productsList.settings)
    const [ subcategories, setSubcategories ] = useState([]);

    console.log(props.id)

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
            console.log(products, props.id)
            let newProduct = products.filter((elem) => {
                if(elem._id == props.id) return true
            })[0]
            console.log(newProduct)
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
        console.log(settings, change)
        setSubcategories((change == "-1") ? [] : settings[1].list[change].list)
    };

    function Content() {
        let result;
        if(props.id == "") {
            result = (
            <View style={[styles.productsDetails, styles.productsDetails_empty]}>
                <View style={styles.productsDetails_noResults}>
                    <Ionicons name="md-close-sharp" size={56} color="#555"/>
                    <Text>No product selected</Text>
                </View>
            </View>
            )
        } else {
            result = (
            <div style={styles.productsDetails}>
                <div style={styles.pictureContainer}>
                    <Image
                        style={[styles.image, styles.columnFull]}
                        source={"https://fakeimg.pl/600x400/CCCCCC/"}
                        resizeMode="contain"
                    />
                </div>
                <div style={styles.productDataContainer}>
                    <Text><h2>Product details:</h2></Text>
                    <div style={styles.productDataContainer__formWrapper}>
                        <Input 
                                type="text" 
                                label="Product name:"
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
                    </div>
                </div>
                <div style={styles.paymentContainer}>
                    <Accordion 
                        title="payment info" 
                        headerIcon="filter"
                        display={false}
                        content={(<>
                            <Input 
                                type="text" 
                                label="Price bought:"
                                value={product.pricebought || ""}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change, "pricebought")}
                            />
                            <Input 
                                type="text" 
                                label="Sales price:"
                                value={product.salesprice || ""}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change, "salesprice")}
                            />
                            <Input 
                                type="text" 
                                label="PVP:"
                                value={product.pvp || ""}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change, "pvp")}
                            />
    
                            <Input 
                                type="text" 
                                label="Product provider:"
                                value={product.provider || ""}
                                halfWidth={true} 
                                onChange={(change) => updateProperty(change, "provider")}
                            />
                            <Input 
                                type="text" 
                                label="Payment method:"
                                value={product.paymentMethod || ""}
                                halfWidth={true} 
                                onChange={(change) => updateProperty(change, "paymentMethod")}
                            />
    
                            <Input 
                                type="date" 
                                label="Date bought:"
                                value={product.dateBought || ""}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change, "dateBought")}
                            />
                            <Input 
                                type="date" 
                                label="Date sold:"
                                value={product.dateSold || ""}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change, "dateSold")}
                            />
                            <Input 
                                type="date" 
                                label="Date payed:"
                                value={product.datePayed || ""}
                                thirdWidth={true} 
                                onChange={(change) => updateProperty(change, "datePayed")}
                            />
    
                            <Input 
                                type="text" 
                                label="Invoice identifier:"
                                value={product.invoice || ""}
                                halfWidth={true} 
                                onChange={(change) => updateProperty(change, "invoice")}
                            />
                            <Input 
                                type="text" 
                                label="Payment location:"
                                value={product.paymentLocation || ""}
                                halfWidth={true} 
                                onChange={(change) => updateProperty(change, "paymentLocation")}
                            />
                        </>)}
                    />
                </div>
            </div>
            )
        }

        return result   
    }

    return Content()
}

const styles = StyleSheet.create({
    productsDetails: {
        display: "flex",
        backgroundColor: "#FFF",
        height: "86vh",  
        paddingVertical: "100px",
    },
    productsDetails_empty: {
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
    productsDetails_noResults: {
        color: "#333",
    },
    pictureContainer: {
        flexBasis: 1,
        minHeight: "400px",
    },
    producInformation: {
        flexBasis: 3, 
        flexGrow: 1,
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    image: {
        width: "450px",
        height: "300px",
        minHeight: 280,
        marginBottom: 20
    },
    h1: {
        fontSize: "3rem",
    },
    h2: {
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
        height: "80vh"
    },
    pictureContainer: {
        height: 400,
        flexBasis: "content",
        width: 450,
        order: 1,
    },
    paymentContainer: {
        width: "100%",
        maxWidth: 450,
        order: "1",
        order: 2
    },
    productDataContainer: {
        width: "calc(100% - (450px + 40px))",
        paddingLeft: 20,
        paddingRight: 20,
        order: 3
    },
    productDataContainer__formWrapper: {
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
    }
});

const childStyles = {
    headlineInputs: {
        container: {
        },
        inputLabel: {
        },
        prefix: {
        },
        input: {
            fontSize: 32,
            maxWidth: 300,
            border: 0,
            textDecoration: "underline"
        },
        input__prefixed: {
        },
        dateInput: {
        },
        textArea: {
        },
    }

}