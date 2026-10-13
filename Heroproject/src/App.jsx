import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  Palette,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  X,
  Zap,
} from 'lucide-react'

const navLinks = [
  { href: '#features', label: 'Recursos' },
  { href: '#pricing', label: 'Preços' },
  { href: '#testimonials', label: 'Depoimentos' },
  { href: '#faq', label: 'FAQ' },
]

const heroFeatures = [
  {
    title: 'Velocidade',
    description: 'Uma experiência rápida e otimizada para seus visitantes, garantindo excelente desempenho.',
    icon: Zap,
    color: 'text-emerald-400',
  },
  {
    title: 'Segurança',
    description: 'Proteção e confiabilidade para oferecer uma navegação segura aos seus usuários.',
    icon: Shield,
    color: 'text-sky-400',
  },
  {
    title: 'Conversão',
    description: 'Uma landing page moderna e eficiente para transformar visitantes em clientes.',
    icon: Star,
    color: 'text-amber-400',
  },
]

const mainFeatures = [
  {
    id: 1,
    title: 'Design Responsivo',
    description: 'Sua landing page ficará ótima em qualquer dispositivo, seja celular, tablet ou computador.',
    icon: Smartphone,
    color: 'text-fuchsia-400',
  },
  {
    id: 2,
    title: 'Alta Performance',
    description: 'Carregamento rápido e otimizado para proporcionar uma excelente experiência.',
    icon: Zap,
    color: 'text-amber-400',
  },
  {
    id: 3,
    title: 'Segurança',
    description: 'Uma experiência confiável e segura para todos os visitantes da sua página.',
    icon: Shield,
    color: 'text-sky-400',
  },
  {
    id: 4,
    title: 'Experiência Moderna',
    description: 'Interface moderna, intuitiva e agradável para seus usuários.',
    icon: Star,
    color: 'text-emerald-400',
  },
  {
    id: 5,
    title: 'Personalização',
    description: 'Personalize sua landing page conforme a identidade visual da sua marca.',
    icon: Palette,
    color: 'text-pink-400',
  },
]

const faqItems = [
  {
    question: 'A página funciona no celular?',
    answer: 'Sim. O layout foi construído com classes responsivas do Tailwind CSS e se adapta a celulares, tablets e computadores.',
  },
  {
    question: 'Posso alterar as cores e os textos?',
    answer: 'Sim. Você pode editar os textos nos arrays do componente e ajustar as classes de cores do Tailwind.',
  },
  {
    question: 'Como adiciono novos recursos?',
    answer: 'Adicione um novo objeto ao array mainFeatures, informando título, descrição, ícone e cor.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function App() {
  const [open, setOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-fuchsia-500/30">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-2">
            <Sparkles className="size-5 text-fuchsia-400" />
            <span className="font-bold tracking-tight">Minha Marca</span>
          </a>

          <nav aria-label="Navegação principal" className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-fuchsia-400">
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="rounded-lg p-2 transition hover:bg-white/10 md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {open && (
          <div id="mobile-menu" className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              className="absolute right-0 top-0 flex h-full w-full max-w-80 flex-col overflow-y-auto border-l border-white/10 bg-slate-900 p-6 shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5 text-fuchsia-400" />
                  <span className="font-bold tracking-tight">Minha Marca</span>
                </div>
                <button
                  type="button"
                  className="rounded-lg p-2 transition hover:bg-white/10"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-3" aria-label="Navegação mobile">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-4 py-3 text-slate-200 transition-colors hover:bg-slate-800 hover:text-fuchsia-400"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO */}
        <section id="home" className="relative scroll-mt-20 overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-fuchsia-600/10 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="max-w-5xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Acelere sua presença online com uma landing{' '}
              <span className="bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
                simples e eficaz.
              </span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
            >
              Crie uma landing page responsiva e atraente em minutos, sem complicações.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-fuchsia-600 px-6 py-3 font-medium text-white shadow-lg shadow-fuchsia-600/20 transition hover:bg-fuchsia-700"
              >
                Comece Agora <ArrowRight className="size-4" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
              >
                Ver Recursos
              </a>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3"
            >
              {heroFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-fuchsia-500/30 hover:bg-white/[0.05]"
                  >
                    <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-white/5">
                      <Icon className={`size-6 ${feature.color}`} />
                    </div>
                    <h3 className="mb-3 text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{feature.description}</p>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tudo o que você precisa</h2>
            <p className="mt-3 max-w-2xl text-base text-slate-400 sm:text-lg">
              Recursos que tornam sua landing page incrível.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-fuchsia-500/30 hover:bg-white/[0.05]"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/5">
                      <Icon className={`size-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* PRICING */}
        <section
          id="pricing"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Planos e preços</h2>
            <p className="mt-3 text-base text-slate-400 sm:text-lg">
              Uma opção para dar mais destaque à sua presença online.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto w-full max-w-md rounded-3xl border border-fuchsia-500/40 bg-slate-900/80 p-6 shadow-xl shadow-fuchsia-900/10 sm:p-8"
          >
            <div className="mb-6">
              <span className="inline-flex rounded-full bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-300">
                Plano Essencial
              </span>
              <h3 className="mt-5 text-2xl font-bold text-white">Sua landing page</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Recursos para apresentar seu projeto com um visual moderno.
              </p>
            </div>

            <div className="mb-6 flex flex-wrap items-baseline gap-1 border-b border-white/10 pb-6">
              <span className="text-xl font-semibold text-slate-300">R$</span>
              <span className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                199,99
              </span>
            </div>

            <ul className="mb-8 space-y-4">
              {['Design responsivo', 'Interface moderna', 'Experiência otimizada', 'Personalização visual'].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className="mt-0.5 size-5 shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#features"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-fuchsia-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-fuchsia-700"
            >
              Conhecer recursos <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </motion.div>
        </section>

        {/* TESTIMONIALS: espaços para avaliações reais */}
        <section id="testimonials" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">O que nossos clientes dizem</h2>
            <p className="mt-3 max-w-2xl text-base text-slate-400 sm:text-lg">
              Espaço reservado para avaliações reais de clientes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <blockquote key={item} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="mb-4 flex items-center gap-1 text-amber-400" aria-label="Espaço para avaliação de cinco estrelas">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-400">
                  Adicione aqui o depoimento verdadeiro do cliente {item}.
                </p>
                <footer className="mt-4 text-sm font-semibold text-slate-300">Depoimento de exemplo {item}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 pb-24 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Perguntas frequentes</h2>
            <p className="mt-3 max-w-2xl text-base text-slate-400 sm:text-lg">
              Respostas para as dúvidas mais comuns.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div key={item.question} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  aria-expanded={expandedFaq === index}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium hover:bg-white/5"
                >
                  {item.question}
                  <ChevronDown className={`size-5 shrink-0 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === index && (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
