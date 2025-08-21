import React from 'react';
import { Leaf, Sprout, Award } from 'lucide-react';

const DifferentialsSection: React.FC = () => {
  const differentials = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      ),
      title: "Amor pelas Flores",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur.",
      bgColor: "#F9C6D1"
    },
    {
      icon: <Leaf size={24} strokeWidth={2} fill="none" stroke="#000" />,
      title: "Qualidade Premium",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur.",
      bgColor: "#FFF0B0"
    },
    {
      icon: <Sprout size={24} strokeWidth={2} fill="none" stroke="#000" />,
      title: "Sustentabilidade",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur.",
      bgColor: "#B0E0D0"
    },
    {
      icon: <Award size={24} strokeWidth={2} fill="none" stroke="#000" />,
      title: "Excelência",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur.",
      bgColor: "#E0D0F0"
    }
  ];

  return (
    <section className="differentials-section">
      <div className="differentials-container">
        {/* Header da Seção */}
        <div className="differentials-header">
          <h2 className="differentials-title">Nossos Diferenciais</h2>
          <p className="differentials-subtitle">
            Nossa história começou com uma paixão simples: transformar momentos especiais em memórias inesquecíveis através da beleza das flores. Hoje, somos referência em arte floral em Maceió
          </p>
        </div>

        {/* Grid dos Cards */}
        <div className="differentials-grid">
          {differentials.map((differential, index) => (
            <div key={index} className="differential-card">
              {/* Ícone */}
              <div 
                className="differential-icon-container"
                style={{ backgroundColor: differential.bgColor }}
              >
                {differential.icon}
              </div>
              
              {/* Título */}
              <h3 className="differential-title">{differential.title}</h3>
              
              {/* Descrição */}
              <p className="differential-description">{differential.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
