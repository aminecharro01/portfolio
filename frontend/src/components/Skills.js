import React, { useEffect, useState } from "react";
import { Code2, Database, Smartphone, Terminal } from "lucide-react";

const ICONS = [
  <Code2 className="w-5 h-5" />, <Database className="w-5 h-5" />, <Smartphone className="w-5 h-5" />, <Terminal className="w-5 h-5" />
];

function Skills() {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/api/skills")
      .then(res => res.json())
      .then(setSkills);
  }, []);
  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-mono font-bold mb-16 text-cyan-400">COMPÉTENCES</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.length > 0 ? skills.map((skill, index) => (
            <div key={skill.id} className="group relative">
              <div className="border border-cyan-400/30 bg-black/50 p-8 hover:border-cyan-400 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="flex items-center justify-between mb-6">
                  <div className="p-2 border border-cyan-400/50 bg-cyan-400/5">
                    {ICONS[index % ICONS.length]}
                  </div>
                  <div className="text-xs font-mono text-gray-500">0{index + 1}</div>
                </div>
                <h3 className="font-mono text-lg font-bold mb-4 text-white">{skill.name}</h3>
                <div className="space-y-2">
                  {skill.tech.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-cyan-400" />
                      <span className="font-mono text-xs text-gray-400">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )) : (
            <div className="text-gray-400 font-mono">Aucune compétence ajoutée pour le moment.</div>
          )}
        </div>
      </div>
    </section>
  );
}
export default Skills;
