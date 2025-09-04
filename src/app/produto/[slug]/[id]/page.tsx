import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
 
  const { products: productsData } = await import('../../../data/products');
  const { generateProductSlug } = await import('../../../utils/slugUtils');
  

  const mainProducts = productsData.map((product) => ({
    slug: generateProductSlug(product.name),
    id: product.id.toString(),
  }));
  
  // Produtos hardcoded dos componentes da landing page
  const landingPageProducts = [
    // FeaturedBouquets 
    { name: "Buquê de Rosas", id: 1001 },
    { name: "Combo Dia das Mães", id: 1002 },
    { name: "Buquê de Girassóis", id: 1003 },
    { name: "Buquê de Rosas", id: 1004 },
    { name: "Buquê de Tulipas", id: 1005 },
    { name: "Combo Dia das Avós", id: 1006 },
    { name: "Buquê de Gerberas", id: 1007 },
    { name: "Buquê de Rosas", id: 1008 },
    // PromotionsSection 
    { name: "Buquê de Rosas", id: 2001 },
    { name: "Buquê de Girassóis", id: 2002 },
    { name: "Buquê Misto", id: 2003 }
  ].map((product) => ({
    slug: generateProductSlug(product.name),
    id: product.id.toString(),
  }));
  
  // Combina todos os produtos e remove duplicatas por ID
  const allProducts = [...mainProducts, ...landingPageProducts];
  const uniqueProducts = allProducts.filter((product, index, self) => 
    index === self.findIndex(p => p.id === product.id)
  );
  
  return uniqueProducts;
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
