import Category from '../models/category';
import Product from '../models/Product';

export const CATEGORIES = [
  new Category(1, 'Electronics', '#3498db'),
  new Category(2, 'Clothing', '#e74c3c'),
  new Category(3, 'Home and Garden', '#2ecc71'),
];

export const PRODUCTS = [
  new Product(1, 'Laptop', 'High-performance laptop', 'laptop.jpg', 1, '123 Main St, City A'),
  new Product(2, 'T-shirt', 'Comfortable cotton T-shirt', 'tshirt.jpg', 2, '456 Oak Ave, City B'),
  new Product(3, 'Garden Tools Set', 'Complete set for gardening', 'gardentools.jpg', 3, '789 Pine St, City C')
];
