"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PageLoaderProps {
  isLoading: boolean;
}

export function PageLoader({ isLoading }: PageLoaderProps) {
  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: "url('/assets/images/background_destinyShop.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#0E121B', // Fallback color enquanto carrega
          }}
        >
          {/* Overlay escuro para melhor contraste */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Conteúdo */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Logo com animação de pulse */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="68"
                  height="53"
                  viewBox="0 0 68 53"
                  fill="none"
                >
                  <path
                    d="M41.7138 8.12154e-06L0.777511 8.12154e-06C0.617513 -0.000797333 0.46296 0.0583338 0.344032 0.165855C0.225105 0.273376 0.150343 0.421566 0.134344 0.581488C-1.09024 12.0728 6.23799 20.3945 14.7368 22.2009C14.9803 22.2489 15.2043 22.3679 15.3809 22.543C15.5575 22.7181 15.6789 22.9416 15.7298 23.1856C16.3385 25.9089 17.5417 28.4624 19.2526 30.6615C20.9636 32.8607 23.1394 34.6506 25.623 35.9019C25.7132 35.9483 25.7914 36.0151 25.8514 36.0972C25.9114 36.1792 25.9516 36.2741 25.9687 36.3745C25.9858 36.4748 25.9794 36.5777 25.95 36.6752C25.9205 36.7726 25.869 36.8617 25.7993 36.9356L9.95936 53L41.7138 53C56.2339 53 68 41.1804 68 26.5956V26.4057C68 11.8196 56.2339 8.12154e-06 41.7138 8.12154e-06ZM23.4607 22.7811L41.6507 22.7811C42.6377 22.7811 43.5843 23.175 44.2822 23.876C44.98 24.5771 45.3721 25.5279 45.3721 26.5194C45.3721 27.5108 44.98 28.4617 44.2822 29.1627C43.5843 29.8638 42.6377 30.2577 41.6507 30.2577H35.2191C31.8 30.2693 26.5826 29.7137 23.4646 22.7811M60.4634 26.5194V26.6576C60.4634 29.1325 59.978 31.583 59.035 33.8694C58.0921 36.1557 56.7099 38.2331 54.9676 39.9827C53.2252 41.7324 51.1568 43.1201 48.8805 44.0666C46.6042 45.013 44.1645 45.4998 41.7009 45.4989H27.9745L35.3284 38.2252C35.5687 37.9886 35.8924 37.8572 36.2289 37.8595L40.7426 37.8725H41.6353C44.6364 37.8708 47.5139 36.672 49.6354 34.5396C51.7569 32.4073 52.9486 29.516 52.9486 26.5013V26.438C52.9469 23.4244 51.7544 20.5347 49.6331 18.4038C47.5119 16.2729 44.6353 15.075 41.6353 15.0733L19.275 15.0733C15.9061 15.0733 10.488 13.4568 8.61385 7.66004L41.7009 7.66004C52.0598 7.69105 60.4634 16.1264 60.4634 26.5194Z"
                    fill="#F3F3F3"
                  />
                </svg>
              </motion.div>
            </motion.div>

            {/* Texto de carregamento */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-xl font-bold text-white mb-2">
                Carregando...
              </h2>
              <p className="text-sm text-gray-400">
                Preparando sua experiência
              </p>
            </motion.div>

            {/* Dots de loading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-2"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
