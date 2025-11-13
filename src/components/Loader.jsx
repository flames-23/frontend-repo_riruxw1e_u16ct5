import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ show, text = 'Loading experience…' }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-gradient-to-b from-white to-blue-50 flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <motion.div
                className="h-14 w-14 rounded-2xl bg-blue-600/90 shadow-lg shadow-blue-600/30"
                initial={{ rotate: 0, scale: 0.9 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -inset-2 rounded-3xl bg-blue-400/20 blur-xl"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: [0.6, 0.2, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
              />
            </div>

            <div className="w-56">
              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  className="h-full bg-blue-600"
                  initial={{ x: '-100%' }}
                  animate={{ x: ['-100%', '0%', '100%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <p className="mt-3 text-sm text-gray-600 text-center">{text}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
