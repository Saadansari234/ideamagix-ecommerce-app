// components/Drawer.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, CheckBox } from 'react-native';
import CustomCheckbox from '../common/Checkbox';
import CustomRadioButton from '../common/Radio';
const categories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];

export const FilterDrawer = ({ isVisibleFilter, onClose, onApplyFilter }) => {

    const [selectedCategories, setSelectedCategories] = useState({});

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const handleApplyFilter = () => {
        onApplyFilter(selectedCategories);
        onClose();
    };
    if (!isVisibleFilter) return null;

    return (
        <View style={styles.drawer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            {categories.map((category) => (
                <View style={styles.drawerItem} key={category}>
                    <CustomCheckbox
                        isChecked={selectedCategories[category] || false}
                        onToggle={() => handleCategoryChange(category)}
                        label={category}
                    />
                  
                </View>
            ))}
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilter}>
                <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
        </View>
    );
};

export const SortDrawer = ({ isVisibleSort, onClose, onApplySort }) => {
    const [selectedSort, setSelectedSort] = useState(null);
  
    const handleSortChange = (sortOption) => {
      setSelectedSort(sortOption);
    };
  
    const handleApplySort = () => {
      onApplySort(selectedSort);
      onClose();
    };
  
    if (!isVisibleSort) return null;
  
    return (
      <View style={styles.drawer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <CustomRadioButton
        isSelected={selectedSort === 'normal'}
        onPress={() => handleSortChange('normal')}
        label="Normal"
      />
        <CustomRadioButton
          isSelected={selectedSort === 'asc'}
          onPress={() => handleSortChange('asc')}
          label="Price: Low to High"
        />
        <CustomRadioButton
          isSelected={selectedSort === 'desc'}
          onPress={() => handleSortChange('desc')}
          label="Price: High to Low"
        />
        <TouchableOpacity style={styles.applyButton} onPress={handleApplySort}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

const styles = StyleSheet.create({
    drawer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '60%',
        height: '100%',
        backgroundColor: 'white',
        elevation: 5,
        padding: 20,
        zIndex: 10,
    },
    closeButton: {
        marginBottom: 20,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    drawerItem: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    applyButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#DB4444',
        alignItems: 'center',
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
    },
});