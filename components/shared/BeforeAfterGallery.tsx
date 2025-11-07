'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'

interface GalleryItem {
  id: number
  title: string
  category: string
  before: string
  after: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Transformation Fade Moderne',
    category: 'Coupe',
    before: '🧔',
    after: '✨',
  },
  {
    id: 2,
    title: 'Barbe Sculptée',
    category: 'Barbe',
    before: '🧔‍♂️',
    after: '💈',
  },
  {
    id: 3,
    title: 'Coupe Classique Premium',
    category: 'Coupe',
    before: '👨',
    after: '🎩',
  },
  {
    id: 4,
    title: 'Style Businessman',
    category: 'Coupe + Barbe',
    before: '🧑',
    after: '👔',
  },
  {
    id: 5,
    title: 'Rasage Traditionnel',
    category: 'Rasage',
    before: '🧔',
    after: '😎',
  },
  {
    id: 6,
    title: 'Transformation Complète',
    category: 'Service Complet',
    before: '👨‍🦱',
    after: '⭐',
  },
]

export function BeforeAfterGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [showAfter, setShowAfter] = useState<{ [key: number]: boolean }>({})

  return (
    <>
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-5 py-2 rounded-full bg-emerald-50 text-emerald-600 font-semibold text-sm tracking-wide mb-6">
              Galerie
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-navy-900 leading-tight">
              Nos Transformations
            </h2>
            <p className="text-lg md:text-xl text-navy-400 max-w-2xl mx-auto leading-relaxed">
              Découvrez le savoir-faire de nos barbiers experts
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {galleryItems.map((item, index) => {
            const isAfter = showAfter[item.id]

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card
                  className="relative group cursor-pointer overflow-hidden border-2 border-gray-200 hover:border-mocha-300 transition-all duration-300 hover:shadow-xl"
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Image placeholder with emoji (replace with real images) */}
                  <div className="relative aspect-[4/5] bg-gradient-to-br from-mocha-100 to-cream-200 flex items-center justify-center">
                    <motion.div
                      className="text-8xl"
                      animate={{ scale: isAfter ? 1.2 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isAfter ? item.after : item.before}
                    </motion.div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <ZoomIn className="w-12 h-12 text-white" />
                      </motion.div>
                    </div>

                    {/* Before/After toggle button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowAfter((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }))
                      }}
                      className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-sm font-semibold text-navy-900 shadow-lg border-2 border-mocha-200 hover:bg-white transition-all"
                    >
                      {isAfter ? '← Avant' : 'Après →'}
                    </motion.button>
                  </div>

                  {/* Info */}
                  <div className="p-4 bg-white">
                    <h4 className="font-bold text-navy-900 mb-1">{item.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex px-2 py-1 rounded-full bg-mocha-50 text-mocha-600 text-xs font-medium border border-mocha-200">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Info note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-navy-400">
            💡 Survolez les photos et cliquez sur les boutons pour voir la transformation
          </p>
        </motion.div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative"
            >
              <Card className="border-2 border-mocha-200 overflow-hidden">
                {/* Close button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg"
                >
                  <X className="w-5 h-5 text-navy-900" />
                </button>

                <div className="grid md:grid-cols-2">
                  {/* Before */}
                  <div className="relative aspect-square bg-gradient-to-br from-mocha-100 to-cream-200 flex flex-col items-center justify-center p-8 border-r-2 border-mocha-200">
                    <div className="text-9xl mb-4">{selectedItem.before}</div>
                    <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm font-bold text-navy-900 shadow-lg">
                      AVANT
                    </div>
                  </div>

                  {/* After */}
                  <div className="relative aspect-square bg-gradient-to-br from-emerald-100 to-cream-200 flex flex-col items-center justify-center p-8">
                    <div className="text-9xl mb-4">{selectedItem.after}</div>
                    <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm font-bold text-emerald-600 shadow-lg">
                      APRÈS
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 bg-white border-t-2 border-mocha-200">
                  <h3 className="text-2xl font-serif font-bold text-navy-900 mb-2">
                    {selectedItem.title}
                  </h3>
                  <span className="inline-flex px-3 py-1.5 rounded-full bg-mocha-50 text-mocha-600 text-sm font-medium border border-mocha-200">
                    {selectedItem.category}
                  </span>
                </div>
              </Card>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
