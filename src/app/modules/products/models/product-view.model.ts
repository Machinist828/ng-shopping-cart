export class ProductViewModel {
  id: number;
  quantity: number;
  title: string;
  price: number;
  imageUrl: string;
  stock: number;
  description: string;

  constructor(id: number, quantity: number, title: string, price: number, imageUrl: string, stock: number, description: string) {
    this.id = id;
    this.quantity = quantity;
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.stock = stock;
    this.description = description;
  }
}
