import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Menu, X, User, LogOut, Home, Database, BookOpen, TestTube, Shield, Calendar, Image, BarChart3 } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      showToast('Vous avez été déconnecté avec succès', 'success');
      navigate('/login');
    } catch (error) {
      showToast('Erreur lors de la déconnexion', 'error');
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-serif text-2xl font-bold text-primary-600">
                SOUVIENS_TOI
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-primary-600"
            >
              Accueil
            </Link>
            
            {currentUser && (
              <>
                <Link 
                  to="/timeline" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-primary-600"
                >
                  Chronologie
                </Link>
                
                <Link 
                  to="/gallery" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-primary-600"
                >
                  Galerie
                </Link>

                <Link
                  to="/stories"
                  className="px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-primary-600"
                >
                  Récits
                </Link>

                <Link
                  to="/admin/stats"
                  className="px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-primary-600"
                >
                  Statistiques
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-primary-600"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </button>
              </>
            )}

            {!currentUser && (
              <>
                <Link 
                  to="/login" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-primary-600"
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="px-3 py-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Accueil
              </div>
            </Link>
            
            {currentUser && (
              <>
                <Link 
                  to="/timeline" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Chronologie
                  </div>
                </Link>
                
                <Link 
                  to="/gallery" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <Image className="mr-2 h-5 w-5" />
                    Galerie
                  </div>
                </Link>

                <Link
                  to="/stories"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Récits
                  </div>
                </Link>

                <Link
                  to="/admin/stats"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Statistiques
                  </div>
                </Link>

                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Profil
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Déconnexion
                </button>
              </>
            )}

            {!currentUser && (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                  onClick={() => setIsOpen(false)}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;