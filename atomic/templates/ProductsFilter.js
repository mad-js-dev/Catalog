import { React, Component, useState, useEffect } from "react";
import { StyleSheet, Text, Pressable, View, AppRegistry } from "react-native";
import { useSelector , useDispatch } from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons';
import { fetchSchema } from '../../store/productsSlice'
import { useIsFocused } from '@react-navigation/native'

import Input from "../molecules/Input";
import Accordion from "../molecules/Accordion";

export default function ProductsFilter(props) {    
    let settings = useSelector(state => state.productsList.settings)
    const [ subcategories, setSubcategories ] = useState([]);

    const updateFilter = (change, prop) => {
        let newValue = {...props.filter};
        newValue[prop] = change;
        console.log(prop, newValue[prop])

            if(prop=='category') {
                newValue.subcategory = -1;
                updateSubcategories(newValue[prop])
            }

       props.onChange(newValue);
    };

    const updateSubcategories = (change) => {
        setSubcategories((change == "-1") ? [] : settings[1].list[change].list)
    };

    return (
        <div style={styles.productsFilter}>
            <div style={styles.productsFilter__filterWrapper}>
                <Accordion 
                        title="Filters" 
                        headerIcon="filter"
                        display={false}
                        content={(<>
                    <Input 
                        type="select" 
                        label="Category"
                        value={props.filter.category}
                        values={settings[1].list}
                        halfWidth={true} 
                        onChange={(change) => updateFilter(change - 1, "category")}
                    />
                    <Input 
                        type="select" 
                        label="Subcategory"
                        value={props.filter.subcategory}
                        values={subcategories}
                        halfWidth={true} 
                        onChange={(change) => updateFilter(change - 1, "subcategory")}
                    />
                    <Input 
                        type="select" 
                        label="State"
                        value={props.filter.state}
                        values={settings[0].list}
                        halfWidth={true} 
                        onChange={(change) => updateFilter(change - 1, "state")}
                    />
                    <Input 
                        type="select" 
                        label="Condition"
                        value={props.filter.condition}
                        values={settings[6].list}
                        halfWidth={true} 
                        onChange={(change) => updateFilter(change - 1, "condition")}
                    />
                    <Input 
                        type="select" 
                        label="Designer"
                        value={props.filter.designer}
                        values={settings[2].list}
                        onChange={(change) => updateFilter(change - 1, "designer")}
                     />
                    <Input 
                        type="select" 
                        label="Color 1"
                        value={props.filter.color1}
                        values={settings[3].list}
                        halfWidth={true} 
                        onChange={(change) => updateFilter(change - 1, "color1")}
                    />
                    <Input 
                        type="select" 
                        label="Color 2"
                        value={props.filter.color2}
                        values={settings[3].list}
                        halfWidth={true} 
                        onChange={(change) => updateFilter(change - 1, "color2")}
                    />
                    <Input 
                        type="select" 
                        label="Material"
                        value={props.filter.material}
                        values={settings[4].list}
                        halfWidth={true} 
                        onChange={(change) => updateFilter(change - 1, "material")}
                    />
                    <Input 
                        type="select" 
                        label="Size"
                        value={props.filter.size}
                        values={settings[5].list}
                        halfWidth={true} 
                        onChange={(change) => updateFilter(change - 1, "size")}
                    />
                    </>)} />
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20
    },
    productsFilter__filterWrapper: {
        border: "1px solid",
        borderRadius: 5, 
    },
    productsFilter__filtersHeader: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 10,
        padding: 10,
        textAlign: "right",
    },
    productsFilter__filtersContent: {
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        minHeight: 300,
        overflow: "hidden",
        marginLeft: 10,
        marginRight: 10,
    },
    productsFilter__filtersContent_hidden: {
        minHeight: 0,
        height: 0
    },
    productsFilter__filtersList: {

    },
});
