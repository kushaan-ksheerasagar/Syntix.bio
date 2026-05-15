'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ============================================================================
 * ◈ AI GENOME ANALYZER - INTEGRATION POINT
 * ============================================================================
 * 
 * TODO PARA EL INTEGRADOR (TU AMIGO):
 * 1. Usa este componente como punto de entrada para tu modelo de IA.
 * 2. La prop `encryptedGenomeData` debería recibir el payload encriptado (FHE).
 * 3. Ejecuta tu análisis en la función `handleAnalyze`.
 * 4. Actualiza `analysisResult` con la salida de tu IA.
 */

interface AIGenomeAnalyzerProps {
  encryptedGenomeData?: string;
}

export const AIGenomeAnalyzer: React.FC<AIGenomeAnalyzerProps> = ({ 
  encryptedGenomeData = "0x8f3a9c291...[FHE_CIPHERTEXT]" 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    try {
      // → AQUÍ VA TU LLAMADA A LA IA O BACKEND DE ANÁLISIS
      // const response = await runMyGenomeAIModel(encryptedGenomeData);
      
      // Simulando tiempo de computación de la IA
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Resultado simulado - reemplaza esto con response.data
      setAnalysisResult("Análisis completado: No se detectaron anomalías genéticas. Riesgo metabólico: Bajo.");
    } catch (error) {
      console.error("Error en el analizador de IA:", error);
      setAnalysisResult("Error durante la computación ciega (FHE).");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full flex flex-col relative overflow-hidden group">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          AI Genome Analyzer
        </div>
        <div className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
          Ready for Integration
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col justify-center">
        {!analysisResult ? (
          <div className="text-center space-y-6">
            <p className="text-sm text-gray-400 font-mono break-all px-4">
              [INPUT]: <span className="opacity-50">{encryptedGenomeData}</span>
            </p>
            
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`relative inline-flex items-center justify-center gap-2.5 px-8 py-3 bg-cyan-400 text-black font-mono text-sm font-bold uppercase tracking-widest rounded-sm transition-all duration-300 ${isAnalyzing ? 'opacity-70 cursor-wait' : 'hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.2)]'}`}
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  Procesando IA...
                </span>
              ) : (
                'Iniciar Análisis FHE'
              )}
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-white/5 border border-cyan-400/20"
          >
            <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Resultado (Insight):</h4>
            <p className="text-sm text-white leading-relaxed">
              {analysisResult}
            </p>
            <button 
              onClick={() => setAnalysisResult(null)}
              className="mt-4 text-xs font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
            >
              Resetear Analizador
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
