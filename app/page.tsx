"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  HeartHandshake,
  Accessibility,
  MessageCircle,
  ShieldCheck,
  Brain,
  Smartphone,
  Globe,
  Users,
  Sparkles,
  Calendar,
  MapPin,
  ArrowRight,
  Instagram,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react"

// Animated counter component
function CountUp({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [end, duration, isInView])

  return (
    <div ref={ref}>
      {count}
      {suffix}
    </div>
  )
}

// Animated section wrapper
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// Background decoration component
function WaveDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute -top-40 -right-40 w-[600px] h-[600px] opacity-20"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          className="text-sky-300"
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,40.1,76.8C26.4,84.6,13.2,87.6,-1.5,90.3C-16.2,93,-32.4,95.4,-46.3,88.7C-60.2,82,-71.8,66.2,-79.8,49.1C-87.8,32,-92.2,13.6,-91.8,-4.9C-91.4,-23.4,-86.2,-42,-76.3,-57.4C-66.4,-72.8,-51.8,-85,-36.5,-91.6C-21.2,-98.2,-10.6,-99.1,2.1,-102.5C14.8,-105.9,29.6,-111.8,44.7,-76.4Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-full h-32 opacity-30"
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,50 Q360,10 720,50 T1440,50 L1440,100 L0,100 Z" fill="currentColor" className="text-cyan-200" />
      </svg>
    </div>
  )
}

