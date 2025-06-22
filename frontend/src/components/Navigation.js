import React, { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "home", label: "Accueil" },
  { id: "about", label: "À propos" },
  { id: "skills", label: "Compétences" },
  { id: "projects", label: "Projets" },
  { id: "contact", label: "Contact" },
];

function Navigation() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      NAV_ITEMS.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(item.id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-cyan-400/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-mono text-cyan-400 tracking-wider">CA Portfolio</div>
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-mono text-sm transition-all duration-300 hover:text-cyan-400 ${
                  activeSection === item.id
                    ? 'text-cyan-400 before:content-[\">>\"] before:mr-2'
                    : 'text-gray-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="w-8 h-8 border border-cyan-400/50 flex items-center justify-center">
            <div className="w-2 h-2 bg-cyan-400 animate-pulse" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
