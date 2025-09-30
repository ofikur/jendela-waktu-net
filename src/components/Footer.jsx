import React from 'react';

const Footer = () => {
  // const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t-2 border-gold/30 mt-12 py-8 bg-paper">
      <div className="container mx-auto text-center text-ink-light space-y-1">
        
        <p className="text-sm text-ink-light/80">
          Copyright &copy; 2025 Jendela Waktu .NET. All Rights Reserved.
        </p>

        <p className="text-sm">
          Created by{' '}
          <a href="https://github.com/ofikur" target="_blank" rel="noopener noreferrer" className="font-semibold text-gold hover:underline transition-colors">
            Ofikur R.
          </a>
        </p>
        <p className="text-xs">
          Powered by the <a href="https://gutendex.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Gutendex API</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;