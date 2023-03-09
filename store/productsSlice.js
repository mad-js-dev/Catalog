
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
// Slice
const serverAdress = (window.location.hostname== "localhost") ? "http://localhost:80": "";
console.log(serverAdress)

export const readProducts = createAsyncThunk('read/products', async (dispatch, getState) => {
  console.log('Read all products store call', dispatch)
  return await axios.get(serverAdress+"/api/getProducts")
  .then((res) => {
      return res.data
  });
});

export const createProduct = createAsyncThunk('create/product', async (dispatch, getState) => {
  console.log('Create product store call', dispatch)
  return await axios.get(serverAdress+"/api/createProduct")
  .then((res) => {
      return res.data
  });
});


export const updateProduct = createAsyncThunk('update/product', async (dispatch, getState) => {
  console.log('Update product store call', dispatch)
  return await axios.post(serverAdress+"/api/updateProduct", dispatch)
    .then((res) => {
      return res.data
    });
});

export const deleteProduct = createAsyncThunk('delete/product', async (dispatch, getState) => {
  console.log('Delete product store call', {_id: dispatch})
  return await axios.post(serverAdress+"/api/deleteProduct", {_id: dispatch})
    .then((res) => {
      return res.data
    });
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filter: {
      state: 2,
      condition: -1,
      category: -1,
      subcategory: -1,
      designer: -1,
      color1: -1,
      color2: -1,
      material: -1,
      size: -1,
    },
    settings: [
      { 
      _id: 0,
      propertyType: "select",
      label: "State",
      name: "state", 
      list: [
          {_id:0, name: "In Evaluation", value: 0},
          {_id:1, name: "Deposit", value: 1},
          {_id:2, name: "Bought", value: 2},
          {_id:3, name: "Sold", value: 3},
          {_id:4, name: "Returned to Owner", value: 4}
      ] 
      },
      {
      _id: 1,
      propertyType: "multiSelect",
      label1: "Category",
      label2: "Subcategory",
      name: "itemSpec", 
      list: [
          { 
          _id: 0,
          value: 0,
          name: "Bags", 
          list: [
              {_id:0, name: "BagPacks", value: 0},
              {_id:1, name: "Clutch", value: 1},
              {_id:2, name: "Cross-Body", value: 2},
              {_id:3, name: "Hand", value: 3},
              {_id:4, name: "Travel", value: 4}
          ]
          },
          { 
          _id: 1,
          value: 1,
          name: "Accessories", 
          list: [
              {_id:0, name: "Gloves", value: 0},
              {_id:1, name: "Bandana", value: 1},
              {_id:2, name: "Belts", value: 2},
              {_id:3, name: "Hats", value: 3},
              {_id:4, name: "Lifestyle", value: 4},
              {_id:5, name: "Pursesm wallets & cases", value: 5},
              {_id:6, name: "Scarves", value: 6},
              {_id:7, name: "Silk handkerchief", value: 7},
              {_id:8, name: "Subnglasses", value: 8},
              {_id:9, name: "Wallets", value: 9},
              {_id:10, name: "Watches", value: 10}
          ] 
          },
          { 
          _id: 2,
          value: 2,
          name: "Shoes", 
          list: [
              {_id:0, name: "Ballet flats", value: 0},
              {_id:1, name: "Boots", value: 1},
              {_id:2, name: "Heels", value: 2},
              {_id:3, name: "Espadrilles", value: 3},
              {_id:4, name: "Flats", value: 4},
              {_id:5, name: "Ankle boots", value: 5},
              {_id:6, name: "Lace ups", value: 6},
              {_id:7, name: "Mid heel", value: 7},
              {_id:8, name: "Mules & Clogs", value: 8},
              {_id:9, name: "Sandals", value: 9},
              {_id:10, name: "Trainers", value: 10}
          ] 
          },
          { 
          _id: 3,
          value: 3,
          name: "Jewelery", 
          list: [
              {_id:0, name: "Bracelet", value: 0},
              {_id:1, name: "Broche", value: 1},
              {_id:2, name: "Ear Rings", value: 2},
              {_id:3, name: "Ring", value: 3}
          ] 
          }
      ]
      },
      { 
        _id: 2,
        propertyType: "select",
        label: "Designer",
        name: "designer", 
        list: [
          {_id:0, name: "Balenciaga", value: 0},
          {_id:1, name: "Céline", value: 1},
          {_id:2, name: "Chanel", value: 2},
          {_id:3, name: "Dior", value: 3},
          {_id:4, name: "Fendi", value: 4},
          {_id:5, name: "Gucci", value: 5},
          {_id:6, name: "Hermès", value: 6},
          {_id:7, name: "Louis Vuitton", value: 7},
          {_id:8, name: "Prada", value: 8},
          {_id:9, name: "Yves Saint Laurent", value: 9},
          {_id:10, name: "Rayban", value: 10}
        ] 
      },
      { 
        _id: 3,
        propertyType: "select",
        label: "Color",
        name: "color", 
        list: [
          {_id:0, name: "Amber", value: 0},
          {_id:1, name: "Azure", value: 1},
          {_id:2, name: "Beige", value: 2},
          {_id:3, name: "Blue", value: 3},
          {_id:4, name: "Bronze", value: 4},
          {_id:5, name: "Brown", value: 5},
          {_id:6, name: "Burgundy", value: 6},
          {_id:7, name: "Charcoal", value: 7},
          {_id:8, name: "Clay", value: 8},
          {_id:9, name: "Coral", value: 9},
          {_id:10, name: "Cyan", value: 10},
          {_id:11, name: "Gold", value: 11},
          {_id:12, name: "Cream", value: 12},
          {_id:13, name: "Gray", value: 13},
          {_id:14, name: "Green", value: 14},
          {_id:15, name: "Indigo", value: 15},
          {_id:16, name: "Khaki", value: 16},
          {_id:17, name: "Lavender", value: 17},
          {_id:18, name: "Magenta", value: 18},
          {_id:19, name: "Maroon", value: 19},
          {_id:20, name: "Mauve", value: 20},
          {_id:21, name: "Mint", value: 21},
          {_id:22, name: "Multi-Color", value: 22},
          {_id:23, name: "Mustard", value: 23},
          {_id:24, name: "Navy Blue", value: 24},
          {_id:25, name: "Off White", value: 25},
          {_id:26, name: "Olive", value: 26},
          {_id:27, name: "Orange", value: 27},
          {_id:28, name: "Peach", value: 28},
          {_id:29, name: "Pink", value: 29},
          {_id:30, name: "Purple", value: 30},
          {_id:31, name: "Red", value: 31},
          {_id:32, name: "Ruby", value: 32},
          {_id:33, name: "Rust", value: 33},
          {_id:34, name: "Silver", value: 34},
          {_id:35, name: "Tan", value: 35},
          {_id:36, name: "Teal", value: 36},
          {_id:37, name: "Turquoise", value: 37},
          {_id:38, name: "Violet", value: 38},
          {_id:39, name: "White", value: 39},
          {_id:40, name: "Yellow", value: 40}
        ] 
      },
      { 
        _id: 4,
        propertyType: "select",
        label: "Material",
        name: "material", 
        list: [
          {_id:0, name: "Cloth", value: 0},
          {_id:1, name: "Cotton", value: 1},
          {_id:2, name: "Denim - Jeans", value: 2},
          {_id:3, name: "Exotic leathers", value: 3},
          {_id:4, name: "Faux fur", value: 4},
          {_id:5, name: "Fur", value: 5},
          {_id:6, name: "Glitter", value: 6},
          {_id:7, name: "Lace", value: 7},
          {_id:8, name: "Leather", value: 8},
          {_id:9, name: "Other", value: 9},
          {_id:10, name: "Patent leather", value: 10},
          {_id:11, name: "Plastic", value: 11},
          {_id:12, name: "Polyamide", value: 12},
          {_id:13, name: "Polyester", value: 13},
          {_id:14, name: "Pony-style calfskin", value: 14},
          {_id:15, name: "Rubber", value: 15},
          {_id:16, name: "Silk", value: 16},
          {_id:17, name: "Suede", value: 17},
          {_id:18, name: "Synthetic", value: 18},
          {_id:19, name: "Tweed", value: 19},
          {_id:20, name: "Vegan leather", value: 20},
          {_id:21, name: "Velvet", value: 21},
          {_id:22, name: "Wicker", value: 22},
          {_id:23, name: "Wood", value: 23},
          {_id:24, name: "Woole", value: 24}
        ] 
      },
      { 
        _id: 5,
        propertyType: "select",
        label: "Size",
        name: "size", 
        list: [
          {_id:0, name: "Micro", value: 0},
          {_id:1, name: "Mini", value: 1},
          {_id:2, name: "Small", value: 2},
          {_id:3, name: "Medium", value: 3},
          {_id:4, name: "Medium Small", value: 4},
          {_id:5, name: "Medium Large", value: 5},
          {_id:6, name: "Large", value: 6},
          {_id:7, name: "Extra Large", value: 7},
          {_id:8, name: "XXXL Large", value: 8}
        ] 
      },
      { 
        _id: 6,
        propertyType: "select",
        label: "Condition",
        name: "condition", 
        list: [
          {_id:0, name: "New and Pristine", value: 0},
          {_id:1, name: "Very Good", value: 1},
          {_id:2, name: "Good", value: 2},
          {_id:3, name: "Fair", value: 3},
          {_id:4, name: "Project use", value: 4}
        ] 
      },
      { _id: 7, propertyType: "text", label: "Product name", name: "name"},
      { _id: 8, propertyType: "date", label: "Date bought", name: "dateBought"},
      { _id: 9, propertyType: "date", label: "Date sold", name: "dateSold"},
      { _id: 10, propertyType: "text", label: "Product owner", name: "ownerName"},
      { _id: 11, propertyType: "number", label: "Price bought", name: "priceBought"},
      { _id: 12, propertyType: "number", label: "Minimal", name: "priceMinSell"},
      { _id: 13, propertyType: "number", label: "PVP", name: "priceSell"},
      { _id: 14, propertyType: "text", label: "Provider payment method", name: "paymentMethod"},
      { _id: 15, propertyType: "date", label: "Provider pay date", name: "paymentDate"},
      { _id: 16, propertyType: "text", label: "Location", name: "paymentLocation"},
      { _id: 17, propertyType: "text", label: "Invoice no. / Name", name: "paymentInvoice"},
      { _id: 18, propertyType: "textArea", label: "Description", name: "description"}
    ],
  },
  reducers: {
    setFilter:  (state, action) => {
      state.filter = action.payload
      
      /*switch(action.payload.type) {
        case 'meh': 
          break;
      }
      */
    },
  },
  extraReducers(builder) {
    builder
      .addCase(readProducts.fulfilled, (state, action) => {
        state.products = action.payload
        console.log(state.products, action.payload, state.filter)
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products = action.payload.products
        console.log(state, action.payload)
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = action.payload
        console.log(state, action.payload)
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = action.payload
        console.log(state, action.payload)
      })
    }
});

export const { setFilter, getFilteredProducts } = productsSlice.actions

export default productsSlice.reducer


