import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Grupo Esquerda (Logo + Empresa + Suporte) */}
        <div className="footer-left-group">
          {/* Seção Esquerda - Logo e Slogan */}
          <div className="footer-left">
            <div className="footer-logo">
              <div className="logo-icon">
                <Image
                  src="/images/logos/Logo (1).png"
                  alt="Logo Buquê Maceió"
                  width={50}
                  height={50}
                  className="footer-logo-img"
                />
              </div>
              <div className="logo-text">
                <h3 className="company-name">Buquê Maceió</h3>
                <p className="company-tagline">Flores e Elegância</p>
              </div>
            </div>
            <p className="company-slogan">Mais que flores, gesto de afeto.</p>
          </div>

          {/* Grupo Empresa + Suporte */}
          <div className="footer-company-support">
            {/* Seção Empresa */}
            <div className="footer-section">
              <h4 className="footer-title">Empresa</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Quem Somos</a></li>
                <li><a href="#" className="footer-link">O que oferecemos</a></li>
              </ul>
            </div>

            {/* Seção Suporte */}
            <div className="footer-section">
              <h4 className="footer-title">Suporte</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Política de Privacidade</a></li>
                <li><a href="#" className="footer-link">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Seção Direita - Contato e Redes Sociais */}
        <div className="footer-right">
          {/* Contato */}
          <div className="footer-section">
            <h4 className="footer-title contato-title">Contato</h4>
            <ul className="footer-contact">
              <li>5582991985628</li>
              <li>contato@xxx.com</li>
              <li>Maceió-AL</li>
              <li>horário de funcionamento</li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div className="footer-section">
            <h4 className="footer-title redes-title">Nos siga nas redes</h4>
            <div className="social-icons">
              <a href="#" className="social-icon instagram">
                <Image
                  src="/images/icons/insta.svg"
                  alt="Instagram"
                  width={36}
                  height={36}
                />
              </a>
              <a href="#" className="social-icon facebook">
                <Image
                  src="/images/icons/face.svg"
                  alt="Facebook"
                  width={36}
                  height={36}
                />
              </a>
              <a href="#" className="social-icon whatsapp">
                <Image
                  src="/images/icons/whats.svg"
                  alt="WhatsApp"
                  width={36}
                  height={36}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p>© 2025 Buquê Maceió. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
