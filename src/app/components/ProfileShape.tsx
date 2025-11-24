"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Atualizado - versão 2.0
interface ProfileShapeProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function ProfileShape({ isVisible, onClose }: ProfileShapeProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  // Detecta se é tela pequena
  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerHeight < 750);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);
  
  if (!isVisible) return null;

  return (
    <>
      {/* Overlay com gradiente transparente */}
      <motion.div 
        className="fixed inset-0 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)',
          backdropFilter: 'blur(3px)',
          position: 'fixed' as const
        }}
        onClick={onClose}
      />
      
      {/* Wrapper para centralização */}
      <div
        style={{
          position: 'fixed' as const,
          left: '50%',
          top: isSmallScreen ? '55%' : '192px',
          transform: isSmallScreen ? 'translate(-50%, -50%)' : 'translateX(-50%)',
          zIndex: 9999
        }}
      >
        {/* Card que acompanha o scroll */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
          style={{
            width: 'min(459px, calc(100vw - 40px))',
            maxWidth: '459px',
            height: 'min(630px, calc(100vh - 80px))',
            maxHeight: '90vh',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            overflowY: 'auto'
          }}
        >
        {/* Botão X fechar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute' as const,
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#BEBEBE',
            fontSize: '32px',
            fontWeight: '300',
            lineHeight: '1'
          }}
          aria-label="Fechar"
        >
          ×
        </button>
        {/* Card interno sem background a 40px do topo */}
        <div
          style={{
            position: 'absolute' as const,
            top: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '320px',
            height: '515px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Card de sessão com logo, título e subtítulo */}
          <div
            style={{
              width: '261px',
              height: '104px',
              marginLeft: '29px',
              marginRight: '29px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Logo do Buquê Maceió */}
            <Image
              src="/images/logos/Logo (1).png"
              alt="Logo Buquê Maceió"
              width={37}
              height={37}
              className="object-contain"
            />
            
            {/* Título */}
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '20px',
              fontWeight: '600',
              color: '#020202',
              margin: '0',
              marginTop: '19px'
            }}>
              Bem vindo a Buquê Maceió
            </h2>
            
            {/* Subtítulo */}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: '300',
              color: '#262626',
              margin: '0',
              marginTop: '7px',
              display: 'flex',
              gap: '4px'
            }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={isSignUp ? 'signup' : 'login'}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}
                </motion.span>
              </AnimatePresence>
              {' '}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                }}
                style={{
                  color: '#262626',
                  textDecoration: 'underline',
                  fontWeight: '300'
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isSignUp ? 'enter' : 'create'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isSignUp ? 'Entrar' : 'Criar conta'}
                  </motion.span>
                </AnimatePresence>
              </a>
            </p>
          </div>

          {/* Card de formulário - 128px do topo do card interno principal */}
          <div
            style={{
              width: '320px',
              minHeight: '226px',
              marginTop: '128px',
              position: 'absolute' as const,
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {/* Campo de Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: '500',
                color: '#020202'
              }}>
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '400',
                  border: '1px solid #E5E5E5',
                  borderRadius: '6px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Campo de Senha */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: '500',
                color: '#020202'
              }}>
                Senha
              </label>
              <input
                type="password"
                placeholder="Senha"
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '400',
                  border: '1px solid #E5E5E5',
                  borderRadius: '6px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

             {/* Botão Entrar/Criar conta */}
             <motion.button
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               transition={{ duration: 0.2 }}
               style={{
                 width: '100%',
                 height: '40px',
                 minHeight: '40px',
                 backgroundColor: '#000000',
                 border: 'none',
                 borderRadius: '6px',
                 fontFamily: 'Inter, sans-serif',
                 fontSize: '14px',
                 lineHeight: '24px',
                 fontWeight: '500',
                 color: '#FFFFFF',
                 cursor: 'pointer',
                 marginTop: '24px',
                 flexShrink: 0
               }}
             >
               <AnimatePresence mode="wait">
                 <motion.span
                   key={isSignUp ? 'create' : 'enter'}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.2 }}
                 >
                   {isSignUp ? 'Criar conta' : 'Entrar'}
                 </motion.span>
               </AnimatePresence>
             </motion.button>

             {/* Esqueci minha senha */}
             <a
               href="#"
               style={{
                 fontFamily: 'Inter, sans-serif',
                 fontSize: '14px',
                 lineHeight: '24px',
                 fontWeight: '400',
                 color: '#262626',
                 textAlign: 'center',
                 textDecoration: 'none',
                 marginTop: '8px'
               }}
             >
               Esqueci minha senha
             </a>

             {/* Ou / Cadastre-se com */}
             <p
               style={{
                 fontFamily: 'Inter, sans-serif',
                 fontSize: '14px',
                 lineHeight: '24px',
                 fontWeight: '300',
                 color: '#262626',
                 textAlign: 'center',
                 margin: '0',
                 marginTop: '8px'
               }}
             >
               <AnimatePresence mode="wait">
                 <motion.span
                   key={isSignUp ? 'signup-text' : 'login-text'}
                   initial={{ opacity: 0, y: -5 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: 5 }}
                   transition={{ duration: 0.2 }}
                 >
                   {isSignUp ? 'Cadastre-se com' : 'Ou'}
                 </motion.span>
               </AnimatePresence>
             </p>

             {/* Botão Entrar com Google */}
             <motion.button
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               transition={{ duration: 0.2 }}
               style={{
                 width: '205px',
                 height: '40px',
                 minHeight: '40px',
                 backgroundColor: '#FFFFFF',
                 border: '1px solid #E5E5E5',
                 borderRadius: '6px',
                 fontFamily: 'Inter, sans-serif',
                 fontSize: '14px',
                 fontWeight: '400',
                 color: '#262626',
                 cursor: 'pointer',
                 marginTop: '8px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 gap: '8px',
                 flexShrink: 0,
                 alignSelf: 'center'
               }}
             >
               <Image
                 src="/images/icons/google-g-logo.svg"
                 alt="Google"
                 width={20}
                 height={20}
               />
               Entrar com Google
             </motion.button>
           </div>
        </div>
        </motion.div>
      </div>
    </>
  );
}
