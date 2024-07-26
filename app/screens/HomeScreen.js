
import { StyleSheet, Text, View, ActivityIndicator, FlatList,  } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Card1 from '../components/cards/card1';
import Header from '../components/Header';
import { FilterDrawer } from '../components/Drawer';
import { SortDrawer } from '../components/Drawer';
import { CartContext } from '../context/CartContext';
const HomeScreen = ({ searchTerm,navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawerVisibleFilter, setDrawerVisibleFilter] = useState(false);
  const [drawerVisibleSort, setDrawerVisibleSort] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  // fetching products from fakestore api
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

// calling drawer after clicking on filter and sort icon
  const handleFilterPress = () => {
    setDrawerVisibleFilter(true);
  };

  const handleSortPress = () => {
    setDrawerVisibleSort(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisibleFilter(false);
    setDrawerVisibleSort(false);
  };

  //handeling filter of products
  const handleApplyFilter = (selectedCategories) => {
    // console.warn('Selected Categories:', selectedCategories);
    const categories = Object.keys(selectedCategories).filter(
      (category) => selectedCategories[category]
    );
    console.log('Categories to Filter:', categories);
    if (categories.length > 0) {
      console.log('All Products:', products);
      const filtered = products.filter((product) =>
        categories.includes(product.category)
      );
      console.warn('Filtered Products:', filtered);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  // sorting products operations
  const handleApplySort = (sortOption) => {
    let sortedProducts = [...filteredProducts];
    if (sortOption === 'asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'normal') {
      sortedProducts = [...products];
    }
    setFilteredProducts(sortedProducts);
  };

  // search filtering operation
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  // // add to cart operation 
  const handleAddToCart = (item) => {
    addToCart(item);
  };

//  if api is not loaded then this loader will be there
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }



  return (
    <View style={styles.container}>
      <Header onFilterPress={handleFilterPress} onSortPress={handleSortPress} />
      <FilterDrawer
        isVisibleFilter={drawerVisibleFilter}
        onClose={handleCloseDrawer}
        onApplyFilter={handleApplyFilter}
      />

      <SortDrawer
        isVisibleSort={drawerVisibleSort}
        onClose={handleCloseDrawer}
        onApplySort={handleApplySort}
      />
      {filteredProducts.length > 0 ? (
        <FlatList
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text style={styles.pagetitle}  >New Listings</Text>
            </View>
          }
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card1
              title={item.title}
              description={item.description}
              image={item.image}
              price={item.price}
              category={item.category}
              addToCart={()=>handleAddToCart(item)}
              toDetails={()=>navigation.navigate('Details',{item})}
            />
          )}
          numColumns={2}
        />
      ) : (
        <View style={styles.noProducts}>
          <Text>No products found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 16,
  },
  pagetitle: {
    fontSize: 24,
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom:20,
    fontWeight:"bold"
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProducts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
