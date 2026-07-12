// data/dishes.ts

export interface Dish {
  id: number;
  name: string;
  tag: string;
  img: string;
}

export const SIGNATURE_DISHES: Dish[] = [
  {
    id: 1,
    name: 'Wagyu Caviar Tartare',
    tag: 'Signature',
    img: '/images/dishes/tartar.jpg',
  },
  {
    id: 2,
    name: 'Pan-Seared Sea Bass',
    tag: 'Seafood',
    img: '/images/dishes/sea-bass.jpg',
  },
  {
    id: 3,
    name: 'Truffle Infused Tagliolini',
    tag: 'Handmade Pasta',
    img: '/images/dishes/tagliolini.jpg',
  },
  {
    id: 4,
    name: 'Smoked Rosemary Duck',
    tag: 'Entrée',
    img: '/images/dishes/rosemary-duck.jpg',
  },
  {
    id: 5,
    name: 'Glazed Pork Belly Belly',
    tag: 'Modern Twist',
    img: '/images/dishes/pork-belly.jpg', 
  },
  {
    id: 6,
    name: 'Saffron Lobster Risotto',
    tag: 'Chef Speciaity',
    img: '/images/dishes/lobster-risotto.jpg',
  },
];