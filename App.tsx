import React, { useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import TreeView from './src/components/TreeView';
import { products } from './src/mockData';

interface SelectedProductType {
    productCategory: string;
    productBrand: string;
    productModel: string;
    productVariant: string;
    productVariantId: string;
};

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectedProducts, setSelectedProducts] = useState<SelectedProductType[]| []>([]);

  const handleSelect = (id: string, selected: boolean) => {
    let newSelectedItems = new Set(selectedItems);
    
    if (selected) {
      newSelectedItems.add(id);
    } else {
      newSelectedItems = new Set(
        Array.from(newSelectedItems).filter(itemId => !itemId.startsWith(id))
      );
    }

    setSelectedItems(newSelectedItems);
    showSelectedVariants(newSelectedItems)
  };

  const showSelectedVariants = (newSelectedItems: Set<string>) => {
    const selectedVariantIds = Array.from(newSelectedItems);
    const modelsWithSelectedVariants: SelectedProductType[] = [];
  
    // Iterate through each category
    products.forEach(item => {
      // Iterate through each brand
      item.brands.forEach(brand => {
        // Iterate through each model
        brand.models.forEach(model => {
          // Check if any variant of the model is selected
           model.variants.find(variant => {
            if(selectedVariantIds.includes(variant.id)){
              const obj = {
                productCategory: item.category,
                productBrand: brand.name,
                productModel: model.name,
                productVariant: variant.name,
                productVariantId: variant.id
              }
              modelsWithSelectedVariants.push(obj)
            } 
           }
          )
           
        });
      });
    });

    setSelectedProducts(modelsWithSelectedVariants);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Browse Products</Text>
        <TreeView data={products} onSelect={handleSelect} selectedItems={selectedItems} />

        <View style={styles.selectedItemsWrapper}>
          <Text style={styles.selectedItemsHeading}>
            Selected Variants:
          </Text>

          {/* {added scrollview with horizontal orientation for removing error} */}
          <ScrollView horizontal={true} scrollEnabled={false} style={styles.flatListScrollView}>
            <FlatList 
              numColumns={2}
              contentContainerStyle={styles.selectedProductList}
              showsVerticalScrollIndicator={false}
              data={selectedProducts}
              renderItem={({ item }: any)=> (
                <Text key={item.productVariantId} style={styles.selectedItemStyle}>
                  {`${item.productModel} - ${item.productVariant}`}
                </Text>
              )}
              columnWrapperStyle={{ width:'100%' }}
              keyExtractor={(item)=> item.productVariantId}
            />
          </ScrollView>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedItemsWrapper: {
    margin: 10,
  },
  selectedItemsHeading: {
    fontSize: 18,
    marginTop: 5, 
    fontWeight: 'bold',
  },
  flatListScrollView: {
    flexDirection: "column", 
    width: "auto", 
  },
  selectedItemsDetails: {
    flexWrap:'wrap',
    marginVertical: 10,
    backgroundColor: '#fff',
    width: '100%',
    paddingBottom: 40,
    flexDirection: 'row',
    height: "80%",

  },
  selectedProductList: {
    width: "100%",
    alignItems: 'flex-start',
    backgroundColor: "#fff",
    paddingBottom: 40
  },
  selectedItemStyle:{
    margin: 5, 
    maxWidth:"50%",
    color: '#000',
    textAlign: "center",
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: '#f0f0f0',
    textAlignVertical: 'center',
    borderWidth: 1,
    height:45,
    borderColor: "green",
  }
});

export default App;

