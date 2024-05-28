import React from 'react';
import { View } from 'react-native';
import TreeNode from './TreeNode';

interface TreeViewProps {
  data: any[];
  level?: number;
  onSelect: (id: string, selected: boolean) => void;
  selectedItems: Set<string>;
}

const TreeView: React.FC<TreeViewProps> = ({ data, level = 0, onSelect, selectedItems }) => {

  return (
    <>
    <View>
      {data.map((node) => (
        <TreeNode
          key={node.id}
          id={node.id}
          label={node.category || node.name}
          level={level}
          onSelect={onSelect}
          selectedItems={selectedItems}
        >
          {node.brands && (
            <TreeView data={node.brands} level={level + 1} onSelect={onSelect} selectedItems={selectedItems} />
          )}
          {node.models && (
            <TreeView data={node.models} level={level + 1} onSelect={onSelect} selectedItems={selectedItems}  />
          )}
          {node.variants && (
            <TreeView 
                data={node.variants.map(
                    (variant: {id: string, name: string; }) => 
                        ({ id: variant.id, name: variant.name })
                )} 
                level={level + 1} 
                onSelect={onSelect} 
                selectedItems={selectedItems} 
            />
          )}
        </TreeNode>
      ))}
    </View>
  </>
  );
};

export default TreeView;

