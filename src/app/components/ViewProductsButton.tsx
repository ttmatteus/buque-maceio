"use client";

const ViewProductsButton: React.FC = () => {
  return (
    <div className="flex justify-center mt-16">
      <button 
        className="px-12 py-4 rounded-[50px] border-none font-medium text-base cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#FFE066]"
        style={{
          backgroundColor: '#FFD950',
          fontFamily: 'Nunito Sans',
          color: '#222222'
        }}
      >
        Ver nossos produtos
      </button>
    </div>
  );
};

export default ViewProductsButton;
