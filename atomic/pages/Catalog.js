import { React, Component, useState, useEffect } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { useSelector , useDispatch } from "react-redux";

import Ionicons from '@expo/vector-icons/Ionicons';
import ProductsFilter from "../templates/ProductsFilter";
import ProductsList from "../templates/ProductsList";
import ProductDetails from "../templates/ProductDetails";
import { createProduct, deleteProduct, updateProduct, setFilter } from '../../store/productsSlice'

export default function Catalog () {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.productsList.filter)
    const products = useSelector(state => state.productsList.products)

    const [ productId, setProductId ] = useState('');
    const [filterList, setFilterList]  = useState(filter);

    const triggerCreateProduct = async () => {
        let res = await dispatch(createProduct())
        setProductId(res.payload.id)
    }

    const triggerDeleteProduct = async () => {
        let res = await dispatch(deleteProduct(productId))
        setProductId("")
    }

    const triggerUpdateFilter = async (newFilter) => {
        console.log(".", newFilter)
        let res = await dispatch(setFilter(newFilter))
        //filterProducts()
    }

    const triggerUpdateProduct = async (newProduct) => {
        let res = await dispatch(updateProduct({_id: productId, product: newProduct})).then((res) => {
            console.log("Data updated", res)
        })
    }

    const filterProducts = () => {
        let result = [];
        let filtersCount = 0
        let filters = []
        
        console.log(filter)
        
        //remove unselected filters
        Object.keys(filter).map((key) => { 
            if(filter[key] != -1) filters.push({key, value: filter[key]})
        } );

        console.log(filters, products)
        if(filters.length > 0) {
            Object.keys(products).filter( (key) => {
                let amountFiltered = 0;
                Object.keys(filters).map( (filterKey) => {
                    console.log( products[key][filters[filterKey].key], filters[filterKey].value  )
                    if(products[key][filters[filterKey].key]  == filters[filterKey].value ) {
                        amountFiltered++
                        if(amountFiltered == filters.length ) result.push(products[key])
                    }  
                })
            })
            
            console.log(result)
            if(result.length != 0) {
                result = result.sort((a,b)=>b.lastEdit-a.lastEdit);
            }
            
            console.log(result)
            setFilterList(result);
        } else {
            result = [...products]
            result = result.sort((a,b)=>b.lastEdit-a.lastEdit);
            setFilterList(result);
        }
    }

    useEffect(()=>{
        filterProducts();
        console.log('fu');
    }, [filter, products])

    const Menu  = () => {
        return (
            <div style={styles.catalogMenu__contentWrapper}>
                    <Text style={styles.catalogMenu__title}></Text>
                    <Pressable 
                        style={styles.catalogMenu__button}
                        onPress={triggerCreateProduct} 
                        title={ "Create product" }
                    >
                        <Text 
                        style={styles.catalogMenu__buttonText}>
                            Create product
                        </Text>
                        <Ionicons 
                            style={styles.catalogMenu__buttonIcon}
                            name="add"
                            size={24} 
                        />
                    </Pressable>
                    <Pressable 
                        style={[styles.catalogMenu__button, styles.catalogMenu__button_danger]}
                        onPress={triggerDeleteProduct} 
                        title={ "foo" }
                    >
                        <Text 
                        style={styles.catalogMenu__buttonText}>
                            Remove product
                        </Text>
                        <Ionicons 
                            style={styles.catalogMenu__buttonIcon}
                            name="trash-bin"
                            size={24} 
                        />
                    </Pressable>
            </div>
        )
    }

    return (
    <div style={styles.content}>
        <div style={styles.catalogFilters}>
            <ProductsFilter 
                style={styles.catalogFilters__filters} 
                filter={filter}
                onChange={triggerUpdateFilter} 
            />

            <ProductsList 
                style={styles.catalogFilters__list} 
                selectable={true} 
                selectedId={productId} 
                list={filterList} 
                onClick={(props) => setProductId(props)} 
            />
        </div>
        <div style={styles.catalogContent}>
            <div style={styles.catalogMenu}>
                <Menu />
            </div>
            <div style={styles.product}>
                <ProductDetails 
                    id={productId} 
                    onChange={(prod) => triggerUpdateProduct(prod)}
                />
            </div>
        </div>
    </div>
    )
  }

  const styles = StyleSheet.create({
    header: {
        fontSize: 20
    },
    content: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#EEE",    
        padding: 10,
        width: "100%",
        maxWidth: 1400,
        marginLeft: "auto",
        marginRight: "auto"
    },
    catalogFilters: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#CCC",
        height: "86vh", 
        width: 450,
        padding: 20,
    },
    catalogContent: {
        width: "100%",
        paddingLeft: 20,
    },
    catalogFilters__filters: {
        flexBasis: "auto",
    },
    catalogFilters__list: {
        flexBasis: "auto",
        width: 320,
    },
    catalogMenu: { 
        height: 70,
        width: "100%",
        backgroundColor: "#DDD",
    },
    catalogMenu__contentWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    catalogMenu__title: {
        display: "inline-block",
        color: "#000",
        margin: 0,
        marginLeft: 20,
        flexGrow: 1,
        fontSize: 24,
        fontWeight: "bold"
    },
    catalogMenu__button: {
        alignSelf: "start",
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        maxWidth: 170,
        backgroundColor: "#00a1ff",
        borderRadius: 5,
        margin: 10
    },
    catalogMenu__button_noText: {
        maxWidth: 48,
        paddingLeft: 10,
    },
    catalogMenu__button_danger: {
        backgroundColor: "#ff7070",
    },
    catalogMenu__buttonText: {
        color: "#FFF",
        marginHorizontal: 10
    },
    catalogMenu__buttonIcon: {
        display: "inline",
        color: "#FFF",
        textAlignVertical: "middle",
        marginVertical: 10,
        marginRight: 10,
    },
    product: {
        marginTop: 20,
        height: "calc(100% - 90px)",
        width: "100%",
        backgroundColor: "#DDD",
    }, 
  });

  