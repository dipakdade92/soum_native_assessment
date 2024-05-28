import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface TreeNodeProps {
  id: string;
  label: string;
  children?: React.ReactNode;
  level: number;
  onSelect: (id: string, selected: boolean) => void;
  selectedItems: Set<string>;
}

const TreeNode: React.FC<TreeNodeProps> = ({ id, label, children, level, onSelect, selectedItems }) => {
  const [collapsed, setCollapsed] = useState(selectedItems?.has(id));
  const toggleCollapse = () => setCollapsed(!collapsed);

  const handleSelect = (value: boolean) => {
    onSelect(id, value);
  };

  return (
    <View style={{ marginLeft: level * 20 }}>
      <View style={styles.node}>
      <BouncyCheckbox
            isChecked={selectedItems?.has(id)}
            size={18}
            fillColor="green"
            unFillColor="#FFFFFF"
            text={label}
            iconStyle={{ borderColor: "blue" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{ fontFamily: "JosefinSans-Regular" }}
            onPress={(isChecked: boolean) => {
                toggleCollapse();
                handleSelect(isChecked); 
            }}
        />
      </View>
      {collapsed && (
        <View style={styles.children}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  node: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
  },
  children: {
    marginLeft: 10,
  },
});

export default TreeNode;
