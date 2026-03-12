// app/home/components/TrackingForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function TrackingForm() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simular búsqueda
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (trackingNumber.length < 5) {
      setError('Número de seguimiento inválido');
    } else {
      // Redirigir a página de tracking
      window.location.href = `/tracking?ref=${trackingNumber}`;
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
          placeholder="QR-2024-XXXXXX"
          className={`w-full px-4 py-3 bg-[#0A0A0F]/80 border-2 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all ${
            error ? 'border-[#FF006E]' : 'border-[#00F0FF]/30 focus:border-[#00F0FF]'
          }`}
        />
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#FF006E] text-sm"
        >
          {error}
        </motion.p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-[#00F0FF] to-[#00C8FF] text-[#0A0A0F] font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all disabled:opacity-50"
      >
        {isLoading ? 'Buscando...' : 'LOCALIZA TU ENVÍO'}
      </button>
    </form>
  );
}