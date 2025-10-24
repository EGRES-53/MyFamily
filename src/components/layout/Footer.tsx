import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-neutral-200 mt-8">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <span className="text-sm text-neutral-500">
              &copy; {currentYear} SOUVIENS_TOI. Tous droits réservés.
            </span>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex flex-col md:flex-row items-center text-sm text-neutral-500">
              <span className="flex items-center">
                Créé avec <Heart className="h-4 w-4 text-red-500 mx-1" /> pour préserver ton histoire familiale
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;