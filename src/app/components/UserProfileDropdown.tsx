"use client";

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ 
  isOpen, 
  onClose, 
  userName = "Nome do Usuário" 
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleMenuClick = (action: string) => {
    console.log(`Ação selecionada: ${action}`);
    onClose();
    
    // logica de ação
    switch (action) {
      case 'profile':
        // redirecionar para página de perfil
        router.push('/perfil');
        break;
      case 'orders':
        // redirecionar para página de pedidos
        router.push('/pedidos');
        break;
      case 'logout':
        // implementar logout (fazer a logica pra invaladir token)
        router.push('/')
        break;
      default:
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      ref={dropdownRef}
      className="user-profile-dropdown"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {/* Nome do usuário */}
      <div className="user-profile-header">
        {userName}
      </div>
      
      {/* Separador */}
      <div className="user-profile-separator"></div>
      
      {/* Opções do menu */}
      <div className="user-profile-options">
        <button 
          className="user-profile-option"
          onClick={() => handleMenuClick('profile')}
        >
          Meu Perfil
        </button>
        <button 
          className="user-profile-option"
          onClick={() => handleMenuClick('orders')}
        >
          Meus Pedidos
        </button>
      </div>
      
      {/* Separador */}
      <div className="user-profile-separator"></div>
      
      {/* Botão de sair */}
      <button 
        className="user-profile-logout"
        onClick={() => handleMenuClick('logout')}
      >
        Sair
      </button>
    </motion.div>
  );
};

export default UserProfileDropdown;
