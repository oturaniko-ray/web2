// app/home/components/TeamSection.tsx
'use client';

import { motion } from 'framer-motion';

const team = [
  {
    name: 'Ana Martínez',
    role: 'CEO & Fundadora',
    description: 'Lideró la expansión a 12 ciudades en 2026',
    image: '/team/ana.jpg',
    linkedin: 'https://linkedin.com/in/anamartinez',
  },
  {
    name: 'Carlos Ruiz',
    role: 'CTO',
    description: 'Desarrolló el TMS propio de Quick Rabbit',
    image: '/team/carlos.jpg',
    linkedin: 'https://linkedin.com/in/carlosruiz',
  },
  {
    name: 'Laura Sánchez',
    role: 'COO',
    description: 'Gestiona 1M+ paquetes mensuales',
    image: '/team/laura.jpg',
    linkedin: 'https://linkedin.com/in/laurasanchez',
  },
  {
    name: 'Miguel Ángel Torres',
    role: 'Head de Logística',
    description: 'Diseñó la red de 84 instalaciones',
    image: '/team/miguel.jpg',
    linkedin: 'https://linkedin.com/in/migueltorres',
  },
];

export function TeamSection() {
  return (
    <section className="py-20 bg-[#1A1A2E]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
        >
          Conoce al equipo{' '}
          <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF006E] bg-clip-text text-transparent">
            Quick Rabbit
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              {/* Foto circular */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] to-[#FF006E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                <div className="relative w-32 h-32 bg-[#0A0A0F] rounded-full overflow-hidden border-2 border-[#00F0FF] group-hover:border-[#FF006E] transition-colors">
                  <div className="w-full h-full bg-gradient-to-br from-[#1A1A2E] to-[#2A2A3E] flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-[#00F0FF] text-sm mb-2">{member.role}</p>
              <p className="text-gray-400 text-sm mb-3">{member.description}</p>
              
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#00F0FF] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}