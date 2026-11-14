const products = [
  {
    id: 1,
    name: "Ном",
    price: 15000,
    inStock: true,
  },
  {
    id: 2,
    name: "үзэг",
    price: 1500,
    inStock:true,
  },
  {
    id: 3,
    name: "цүнх",
    price: 45000,
    inStock: false,
  },
  {
    id: 4,
    name: "Дэвтэр",
    price: 3000,
    inStock: true,  
  }
];

function getProductById(id) {
  return products.find((product) => product.id === id);
}
