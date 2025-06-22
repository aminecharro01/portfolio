import React, { useEffect, useState } from "react";
import { Github, ExternalLink, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

function Projects() {
  const [projects, setProjects] = useState([]);
  // Lightbox state
  const [lightbox, setLightbox] = useState({ open: false, images: [], current: 0 });

  useEffect(() => {
    fetch("http://localhost:4000/api/projects")
      .then(res => res.json())
      .then(setProjects);
  }, []);

  // Lightbox handlers
  const openLightbox = (images, idx) => setLightbox({ open: true, images, current: idx });
  const closeLightbox = () => setLightbox({ open: false, images: [], current: 0 });
  const prevImage = () => setLightbox(l => ({ ...l, current: (l.current - 1 + l.images.length) % l.images.length }));
  const nextImage = () => setLightbox(l => ({ ...l, current: (l.current + 1) % l.images.length }));

  return (
    <section id="projects" className="py-32 relative">
      {/* Lightbox overlay */}
      {lightbox.open && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-6 right-8 text-cyan-400 hover:text-white"><X size={32} /></button>
          <div className="relative flex items-center justify-center w-full max-w-2xl h-[60vh]">
            <button onClick={e => { e.stopPropagation(); prevImage(); }} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/60 rounded-full hover:bg-cyan-400 hover:text-black text-cyan-400"><ChevronLeft size={32} /></button>
            <img
              src={`http://localhost:4000${lightbox.images[lightbox.current]}`}
              alt="project"
              className="max-h-[55vh] max-w-full rounded shadow-lg border-4 border-cyan-400 bg-black"
              onClick={e => e.stopPropagation()}
            />
            <button onClick={e => { e.stopPropagation(); nextImage(); }} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/60 rounded-full hover:bg-cyan-400 hover:text-black text-cyan-400"><ChevronRight size={32} /></button>
          </div>
          <div className="mt-4 text-cyan-400 font-mono">{lightbox.current+1} / {lightbox.images.length}</div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-mono font-bold mb-16 text-cyan-400">PROJETS</h2>
        <div className="space-y-8">
          {projects.length > 0 ? projects.map((project, index) => (
            <div key={project.id} className="group border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="p-8 md:p-12 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-mono text-cyan-400/50">{String(project.id).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-2xl font-mono font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-400 font-mono text-sm max-w-lg">{project.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      project.status === 'Live' ? 'bg-green-400' :
                      project.status === 'Beta' ? 'bg-yellow-400' : 'bg-red-400'
                    } animate-pulse`} />
                    <span className="font-mono text-xs text-gray-400">{project.status}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 border border-cyan-400/30 font-mono text-xs text-cyan-400">{tech}</span>
                  ))}
                </div>
                {project.photos && project.photos.length > 0 ? (
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.photos.map((url, idx) => (
                      <img
                        key={idx}
                        src={`http://localhost:4000${url}`}
                        alt={project.title + ' screenshot'}
                        className="w-20 h-20 object-cover rounded shadow border-2 border-cyan-400 transition-transform duration-200 hover:scale-150 bg-black"
                        style={{ cursor: 'pointer' }}
                        onClick={() => openLightbox(project.photos, idx)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mb-6">
                    <span className="inline-block w-20 h-20 bg-gray-800 border-2 border-cyan-400 rounded text-xs text-gray-400 flex items-center justify-center">No image</span>
                  </div>
                )}
                <div className="flex items-center space-x-6 text-gray-400">
                  {project.github && project.github.trim() && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 hover:text-cyan-400 transition-colors">
                      <Github className="w-4 h-4" />
                      <span className="font-mono text-xs">SOURCE</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                  {project.demo && project.demo.trim() && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 hover:text-cyan-400 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      <span className="font-mono text-xs">DEMO</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )) : (
            <div className="text-gray-400 font-mono">Aucun projet pour le moment.</div>
          )}
        </div>
      </div>
    </section>
  );
}
export default Projects;
