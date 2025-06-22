import React from "react";
import { Github, Linkedin, Mail, Instagram, Facebook } from "lucide-react"; // Ajout Behance via svg custom plus bas

function Footer() {
  return (
    <footer className="py-8 border-t border-cyan-400/20">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="font-mono text-xs text-gray-500">
          © {new Date().getFullYear()} Portfolio — Réalisé avec React
        </div>
        <div className="flex items-center space-x-4">
          <a href="https://github.com/aminecharro01" target="_blank" rel="noopener noreferrer" title="Github">
            <Github className="w-5 h-5 text-cyan-400 hover:text-white transition" />
          </a>
          <a href="https://www.behance.net/aminecharrbed7" target="_blank" rel="noopener noreferrer" title="Behance">
            {/* Icône Behance SVG inline */}
            <svg className="w-5 h-5 text-cyan-400 hover:text-white transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="2" y="6" width="20" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/>
              <text x="6" y="17" fontSize="9" fill="currentColor" fontFamily="Arial">Be</text>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/charroamine/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <Linkedin className="w-5 h-5 text-cyan-400 hover:text-white transition" />
          </a>
          <a href="mailto:amine_charro@yahoo.com" title="Mail">
            <Mail className="w-5 h-5 text-cyan-400 hover:text-white transition" />
          </a>
          <a href="https://instagram.com/_dar.kwing" target="_blank" rel="noopener noreferrer" title="Instagram">
            <Instagram className="w-5 h-5 text-cyan-400 hover:text-white transition" />
          </a>
          <a href="https://facebook.com/charroamine" target="_blank" rel="noopener noreferrer" title="Facebook">
            <Facebook className="w-5 h-5 text-cyan-400 hover:text-white transition" />
          </a>
          <div className="w-2 h-2 bg-cyan-400 animate-pulse ml-4" />
          <span className="font-mono text-xs text-cyan-400">En ligne</span>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