export default function HablemosEnSerioPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("proyecto")
  const { scrollY } = useScroll()
  const headerBg = useTransform(scrollY, [0, 100], ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"])

  const navItems = [
    { id: "proyecto", label: "Proyecto" },
    { id: "ejes", label: "Ejes" },
    { id: "herramientas", label: "Herramientas" },
    { id: "impacto", label: "Impacto" },
    { id: "ediciones", label: "Ediciones" },
    { id: "galeria", label: "Galería" },
    { id: "contacto", label: "Contacto" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toolsData = [
    {
      title: "Actividades accesibles (paso a paso)",
      icon: <HeartHandshake className="w-5 h-5" />,
      description:
        "Guías detalladas para diseñar actividades inclusivas que permitan la participación de todas las personas, considerando diferentes capacidades y necesidades.",
    },
    {
      title: "Comunicación inclusiva",
      icon: <MessageCircle className="w-5 h-5" />,
      description:
        "Técnicas y estrategias para comunicar de manera clara, respetuosa y accesible, utilizando lenguaje apropiado y recursos visuales.",
    },
    {
      title: "Materiales alternativos",
      icon: <Accessibility className="w-5 h-5" />,
      description:
        "Recursos adaptados como formatos visuales, lectura fácil, y roles flexibles para que todos puedan participar activamente.",
    },
    {
      title: "Límites sanos de pantalla",
      icon: <Smartphone className="w-5 h-5" />,
      description:
        "Estrategias para establecer límites saludables en el uso de dispositivos y mantener un equilibrio entre lo digital y lo presencial.",
    },
    {
      title: "Higiene digital",
      icon: <ShieldCheck className="w-5 h-5" />,
      description:
        "Buenas prácticas para gestionar notificaciones, horarios de uso, y mantener una relación saludable con la tecnología.",
    },
    {
      title: "Verificación rápida de info",
      icon: <Brain className="w-5 h-5" />,
      description:
        "Kit de herramientas para identificar información falsa, contrastar fuentes y desarrollar pensamiento crítico ante contenidos digitales.",
    },
  ]

  const impactAreas = [
    {
      title: "Corporabilidad",
      description:
        "Promovemos la integración física y emocional, generando empatía y comprensión de diferentes realidades corporales.",
      icon: <HeartHandshake className="w-8 h-8" />,
    },
    {
      title: "Sociabilidad",
      description:
        "Fomentamos valores de solidaridad, respeto y convivencia, construyendo comunidades más inclusivas y acogedoras.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "Carácter",
      description:
        "Desarrollamos procesos cognitivos, pensamiento crítico y autonomía para tomar decisiones informadas y responsables.",
      icon: <Brain className="w-8 h-8" />,
    },
    {
      title: "Creatividad",
      description:
        "Estimulamos la capacidad de idear actividades y soluciones innovadoras que incluyan a todas las personas.",
      icon: <Sparkles className="w-8 h-8" />,
    },
  ]

  const editions = [
    {
      year: "2024",
      date: "16 de noviembre de 2024",
      title: "Inclusión y discapacidad en el escultismo",
      location: "San Juan, Argentina",
      summary: [
        "Modelo social de la discapacidad y su aplicación en scouts",
        "Buenas prácticas para diseñar actividades accesibles",
        "Dinámicas de sensibilización y empatía",
        "Herramientas de comunicación inclusiva",
      ],
    },
    {
      year: "2025",
      date: "30 de agosto de 2025",
      title: "Ciberadicción y desinformación",
      location: "San Juan — sede a confirmar",
      summary: [
        "Identificación de señales de ciberadicción",
        "Estrategias para promover el bienestar digital",
        "Técnicas de verificación de información",
        "Desarrollo de pensamiento crítico ante contenidos digitales",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-cyan-50">
      {/* Header */}
      <motion.header
        style={{ backgroundColor: headerBg }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-sky-100/50 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl md:text-2xl font-bold text-slate-900"
            >
              Hablemos en Serio
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-sky-100 text-sky-700"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                size="sm"
                className="ml-2 bg-sky-600 hover:bg-sky-700 text-white"
                onClick={() => scrollToSection("contacto")}
              >
                Sumate
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-sky-100 pt-4"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-2 rounded-lg text-left font-medium transition-colors ${
                      activeSection === item.id
                        ? "bg-sky-100 text-sky-700"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  className="mt-2 bg-sky-600 hover:bg-sky-700 text-white"
                  onClick={() => scrollToSection("contacto")}
                >
                  Sumate
                </Button>
              </div>
            </motion.nav>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <WaveDecoration />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 text-balance">
                Hablemos en Serio
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed text-pretty">
                Un espacio de diálogo y aprendizaje, organizado por y para jóvenes scouts de San Juan.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <Badge variant="secondary" className="px-4 py-2 text-sm bg-sky-100 text-sky-700 hover:bg-sky-200">
                  Sin restricción
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm bg-cyan-100 text-cyan-700 hover:bg-cyan-200">
                  Sin distinción
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200">
                  Sin exclusión
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <Badge variant="outline" className="px-3 py-1 text-xs border-sky-300 text-sky-700">
                  +Conciencia
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-xs border-sky-300 text-sky-700">
                  +Autocontrol
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-xs border-sky-300 text-sky-700">
                  −Dependencia
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className="bg-sky-600 hover:bg-sky-700 text-white"
                  onClick={() => scrollToSection("ejes")}
                >
                  Ver ejes del proyecto
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-sky-300 text-sky-700 hover:bg-sky-50 bg-transparent"
                  onClick={() => scrollToSection("ediciones")}
                >
                  Ediciones
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-cyan-300 rounded-[3rem] rotate-3 opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-300 to-blue-200 rounded-[3rem] -rotate-3 opacity-40" />
                <div className="relative h-full flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-8 p-12">
                    {[
                      HeartHandshake,
                      Accessibility,
                      Brain,
                      Smartphone,
                      Globe,
                      Users,
                      MessageCircle,
                      ShieldCheck,
                      Sparkles,
                    ].map((Icon, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                        className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Icon className="w-8 h-8 text-sky-600" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1: About Project */}
      <AnimatedSection id="proyecto" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center text-balance">
              ¿De qué trata el proyecto?
            </h2>
            <Card className="border-sky-100 shadow-xl bg-white/80 backdrop-blur">
              <CardContent className="p-8 md:p-12">
                <p className="text-lg text-slate-700 leading-relaxed mb-8 text-pretty">
                  Hablemos en Serio busca generar conciencia sobre la inclusión de personas con discapacidad en
                  actividades scouts, y también abordar problemáticas actuales vinculadas al uso de la tecnología:
                  ciberadicción y desinformación. Se trabaja con charlas, dinámicas y actividades para promover
                  participación igualitaria, pensamiento crítico y bienestar colectivo.
                </p>

                <div className="border-t border-sky-100 pt-8">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-sky-600" />
                    Cómo lo hacemos
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { icon: <Users className="w-6 h-6" />, title: "Charlas con profesionales/experts", step: "01" },
                      {
                        icon: <HeartHandshake className="w-6 h-6" />,
                        title: "Dinámicas y juegos didácticos",
                        step: "02",
                      },
                      {
                        icon: <ShieldCheck className="w-6 h-6" />,
                        title: "Herramientas prácticas para aplicar en los grupos",
                        step: "03",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        whileHover={{ y: -5 }}
                        className="relative p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-100"
                      >
                        <div className="absolute top-4 right-4 text-4xl font-bold text-sky-200">{item.step}</div>
                        <div className="mb-3 text-sky-600">{item.icon}</div>
                        <p className="text-sm font-medium text-slate-800">{item.title}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Section 2: Project Axes */}
      <AnimatedSection id="ejes" className="py-20 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center text-balance"
          >
            Ejes del proyecto
          </motion.h2>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="inclusion" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-2 bg-transparent mb-8">
                <TabsTrigger
                  value="inclusion"
                  className="data-[state=active]:bg-sky-600 data-[state=active]:text-white py-3 rounded-xl"
                >
                  <Accessibility className="w-4 h-4 mr-2" />
                  Inclusión y accesibilidad
                </TabsTrigger>
                <TabsTrigger
                  value="bienestar"
                  className="data-[state=active]:bg-sky-600 data-[state=active]:text-white py-3 rounded-xl"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Bienestar digital
                </TabsTrigger>
                <TabsTrigger
                  value="pensamiento"
                  className="data-[state=active]:bg-sky-600 data-[state=active]:text-white py-3 rounded-xl"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Pensamiento crítico
                </TabsTrigger>
              </TabsList>

              <TabsContent value="inclusion">
                <Card className="border-sky-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Accessibility className="w-6 h-6 text-sky-600" />
                      Inclusión y accesibilidad
                    </CardTitle>
                    <CardDescription className="text-base">
                      Promoviendo la participación de todas las personas en actividades scouts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="bg-sky-50/50 border-sky-200">
                        <CardHeader>
                          <CardTitle className="text-lg">Modelo social de la discapacidad</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-600">
                            Entendiendo que las barreras están en el entorno, no en las personas. Trabajamos para
                            eliminar obstáculos y crear espacios verdaderamente inclusivos.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-cyan-50/50 border-cyan-200">
                        <CardHeader>
                          <CardTitle className="text-lg">Buenas prácticas scouts</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-600">
                            Adaptaciones concretas para actividades al aire libre, campamentos, juegos y ceremonias que
                            permitan la participación plena de todos.
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="border-t border-sky-100 pt-6">
                      <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-sky-600" />
                        Checklist de inclusión
                      </h4>
                      <div className="space-y-3">
                        {[
                          "Diseñar actividades para todas las personas",
                          "Eliminar barreras (comunicación, espacio, materiales)",
                          "Cultura de empatía y respeto",
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white border border-sky-100"
                          >
                            <CheckCircle2 className="w-5 h-5 text-sky-600 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bienestar">
                <Card className="border-sky-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Smartphone className="w-6 h-6 text-sky-600" />
                      Bienestar digital (ciberadicción)
                    </CardTitle>
                    <CardDescription className="text-base">
                      Desarrollando una relación saludable con la tecnología
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">¿Qué es la ciberadicción?</h4>
                      <p className="text-slate-600 leading-relaxed">
                        Es la dificultad para controlar el uso de dispositivos digitales, generando impactos negativos
                        en la vida diaria, relaciones personales y responsabilidades.
                      </p>
                    </div>

                    <div className="border-t border-sky-100 pt-6">
                      <h4 className="font-semibold text-slate-900 mb-4">Señales frecuentes</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Dificultad para reducir el tiempo de uso",
                          "Ansiedad o irritabilidad al no tener acceso",
                          "Priorizar el mundo online sobre responsabilidades",
                          "Descuido de relaciones personales presenciales",
                        ].map((signal, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-2 p-3 rounded-lg bg-orange-50 border border-orange-200"
                          >
                            <span className="text-orange-500 mt-0.5">•</span>
                            <span className="text-sm text-slate-700">{signal}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-sky-100 pt-6">
                      <Card className="bg-gradient-to-br from-sky-50 to-cyan-50 border-sky-200">
                        <CardHeader>
                          <CardTitle className="text-lg">Auto-chequeo reflexivo</CardTitle>
                          <CardDescription>
                            Reflexiona sobre tu relación con la tecnología (sin diagnóstico, solo para pensar)
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {[
                            "¿Siento que paso más tiempo del que quisiera en mi celular/computadora?",
                            "¿Me cuesta desconectarme o apagar notificaciones?",
                            "¿He descuidado actividades importantes por estar online?",
                          ].map((question, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                              <input type="checkbox" className="w-4 h-4 rounded border-sky-300 text-sky-600" />
                              <label className="text-sm text-slate-700">{question}</label>
                            </div>
                          ))}
                          <p className="text-xs text-slate-500 pt-2">
                            Si marcaste alguna, puede ser útil explorar estrategias de bienestar digital.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pensamiento">
                <Card className="border-sky-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Brain className="w-6 h-6 text-sky-600" />
                      Pensamiento crítico (desinformación)
                    </CardTitle>
                    <CardDescription className="text-base">
                      Desarrollando habilidades para navegar el mundo digital con criterio
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Los riesgos de la desinformación</h4>
                      <p className="text-slate-600 leading-relaxed mb-4">
                        En la era digital, las noticias falsas, contenido engañoso y algoritmos de redes sociales pueden
                        distorsionar nuestra percepción de la realidad. Es fundamental desarrollar herramientas para
                        identificar información confiable.
                      </p>
                    </div>

                    <div className="border-t border-sky-100 pt-6">
                      <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-sky-600" />
                        Kit rápido de verificación
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          {
                            title: "Chequear fuente",
                            description: "¿Quién publica? ¿Es un medio confiable? ¿Tiene credenciales?",
                            icon: <Globe className="w-5 h-5" />,
                          },
                          {
                            title: "Contrastar",
                            description: "Busca la misma noticia en otros medios. ¿Coinciden los datos?",
                            icon: <MessageCircle className="w-5 h-5" />,
                          },
                          {
                            title: "Buscar evidencia",
                            description: "¿Hay pruebas, estudios o fuentes citadas? ¿O son solo opiniones?",
                            icon: <Brain className="w-5 h-5" />,
                          },
                          {
                            title: "No compartir en caliente",
                            description: "Si algo te genera emoción fuerte, pausa antes de compartir.",
                            icon: <ShieldCheck className="w-5 h-5" />,
                          },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 rounded-xl bg-gradient-to-br from-white to-sky-50 border border-sky-200"
                          >
                            <div className="text-sky-600 mb-2">{item.icon}</div>
                            <h5 className="font-semibold text-slate-900 mb-1">{item.title}</h5>
                            <p className="text-xs text-slate-600">{item.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 3: Tools */}
      <AnimatedSection id="herramientas" className="py-20 relative overflow-hidden">
        <WaveDecoration />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center text-balance"
          >
            Herramientas aplicables
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-slate-600 mb-12 max-w-2xl mx-auto"
          >
            Recursos prácticos que puedes implementar en tu grupo scout
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {toolsData.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer h-full border-sky-100 hover:border-sky-300 transition-all hover:shadow-xl bg-white/90 backdrop-blur">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 mb-3">
                          {tool.icon}
                        </div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 mb-3">{tool.description}</p>
                        <span className="text-xs text-sky-600 font-medium flex items-center gap-1">
                          Ver más <ArrowRight className="w-3 h-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-2xl">
                        <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                          {tool.icon}
                        </div>
                        {tool.title}
                      </DialogTitle>
                      <DialogDescription className="text-base pt-4">{tool.description}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <p className="text-slate-700 leading-relaxed">
                        Aquí encontrarás información detallada, ejemplos prácticos y recursos descargables para
                        implementar esta herramienta en tu grupo. Contenido en desarrollo - próximamente disponible con
                        guías paso a paso, materiales de apoyo y casos de éxito.
                      </p>
                      <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                        <p className="text-sm text-sky-800">
                          💡 <strong>Tip:</strong> Comienza con cambios pequeños y observa los resultados. La inclusión
                          y el bienestar se construyen paso a paso.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Section 4: Impact */}
      <AnimatedSection id="impacto" className="py-20 bg-gradient-to-b from-sky-50 to-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center text-balance"
          >
            Áreas de crecimiento
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {impactAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full border-sky-100 hover:border-sky-300 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center text-sky-600 mb-4">
                      {area.icon}
                    </div>
                    <CardTitle className="text-xl">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 leading-relaxed">{area.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-sky-200 bg-gradient-to-br from-sky-50 to-cyan-50 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Nuestro impacto</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { label: "Jóvenes protagonistas", value: 120, suffix: "+" },
                    { label: "Grupos participantes", value: 10, suffix: "+" },
                    { label: "Horas de formación", value: 8, suffix: "+" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="text-center"
                    >
                      <div className="text-4xl md:text-5xl font-bold text-sky-600 mb-2">
                        <CountUp end={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Section 5: Editions */}
      <AnimatedSection id="ediciones" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center text-balance"
          >
            Ediciones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-slate-600 mb-12 max-w-2xl mx-auto"
          >
            Nuestras jornadas de formación y sensibilización
          </motion.p>

          <div className="max-w-4xl mx-auto space-y-6">
            {editions.map((edition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="border-sky-100 hover:border-sky-300 transition-all hover:shadow-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white p-6 md:p-8 flex flex-col justify-center items-center md:items-start md:w-48">
                      <div className="text-sm font-medium mb-1">Edición</div>
                      <div className="text-5xl font-bold mb-2">{edition.year}</div>
                      <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                        <Calendar className="w-3 h-3 mr-1" />
                        {edition.date.split(" ")[0]} {edition.date.split(" ")[1]} {edition.date.split(" ")[2]}
                      </Badge>
                    </div>
                    <div className="flex-1 p-6 md:p-8">
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{edition.title}</h3>
                      <p className="text-sm text-slate-600 mb-4 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-sky-600" />
                        {edition.location}
                      </p>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="summary" className="border-sky-100">
                          <AccordionTrigger className="text-sm font-medium text-sky-700 hover:text-sky-800">
                            Ver resumen del contenido
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 pt-2">
                              {edition.summary.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                  <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Section 6: Gallery */}
      <AnimatedSection id="galeria" className="py-20 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center text-balance"
          >
            Galería
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-slate-600 mb-12"
          >
            Imágenes de las jornadas y dinámicas de trabajo
          </motion.p>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-sky-100 to-cyan-100 shadow-md cursor-pointer"
                >
                  <img
                    src={`/scouts-youth-activities-.jpg?height=300&width=300&query=scouts+youth+activities+${index}`}
                    alt={`Galería imagen ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 7: CTA */}
      <AnimatedSection id="contacto" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-cyan-600 to-blue-600" />
        <WaveDecoration />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
              ¿Querés llevar Hablemos en Serio a tu grupo?
            </h2>
            <p className="text-lg text-sky-50 mb-8 leading-relaxed">
              Contactanos para coordinar una jornada en tu grupo scout o seguinos en redes sociales para estar al tanto
              de próximas ediciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-white text-sky-700 hover:bg-sky-50 shadow-lg hover:shadow-xl transition-all"
              >
                Contactar
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 backdrop-blur bg-transparent"
                onClick={() => window.open("https://instagram.com/hablemos.en.serio", "_blank")}
              >
                <Instagram className="mr-2 w-4 h-4" />
                Seguir en Instagram
              </Button>
            </div>
            <p className="text-sky-100 text-sm">@hablemos.en.serio</p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Hablemos en Serio</h3>
              <p className="text-sm leading-relaxed">
                Proyecto impulsado por jóvenes scouts de San Juan para generar conciencia sobre inclusión y bienestar
                digital.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Navegación</h4>
              <ul className="space-y-2 text-sm">
                {navItems.slice(0, 4).map((item) => (
                  <li key={item.id}>
                    <button onClick={() => scrollToSection(item.id)} className="hover:text-sky-400 transition-colors">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Más</h4>
              <ul className="space-y-2 text-sm">
                {navItems.slice(4).map((item) => (
                  <li key={item.id}>
                    <button onClick={() => scrollToSection(item.id)} className="hover:text-sky-400 transition-colors">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Redes sociales</h4>
              <div className="flex gap-3">
                <button
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-sky-600 flex items-center justify-center transition-colors"
                  onClick={() => window.open("https://instagram.com/hablemos.en.serio", "_blank")}
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-sm text-center">
            <p className="mb-2">© 2025 Hablemos en Serio. Proyecto educativo y de concientización.</p>
            <p className="text-slate-500 text-xs">
              Contenido educativo desarrollado por y para la comunidad scout de San Juan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
