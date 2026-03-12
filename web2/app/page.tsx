// app/home/page.tsx
'use client';

import { motion } from 'framer-motion';
import { VideoBackground } from './components/VideoBackground';
import { ParallaxSection } from './components/ParallaxSection';
import { CinematicStats } from './components/CinematicStats';
import { Timeline } from './home/components/Timeline';
import { TrackingForm } from './home/components/TrackingForm';

export default function HomePage() {
  return (
    <main className="bg-[#0A0A0F]">
      {/* HERO SECTION con Video Background */}
      <VideoBackground
        videoSrc="/videos/logistics-hero.mp4"
        overlay="gradient"
        parallaxIntensity="high"
        className="min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 py-32">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A2E]/80 backdrop-blur-md border border-[#00F0FF]/30 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" />
            <span className="text-[#00F0FF] font-medium">
              +1M paquetes/mes en España
            </span>
          </motion.div>

          {/* Headline con Parallax */}
          <ParallaxSection speed={0.2} direction="up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              La logística a medida del{' '}
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#FFFFFF] to-[#FF006E] bg-clip-text text-transparent">
                e-commerce
              </span>
              <br />
              y el retail en España
            </h1>
          </ParallaxSection>

          {/* Subheadline */}
          <ParallaxSection speed={0.1} direction="up">
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mb-12">
              Movemos más de un millón de paquetes al mes y estamos en pleno crecimiento.
              Infraestructura propia, tecnología avanzada y una red diseñada específicamente
              para el e-commerce.
            </p>
          </ParallaxSection>

          {/* Tracking Form + CTAs */}
          <div className="flex flex-col lg:flex-row gap-8 items-start mb-20">
            <ParallaxSection speed={0.15} direction="right">
              <TrackingForm />
            </ParallaxSection>

            <ParallaxSection speed={0.1} direction="left">
              <div className="flex flex-col gap-4">
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#00F0FF] to-[#00C8FF] text-[#0A0A0F] font-bold rounded-lg hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Habla con nuestro equipo
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="px-8 py-4 border-2 border-[#00F0FF] text-[#00F0FF] font-semibold rounded-lg hover:bg-[#00F0FF]/10 transition-all backdrop-blur-md"
                >
                  Localiza tu envío
                </motion.button>
              </div>
            </ParallaxSection>
          </div>

          {/* Timeline de Crecimiento */}
          <ParallaxSection speed={0.2} direction="up">
            <Timeline
              items={[
                { year: '2025', label: 'Fundación', value: 'Inicio de operaciones' },
                { year: '2026', label: '1M paquetes/mes', value: 'Crecimiento actual' },
                { year: '2027', label: 'Expansión nacional', value: '50 provincias' },
              ]}
            />
          </ParallaxSection>
        </div>
      </VideoBackground>

      {/* STATS SECTION con Video Background */}
      <CinematicStats
        stats={[
          {
            value: 2304001,
            prefix: '',
            suffix: '+',
            label: 'Paquetes entregados desde 2025',
            gradient: 'from-[#00F0FF] to-[#00C8FF]',
          },
          {
            value: 50000,
            prefix: '',
            suffix: '+',
            label: 'Entregas diarias',
            gradient: 'from-[#FF006E] to-[#FF4081]',
          },
          {
            value: 84,
            prefix: '',
            suffix: '',
            label: 'Instalaciones propias',
            gradient: 'from-[#00F0FF] to-[#FF006E]',
          },
          {
            value: 50,
            prefix: '',
            suffix: '',
            label: 'Provincias cubiertas',
            gradient: 'from-[#FF006E] to-[#FF80AB]',
          },
          {
            value: 48,
            prefix: '',
            suffix: 'M+',
            label: 'Habitantes con cobertura',
            gradient: 'from-[#00F0FF] to-[#00C8FF]',
          },
          {
            value: 80,
            prefix: '',
            suffix: '%',
            label: 'Población a <50km',
            gradient: 'from-[#00F0FF] to-[#FF006E]',
          },
        ]}
        videoBackground="/videos/logistics-network.mp4"
      />

      {/* CÓMO TRABAJAMOS SECTION */}
      <section className="relative py-32 bg-[#0A0A0F]">
        <VideoBackground
          videoSrc="/videos/warehouse-automation.mp4"
          overlay="dark"
          parallaxIntensity="medium"
        >
          <div className="max-w-7xl mx-auto px-6 py-20">
            <ParallaxSection speed={0.2} direction="up">
              <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-16">
                ¿Cómo{' '}
                <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF006E] bg-clip-text text-transparent">
                  trabajamos
                </span>
                ?
              </h2>
            </ParallaxSection>

            {/* 10 Etapas del proceso */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Recepción', desc: 'Descarga y registro de mercancía', icon: '📥' },
                { title: 'Cross docking', desc: 'Clasificación automatizada sin almacenaje', icon: '🔄' },
                { title: 'Line haul', desc: 'Distribución interurbana nacional', icon: '🚛' },
                { title: 'Última milla', desc: 'Distribución urbana adaptada', icon: '🏙️' },
                { title: 'Home delivery', desc: 'Entrega en domicilio', icon: '🏠' },
                { title: 'Out-of-home', desc: 'Puntos de recogida alternativos', icon: '📦' },
                { title: 'Logística inversa', desc: 'Gestión de devoluciones', icon: '↩️' },
                { title: 'Tecnología', desc: 'Coordinación en tiempo real', icon: '💻' },
                { title: 'Seguimiento', desc: 'Visibilidad completa del envío', icon: '🔍' },
                { title: 'Atención cliente', desc: 'Soporte 24/7', icon: '🎧' },
              ].map((step, index) => (
                <ParallaxSection key={index} speed={0.1} direction="up">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-[#1A1A2E]/60 backdrop-blur-md border border-[#00F0FF]/30 rounded-2xl p-6 hover:border-[#00F0FF]/60 transition-all hover:scale-105"
                  >
                    <div className="text-4xl mb-3">{step.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </motion.div>
                </ParallaxSection>
              ))}
            </div>
          </div>
        </VideoBackground>
      </section>

      {/* TEAM SECTION (Estilo Mockup 5) */}
      <section className="relative py-32 bg-[#1A1A2E]">
        <div className="absolute inset-0 bg-[url('/images/team-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E] via-[#1A1A2E]/90 to-[#1A1A2E]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ParallaxSection speed={0.2} direction="up">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-16">
              Conoce al equipo{' '}
              <span className="bg-gradient-to-r from-[#00F0FF] to-[#FF006E] bg-clip-text text-transparent">
                Quick Rabbit
              </span>
            </h2>
          </ParallaxSection>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Ana Martínez', role: 'CEO & Fundadora', desc: 'Lideró la expansión a 12 ciudades en 2026' },
              { name: 'Carlos Ruiz', role: 'CTO', desc: 'Desarrolló el TMS propio de Quick Rabbit' },
              { name: 'Laura Sánchez', role: 'COO', desc: 'Gestiona 1M+ paquetes mensuales' },
              { name: 'Miguel Ángel Torres', role: 'Head de Logística', desc: 'Diseñó la red de 84 instalaciones' },
            ].map((member, index) => (
              <ParallaxSection key={index} speed={0.15} direction="up">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="text-center group"
                >
                  {/* Foto circular con efecto parallax */}
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] to-[#FF006E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                    <div className="relative w-32 h-32 bg-[#0A0A0F] rounded-full overflow-hidden border-2 border-[#00F0FF] group-hover:border-[#FF006E] transition-all group-hover:scale-110">
                      <div className="w-full h-full bg-gradient-to-br from-[#1A1A2E] to-[#2A2A3E] flex items-center justify-center">
                        <span className="text-4xl">👤</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-[#00F0FF] text-sm mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.desc}</p>
                </motion.div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}