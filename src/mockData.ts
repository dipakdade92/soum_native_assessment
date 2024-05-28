export interface ProductVariant {
    id: string;
    name: string;
  }
  
  export interface ProductModel {
    id: string;
    name: string;
    variants: ProductVariant[];
  }
  
  export interface ProductBrand {
    id: string;
    name: string;
    models: ProductModel[];
  }
  
  export interface ProductCategory {
    id: string;
    category: string;
    brands: ProductBrand[];
  }
  
  export const products: ProductCategory[] = [
    {
      id: '1',
      category: 'Mobile Phones',
      brands: [
        {
          id: '1-1',
          name: 'Apple',
          models: [
            {
              id: '1-1-1',
              name: 'iPhone 8',
              variants: [
                { id: '1-1-1-1', name: '64GB' },
                { id: '1-1-1-2', name: '128GB' },
              ],
            },
            {
              id: '1-1-2',
              name: 'iPhone X',
              variants: [
                { id: '1-1-2-1', name: '256GB' },
                { id: '1-1-2-2', name: '512GB' },
              ],
            },
          ],
        },
        {
          id: '1-2',
          name: 'Samsung',
          models: [
            {
              id: '1-2-1',
              name: 'Galaxy S21',
              variants: [
                { id: '1-2-1-1', name: '128GB' },
                { id: '1-2-1-2', name: '256GB' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '2',
      category: 'Watches',
      brands: [
        {
          id: '2-1',
          name: 'Apple',
          models: [
            {
              id: '2-1-1',
              name: 'Apple Watch Series 4',
              variants: [
                { id: '2-1-1-1', name: '40mm' },
                { id: '2-1-1-2', name: '44mm' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '3',
      category: 'Computers',
      brands: [
        {
          id: '3-1',
          name: 'Dell',
          models: [
            {
              id: '3-1-1',
              name: 'XPS 13',
              variants: [
                { id: '3-1-1-1', name: '256GB SSD' },
                { id: '3-1-1-2', name: '512GB SSD' },
              ],
            },
          ],
        },
        {
          id: '3-2',
          name: 'HP',
          models: [
            {
              id: '3-2-1',
              name: 'Pavilion',
              variants: [
                { id: '3-2-1-1', name: '1TB HDD' },
              ],
            },
          ],
        },
      ],
    },
  ];
  