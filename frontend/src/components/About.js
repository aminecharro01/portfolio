import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

function About() {
  const [about, setAbout] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/api/about")
      .then(res => res.json())
      .then(setAbout);
  }, []);
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-mono font-bold mb-8 text-cyan-400">Bio</h2>
            <div className="space-y-6 text-gray-300 font-mono">
              <p className="text-lg leading-relaxed">
                Bonjour, je m'appelle Charro Amine, développeur full stack passionné.
                J'aime concevoir des solutions web modernes, performantes et élégantes.
                Bienvenue sur mon portfolio !
              </p>
              <p className="text-lg leading-relaxed">
                {about?.content || '> Passionate developer with 5+ years of experience building scalable digital solutions. Specialized in modern web technologies and cutting-edge frameworks.'}
              </p>
            </div>
            <div className="mt-12 flex space-x-6">
              {[
                { icon: <Github className="w-5 h-5" />, label: 'GITHUB' },
                { icon: <Linkedin className="w-5 h-5" />, label: 'LINKEDIN' },
                { icon: <Mail className="w-5 h-5" />, label: 'EMAIL' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="group flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  {social.icon}
                  <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-96 border border-cyan-400/30 bg-gradient-to-br from-cyan-400/5 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-mono text-xs text-cyan-400 mb-2">&gt; status: online</div>
                <div className="font-mono text-xs text-gray-400">&gt; location: worldwide</div>
                <div className="font-mono text-xs text-gray-400">&gt; mode: full_stack</div>
              </div>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default About;
