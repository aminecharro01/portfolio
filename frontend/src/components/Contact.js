import React from "react";
import { Mail, ArrowRight } from "lucide-react";

function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-mono font-bold mb-16 text-cyan-400">CONTACT</h2>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="mb-8">
              <p className="text-xl font-mono text-gray-300 mb-4">
                &gt; Prêt à réaliser un projet exceptionnel ?
              </p>
              <p className="font-mono text-gray-400">
                Discutons ensemble de votre prochaine idée et donnons-lui vie !
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 border border-cyan-400/50 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="font-mono text-xs text-gray-500 mb-1">EMAIL</div>
                  <div className="font-mono text-sm text-white">amine_charro@yahoo.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 border border-cyan-400/50 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-400 animate-pulse" />
                </div>
                <div>
                  <div className="font-mono text-xs text-gray-500 mb-1">STATUS</div>
                  <div className="font-mono text-sm text-white">Disponible pour des projets</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-gray-400 mb-2">Nom Complet</label>
                <input type="text" className="w-full bg-transparent border border-cyan-400/30 px-4 py-3 font-mono text-sm text-white focus:border-cyan-400 focus:outline-none transition-colors" placeholder="Nom Complet" />
              </div>
              <div>
                <label className="block font-mono text-xs text-gray-400 mb-2">Email</label>
                <input type="email" className="w-full bg-transparent border border-cyan-400/30 px-4 py-3 font-mono text-sm text-white focus:border-cyan-400 focus:outline-none transition-colors" placeholder="Email" />
              </div>
              <div>
                <label className="block font-mono text-xs text-gray-400 mb-2">Message</label>
                <textarea rows="4" className="w-full bg-transparent border border-cyan-400/30 px-4 py-3 font-mono text-sm text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none" placeholder="Message" />
              </div>
              <button className="w-full bg-cyan-400 text-black py-3 font-mono text-sm font-bold hover:bg-cyan-300 transition-colors duration-300 flex items-center justify-center space-x-2" onClick={() => alert('Message sent! (Demo version)')}>
                <span>Envoyer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Contact;
