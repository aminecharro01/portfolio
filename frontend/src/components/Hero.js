import React from "react";
import { Zap, ArrowRight } from "lucide-react";

function Hero() {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-cyan-400/20 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-400/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
      </div>
      <div className="relative z-10 text-center px-6">
        <div className="mb-8">
          <div className="inline-block p-4 border border-cyan-400/50 bg-cyan-400/5">
            <Zap className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-mono font-bold mb-3 tracking-wider">
          CHARRO <span className="text-cyan-400">AMINE</span>
        </h1>
        <div className="text-cyan-400 font-mono text-xl mb-2">Développeur Full Stack</div>
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-xl font-mono text-gray-300 mb-4">
            &gt; Code. conception. déploiement. solutions complètes
          </p>
          <div className="flex items-center justify-center space-x-2 text-cyan-400">
            <span className="w-2 h-2 bg-cyan-400 animate-pulse" />
            <span className="font-mono text-sm">SYSTEM_READY</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => scrollToSection('projects')}
            className="group px-8 py-4 border border-cyan-400 text-cyan-400 font-mono text-sm hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>VOIR LES PROJETS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 bg-cyan-400/10 border border-cyan-400/50 text-white font-mono text-sm hover:bg-cyan-400/20 transition-all duration-300"
          >
            CONTACTER
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
