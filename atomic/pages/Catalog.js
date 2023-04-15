import { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { useSelector , useDispatch } from "react-redux";
import { createProduct, deleteProduct, updateProduct, readProducts,  setFilter } from '../../store/productsSlice'
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateResponsiveStyle, DEVICE_SIZES, useDeviceSize, maxSize, minSize } from 'rn-responsive-styles'
import { processStyle } from '../helpers/styles'
import ProductsFilter from "../organisms/ProductsFilter";
import ProductsList from "../organisms/ProductsList";
import ProductDetails from "../organisms/ProductDetails";
import Playground from "../templates/Playground";
import Menu from "../organisms/Menu";

export default function Test({navigation}) { 
  const styles = useStyles()
  const deviceSize = useDeviceSize()
  const dispatch = useDispatch()
  const filter = useSelector(state => state.productsList.filter)
  const products = useSelector(state => state.productsList.products)

  const [productId, setProductId ] = useState('');
  const [filterList, setFilterList]  = useState();

  const triggerCreateProduct = async () => {
    let res = await dispatch(createProduct())
    setProductId(res.payload.id)
}

const triggerDeleteProduct = async () => {
    let res = await dispatch(deleteProduct(productId))
    setProductId("")
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
  
  const clearSelectedId = () => setProductId("")

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

const triggerMenuEvent = (event) => {
  if(event == 'search') {
    setProductId("")
  } else if(event == 'create') {
    triggerCreateProduct()
  } else if(event == 'delete') {
    triggerDeleteProduct()
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
          onClick={(props) => setProductId(props)} 
        />
      </View>
      <ScrollView style={processStyle(styles.catalogContent)}>
        <Menu onPress={triggerMenuEvent}/>
        <ProductDetails 
            id={productId} 
            onChange={(prod) => triggerUpdateProduct(prod)}
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
        alignItems: "center",
        justifyContent: "space-between",
      },
    },
    [minSize(DEVICE_SIZES.LG)]: {
      catalog__contentWrapper: {
        width: "100%",
        maxWidth: 1200,
        marginLeft: "auto",
        marginRight: "auto"
      },
      catalog__contentWrapper_open: {
        width: "100%",
        maxWidth: 1200,
        marginLeft: "auto",
        marginRight: "auto"
      },
      catalogFilters: {
        width: "25%",
        backgroundColor: "#CCC",
      },
      catalogContent: {
        width: "75%",
      },
    }
  },
  {
    
  },
);