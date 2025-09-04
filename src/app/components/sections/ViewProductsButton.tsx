"use client";

import { useRouter } from 'next/navigation';

const ViewProductsButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/produto');
  };

  return (
    <div className="flex justify-center mt-16">
      <button 
        onClick={handleClick}
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
