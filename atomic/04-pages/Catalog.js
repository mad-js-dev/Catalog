import { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { useSelector , useDispatch } from "react-redux";
import { createProduct, deleteProduct, updateProduct, readProducts,  setFilter, setProductId } from '../../store/productsSlice'
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateResponsiveStyle, DEVICE_SIZES, useDeviceSize, maxSize, minSize } from 'rn-responsive-styles'
import { processStyle } from '../00-helpers/styles'
import ProductsFilter from "../03-organisms/ProductsFilter";
import ProductsList from "../03-organisms/ProductsList";
import ProductDetails from "../03-organisms/ProductDetails";
import Menu from "../03-organisms/Menu";

export default function Catalog({navigation}) { 
  const styles = useStyles()
  const deviceSize = useDeviceSize()
  const dispatch = useDispatch()
  const filter = useSelector(state => state.productsList.filter)
  const products = useSelector(state => state.productsList.products)
  const productId = useSelector(state => state.productsList.productId)
  //const [productId, setProductId ] = useState('');
  const [filterList, setFilterList]  = useState();

  const triggerCreateProduct = async () => {
    let res = await dispatch(createProduct())
    //setProductId(res.payload.id)
    dispatch(setProductId(res.payload.id))
  }

  const triggerDeleteProduct = async () => {
      let res = await dispatch(deleteProduct(productId))
      dispatch(setProductId(""))
  }

 const triggerUpdateFilter = async (newFilter) => {
      let res = await dispatch(setFilter(newFilter))
      //filterProducts()
  }

  const triggerUpdateProduct = async (newProduct) => {
      let res = await dispatch(updateProduct({_id: productId, product: newProduct})).then((res) => {
        console.log(res)
      })
  }

  const filterProducts = () => {
    console.log("filtering again")
    let result = [];
    let filtersCount = 0
    let filters = []
    
    //remove unselected filters
    Object.keys(filter).map((key) => { 
      if(filter[key] != -1) filters.push({key, value: filter[key]})
    } );
    console.log(filter,filters, products)

    if(filters.length > 0) {
        Object.keys(products).filter( (key) => {
            let amountFiltered = 0;
            Object.keys(filters).map( (filterKey) => {
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
        
        setFilterList(result);
    } else {
        result = [...products]
        result = result.sort((a,b)=>b.lastEdit-a.lastEdit);
        setFilterList(result);
    }
}

const triggerEvent = (event) => {
  if(event == 'search') {
    dispatch(setProductId(""))
  } else if(event == 'create') {
    triggerCreateProduct()
  } else if(event == 'remove') {
    triggerDeleteProduct()
  } else if(event == 'takePicture') {
    navigation.navigate("TakePicture")
  }
}

useEffect(()=>{
    filterProducts();
}, [filter, products])

  //style={(productId != "") ? processStyle(styles.content_open) : processStyle(styles.content)}
  return (
    <View style={(productId != "") ? processStyle(styles.catalog__contentWrapper_open) : processStyle(styles.catalog__contentWrapper)}>
      <View style={processStyle(styles.catalogFilters)}>
        <ProductsFilter 
          filter={filter} 
          onChange={triggerUpdateFilter} 
        />
        <ProductsList 
          style={processStyle(styles.catalogFilters__list)} 
          selectable={true} 
          selectedId={productId} 
          list={filterList} 
          onClick={(props) => dispatch(setProductId(props))} 
        />
      </View>
      <ScrollView style={processStyle(styles.catalogContent)}>
        <Menu onPress={triggerEvent}/>
        <ProductDetails 
            id={productId} 
            onChange={(prod) => triggerUpdateProduct(prod)}
            onPress={triggerEvent}
        />
      </ScrollView>
    </View>
  )
}

const useStyles = CreateResponsiveStyle(
  {
    catalog__contentWrapper: {
        width: "200%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    catalog__contentWrapper_open: {
      width: "200%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginLeft: "-100%",
    },
    catalogFilters: {
      display: "flex", 
      flexDirection: "column",
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    catalogContent: {
      width: Dimensions.get('window').width,
    },
    catalogFilters__list: {
      flexBasis: "auto",
      width: 320,
    }
  },
  {
    [maxSize(DEVICE_SIZES.MD)]: {
      menu__contentWrapper: {
        width: Dimensions.get('window').width,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      },
    },
    [minSize(DEVICE_SIZES.LG)]: {
      catalog__contentWrapper: {
        width: "100%",
        alignItems: "start",
        gap: 20,
        maxWidth: 1200,
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: "5vh"
      },
      catalog__contentWrapper_open: {
        width: "100%",
        alignItems: "start",
        gap: 20,
        maxWidth: 1200,
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: "5vh"
      },
      catalogFilters: {
        width: "25%",
        height: "80vh",
        backgroundColor: "#CCC",
        overflowX: "hidden",
        overflowY: "scroll",
      },
      catalogContent: {
        width: "75%",
      },
    }
  },
  {
    
  },
);