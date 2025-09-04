export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  stock: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Buquê de Rosas",
    description: "Lindo buquê com 12 rosas vermelhas, perfeito para presentear sua pessoa especial",
    price: 89.90,
    rating: 5,
    reviews: 127,
    category: "Romântico",
    stock: "Em estoque",
    image: "/images/carousel/1.png"
  },
  {
    id: 2,
    name: "Buquê de Girassóis",
    description: "Buquê vibrante com girassóis amarelos, ideal para trazer alegria ao seu dia",
    price: 79.90,
    rating: 5,
    reviews: 98,
    category: "Alegre",
    stock: "Em estoque",
    image: "/images/carousel/2.png"
  },
  {
    id: 3,
    name: "Buquê de Lírios",
    description: "Elegante buquê de lírios brancos, perfeito para ocasiões especiais e decoração",
    price: 94.90,
    rating: 5,
    reviews: 156,
    category: "Delicado",
    stock: "Em estoque",
    image: "/images/carousel/3.png"
  },
  {
    id: 4,
    name: "Buquê Misto",
    description: "Composição única com diferentes tipos de flores, criando um visual deslumbrante",
    price: 109.90,
    rating: 5,
    reviews: 203,
    category: "Combos",
    stock: "Em estoque",
    image: "/images/carousel/4.png"
  },
  {
    id: 5,
    name: "Buquê de Tulipas",
    description: "Delicado buquê de tulipas coloridas, ideal para expressar sentimentos especiais",
    price: 84.90,
    rating: 5,
    reviews: 89,
    category: "Delicado",
    stock: "Em estoque",
    image: "/images/carousel/5.png"
  },
  {
    id: 6,
    name: "Buquê de Rosas Especiais",
    description: "Exclusivo buquê com rosas de diferentes cores, criando um visual único",
    price: 119.90,
    rating: 5,
    reviews: 167,
    category: "Romântico",
    stock: "Em estoque",
    image: "/images/carousel/6.png"
  },
  {
    id: 7,
    name: "Buquê de Girassóis Premium",
    description: "Buquê premium com girassóis selecionados, perfeito para presentear",
    price: 99.90,
    rating: 5,
    reviews: 134,
    category: "Alegre",
    stock: "Em estoque",
    image: "/images/bouquets/girassol.jpg"
  },
  {
    id: 8,
    name: "Buquê de Lírios Exclusivo",
    description: "Buquê exclusivo com lírios raros, ideal para ocasiões muito especiais",
    price: 129.90,
    rating: 5,
    reviews: 78,
    category: "Clássico",
    stock: "Em estoque",
    image: "/images/carousel/13.png"
  },
  {
    id: 9,
    name: "Buquê de Orquídeas",
    description: "Elegante buquê de orquídeas brancas, símbolo de beleza e sofisticação",
    price: 149.90,
    rating: 5,
    reviews: 92,
    category: "Elegante",
    stock: "Em estoque",
    image: "/images/carousel/14.png"
  },
  {
    id: 10,
    name: "Buquê de Margaridas",
    description: "Buquê delicado com margaridas brancas e amarelas, ideal para momentos especiais",
    price: 69.90,
    rating: 5,
    reviews: 145,
    category: "Delicado",
    stock: "Em estoque",
    image: "/images/carousel/15.png"
  },
  {
    id: 11,
    name: "Buquê de Crisântemos",
    description: "Buquê colorido com crisântemos, perfeito para trazer alegria e energia",
    price: 89.90,
    rating: 5,
    reviews: 113,
    category: "Alegre",
    stock: "Em estoque",
    image: "/images/carousel/16.png"
  },
  {
    id: 12,
    name: "Buquê de Peônias",
    description: "Buquê luxuoso com peônias rosas, ideal para ocasiões muito especiais",
    price: 169.90,
    rating: 5,
    reviews: 67,
    category: "Luxo",
    stock: "Em estoque",
    image: "/images/carousel/17.png"
  },
  {
    id: 13,
    name: "Buquê de Gérberas",
    description: "Buquê colorido com gérberas vibrantes, perfeito para presentear",
    price: 74.90,
    rating: 5,
    reviews: 89,
    category: "Alegre",
    stock: "Em estoque",
    image: "/images/decorative/flor6.png"
  },
  {
    id: 14,
    name: "Buquê de Hortênsias",
    description: "Buquê elegante com hortênsias azuis, ideal para decoração sofisticada",
    price: 134.90,
    rating: 5,
    reviews: 76,
    category: "Elegante",
    stock: "Em estoque",
    image: "/images/decorative/flor7.png"
  },
  {
    id: 15,
    name: "Buquê de Lavanda",
    description: "Buquê aromático com lavanda, perfeito para relaxar e perfumar ambientes",
    price: 89.90,
    rating: 5,
    reviews: 112,
    category: "Aromático",
    stock: "Em estoque",
    image: "/images/carousel/1.png"
  },
  {
    id: 16,
    name: "Buquê de Camomila",
    description: "Buquê delicado com camomila, ideal para momentos de tranquilidade",
    price: 64.90,
    rating: 5,
    reviews: 95,
    category: "Delicado",
    stock: "Em estoque",
    image: "/images/carousel/2.png"
  },
  {
    id: 17,
    name: "Buquê de Violetas",
    description: "Buquê romântico com violetas, perfeito para expressar amor e carinho",
    price: 94.90,
    rating: 5,
    reviews: 88,
    category: "Romântico",
    stock: "Em estoque",
    image: "/images/carousel/3.png"
  },
  {
    id: 18,
    name: "Buquê de Dália",
    description: "Buquê colorido com dálias, ideal para trazer alegria e vivacidade",
    price: 109.90,
    rating: 5,
    reviews: 67,
    category: "Alegre",
    stock: "Em estoque",
    image: "/images/carousel/4.png"
  },
  {
    id: 19,
    name: "Buquê de Íris",
    description: "Buquê elegante com íris azuis, perfeito para ocasiões especiais",
    price: 124.90,
    rating: 5,
    reviews: 73,
    category: "Elegante",
    stock: "Em estoque",
    image: "/images/carousel/5.png"
  },
  {
    id: 20,
    name: "Buquê de Narcisos",
    description: "Buquê delicado com narcisos, ideal para expressar renovação e esperança",
    price: 79.90,
    rating: 5,
    reviews: 91,
    category: "Delicado",
    stock: "Em estoque",
    image: "/images/carousel/6.png"
  },
  {
    id: 21,
    name: "Buquê de Amaryllis",
    description: "Buquê luxuoso com amaryllis, perfeito para ocasiões muito especiais",
    price: 189.90,
    rating: 5,
    reviews: 45,
    category: "Luxo",
    stock: "Em estoque",
    image: "/images/decorative/flor5.png"
  },
  {
    id: 22,
    name: "Buquê de Ranúnculos",
    description: "Buquê colorido com ranúnculos, ideal para trazer alegria e energia",
    price: 99.90,
    rating: 5,
    reviews: 82,
    category: "Alegre",
    stock: "Em estoque",
    image: "/images/carousel/13.png"
  },
  {
    id: 23,
    name: "Buquê de Lisianthus",
    description: "Buquê elegante com lisianthus, perfeito para decoração sofisticada",
    price: 144.90,
    rating: 5,
    reviews: 58,
    category: "Elegante",
    stock: "Em estoque",
    image: "/images/carousel/14.png"
  },
  {
    id: 24,
    name: "Buquê de Protea",
    description: "Buquê exótico com protea, ideal para quem busca algo único e diferente",
    price: 199.90,
    rating: 5,
    reviews: 34,
    category: "Exótico",
    stock: "Em estoque",
    image: "/images/decorative/flor7.png"
  }
];

export const categories = ["Flores", "Buquês", "Combos", "Sentimentos"];
