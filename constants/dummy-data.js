import Category from '../models/category';
import Product from '../models/Product';

export const CATEGORIES = [
  new Category('c1', 'Italian', '#f5428d'),
  new Category('c2', 'Quick & Easy', '#f54242'),
  new Category('c3', 'Hamburgers', '#f5a442'),
  new Category('c4', 'German', '#f5d142'),
  new Category('c5', 'Light & Lovely', '#368dff'),
  new Category('c6', 'Exotic', '#41d95d'),
  new Category('c7', 'Breakfast', '#9eecff'),
  new Category('c8', 'Asian', '#b9ffb0'),
  new Category('c9', 'French', '#ffc7ff'),
  new Category('c10', 'Summer', '#47fced')
];

export const PRODUCTS = [
  new Product(
    1,
    'Product 1',
    'Description for Product 1',
    'image1.jpg'
  ),
  new Product(
    2,
    'Product 2',
    'Description for Product 2',
    'image2.jpg'
  ),
  new Product(
    3,
    'Product 3',
    'Description for Product 3',
    'image3.jpg'
  ),
  new Product(
    4,
    'Product 4',
    'Description for Product 4',
    'image4.jpg'
  ),
  new Product(
    5,
    'Product 5',
    'Description for Product 5',
    'image5.jpg'
  ),
  new Product(
    6,
    'Product 6',
    'Description for Product 6',
    'image6.jpg'
  ),
  new Product(
    7,
    'Product 7',
    'Description for Product 7',
    'image7.jpg'
  ),
  new Product(
    8,
    'Product 8',
    'Description for Product 8',
    'image8.jpg'
  ),
  new Product(
    9,
    'Product 9',
    'Description for Product 9',
    'image9.jpg'
  ),
  new Product(
    10,
    'Product 10',
    'Description for Product 10',
    'image10.jpg'
  )

];
