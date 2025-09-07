"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import '../styles/components/Breadcrumbs.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav className={`breadcrumbs ${className}`} aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumbs-item">
            {index > 0 && (
              <ChevronRight 
                size={16} 
                className="breadcrumbs-separator" 
                aria-hidden="true"
              />
            )}
            
            {item.isActive ? (
              <span className="breadcrumbs-current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href || '#'} className="breadcrumbs-link">
                {index === 0 && <Home size={16} className="breadcrumbs-home-icon" />}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
