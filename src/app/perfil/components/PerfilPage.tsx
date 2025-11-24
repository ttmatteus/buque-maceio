"use client";

import { useState } from 'react';
import { Header, Footer } from '../../components';
import { User, ShoppingCart, ChevronDown, ChevronRight } from 'lucide-react';
import '../styles/PerfilPage.css';

const PerfilPage: React.FC = () => {
  const [isMinhaContaOpen, setIsMinhaContaOpen] = useState(false);

  const toggleMinhaConta = () => {
    setIsMinhaContaOpen(!isMinhaContaOpen);
  };

  return (
    <div className="bg-white overflow-hidden">
      <Header />
      <div className="perfil-page" style={{ marginTop: '112px' }}>
        {/* Grid Demo Elements */}
        <div className="grid-demo">
          <div className="profile-menu">
            <div className="profile-username">Username</div>
            
            <div className="profile-section">
              <div className="profile-section-header" onClick={toggleMinhaConta}>
                <div>
                  <User size={14} />
                  <span>Minha Conta</span>
                </div>
                <ChevronDown 
                  size={14} 
                  className={`chevron ${isMinhaContaOpen ? 'rotated' : ''}`}
                />
              </div>
              {isMinhaContaOpen && (
                <div className="profile-submenu">
                  <div className="profile-submenu-item">Meu Perfil</div>
                  <div className="profile-submenu-item">Meus Endereços</div>
                </div>
              )}
            </div>
            
            <div className="profile-section">
              <div className="profile-section-header">
                <div>
                  <ShoppingCart size={14} />
                  <span>Meus Pedidos</span>
                </div>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </div>
        <div className="grid-demo-2">
          <div className="grid-demo-internal">
            <div className="profile-form">
              <h2 className="profile-form-title">Meu Perfil</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Nome</label>
                  <input type="text" placeholder="Nome" />
                </div>
                <div className="form-group">
                  <label>Sobrenome</label>
                  <input type="text" placeholder="Sobrenome" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label>Celular</label>
                  <input type="tel" placeholder="(99) 99999-9999" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid-demo-internal-2">
            <button className="btn-salvar">Salvar</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PerfilPage;

