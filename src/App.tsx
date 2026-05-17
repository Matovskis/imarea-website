import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Stage, useGLTF } from "@react-three/drei";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ArrowRight,
  Play,
  Box,
  Hexagon,
  Cpu,
  Globe,
  Lightbulb,
  PenTool,
  Layers,
  Printer,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Star,
  CheckCircle2,
  Shapes,
  Palette,
  Clock,
} from "lucide-react";

// --- 3D Model Component ---
const ModelWrapper = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return (
    <Stage environment="city" intensity={0.6} shadows="contact">
      <primitive object={scene} scale={1.5} />
    </Stage>
  );
};

// --- Header ---
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#" },
    { name: "Custom Order", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Process", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#050406]/90 backdrop-blur-md py-4 border-b border-white/5"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-16">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#C00B27] flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(192,11,39,0.3)] group-hover:scale-105 transition-all">
              <span className="text-white font-display font-bold text-xl tracking-tighter">
                IR
              </span>
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-white">
              ImaRea
            </span>
          </a>
        </div>

        <nav className="hidden xl:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium text-white/70 hover:text-white transition-colors tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium text-white">
            <Search className="w-4 h-4 text-white/50" />
            <span>Search Sculptures</span>
          </button>

          <button
            className="xl:hidden p-2 text-white hover:text-white/70 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-[#050406] border-t border-white/5 xl:hidden overflow-hidden"
          >
            <nav className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-bold text-white hover:text-[#C00B27] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold">
                <Search className="w-5 h-5" />
                Search Sculptures
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Hero Section ---
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#050406]">
      {/* Background Gradients & Motion Graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#C00B27]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#F1156D]/5 blur-[120px] rounded-full" />
        
        {/* Animated Blobs */}
        <motion.div
          animate={{
            x: ["-25%", "25%", "-25%"],
            y: ["-15%", "15%", "-15%"],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/2 w-[50%] h-[50%] bg-[#C00B27]/10 blur-[120px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            x: ["25%", "-25%", "25%"],
            y: ["15%", "-15%", "15%"],
            rotate: [360, 180, 33],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-3/4 w-[25%] h-[45%] bg-[#F1156D]/15 blur-[90px] rounded-full mix-blend-screen"
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-8 w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-10">
            <span className="text-[12px] font-medium text-white/60 tracking-wider uppercase">
              Bridging Art & Technology
            </span>
          </div>

          <h1 className="text-7xl md:text-[110px] font-bold leading-[0.9] tracking-tight mb-10 text-white">
            IMAGINATION.
            <br />
            <span className="text-[#fb5935]">MADE REAL.</span>
          </h1>

          <p className="text-lg text-white/50 mb-12 max-w-xl leading-relaxed">
            ImaRea Studios bridges traditional sculpting with advanced 3D
            manufacturing to create bespoke sculptures and products that are
            both beautiful and functional.
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <button className="bg-white text-black px-10 py-5 rounded-xl font-bold flex items-center gap-3 group hover:bg-gray-100 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
              Order Your Catalog
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/10 bg-white/5 text-white px-10 py-5 rounded-xl font-bold flex items-center gap-3 hover:bg-white/10 transition-all">
              <Play className="w-5 h-5 fill-white/20" />
              Custom Order
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative aspect-square lg:aspect-[4/3] w-full"
        >
          <div className="absolute inset-0 bg-[#1e0b0b] backdrop-blur-sm rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden group z-10">
            <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
              <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
                <Suspense fallback={null}>
                  <PresentationControls
                    speed={1.5}
                    global
                    zoom={0.7}
                    polar={[-0.1, Math.PI / 4]}
                  >
                    <ModelWrapper url="/optimus_prime_3d_sculpture-transformers_fanart.glb" />
                  </PresentationControls>
                </Suspense>
              </Canvas>
            </div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#F1156D]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#C00B27]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-8 right-8 z-20">
              <div className="bg-black/90 backdrop-blur-3xl border border-white/10 p-5 rounded-2xl shadow-2xl flex items-start gap-4 min-w-[280px]">
                <div className="w-3 h-3 bg-[#4ADE80] rounded-full mt-1.5 shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                <div className="flex flex-col">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-1">
                    Item #1 in our portfolio
                  </p>
                  <p className="text-xl font-bold text-white tracking-tight leading-tight">
                    Ultimate Prime Sculpture
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute top-8 left-8 z-20 pointer-events-none">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-[#F1156D] rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  Interactive 3D
                </span>
              </div>
              <p className="text-xs text-white/30 uppercase tracking-widest font-bold">
                Drag to rotate • Scroll to zoom
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Features Banner ---
const FeaturesBanner = () => {
  const features = [
    {
      icon: Box,
      title: "Bespoke Creations",
      desc: "Unique pieces designed around your vision.",
    },
    {
      icon: Layers,
      title: "Premium Materials",
      desc: "High quality materials for stunning results.",
    },
    {
      icon: Cpu,
      title: "Precision Manufacturing",
      desc: "Advanced 3D printing with meticulous detail.",
    },
    {
      icon: Globe,
      title: "Worldwide Delivery",
      desc: "Safe, secure delivery to your doorstep.",
    },
  ];

  return (
    <div className="bg-white border-y border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex items-start gap-4"
          >
            <div className="p-3 bg-brand/5 rounded-lg">
              <f.icon className="w-6 h-6 text-brand" />
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-950 leading-tight mb-1">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-snug">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- How It Works ---
const HowItWorks = () => {
  const steps = [
    {
      icon: Lightbulb,
      title: "Concept",
      desc: "Share your idea or inspiration.",
    },
    {
      icon: PenTool,
      title: "Sculpt",
      desc: "Our artists sculpt and refine every detail.",
    },
    {
      icon: Shapes,
      title: "Digitize",
      desc: "3D scanning & modeling for perfect accuracy.",
    },
    {
      icon: Printer,
      title: "Print",
      desc: "Precision 3D printing in premium materials.",
    },
    {
      icon: Sparkles,
      title: "Finish",
      desc: "Hand finishing for a flawless result.",
    },
  ];

  return (
    <section className="py-32 bg-[#FCFAF9]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-sm font-mono text-brand uppercase tracking-[0.3em] font-bold mb-4">
          The Journey
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold mb-20 text-gray-950">
          HOW IT WORKS
        </h3>

        <div className="relative grid md:grid-cols-5 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 group">
              <motion.div
                whileHover={{ y: -10 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-8 border border-gray-100 group-hover:border-brand/30 transition-all">
                  <step.icon className="w-8 h-8 text-brand" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                    {i + 1}
                  </div>
                </div>
                <h4 className="font-display font-bold text-gray-950 mb-3">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-500 max-w-[160px]">
                  {step.desc}
                </p>
              </motion.div>

              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[70%] w-[60%] h-px bg-dashed-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Order CTA Sections ---
const OrderCTA = () => {
  const ctas = [
    {
      title: "ORDER FROM CATALOG",
      desc: "Browse our collection of ready-made sculptures and functional products.",
      btnText: "Browse Catalog",
      img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1548&auto=format&fit=crop",
      icon: Box,
    },
    {
      title: "CUSTOM ORDER",
      desc: "Create something truly unique. We bring your ideas to life.",
      btnText: "Start Your Custom Order",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1548&auto=format&fit=crop",
      icon: PenTool,
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {ctas.map((cta, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="relative h-[450px] group overflow-hidden rounded-2xl flex flex-col justify-end p-10"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={cta.img}
                alt={cta.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
            </div>

            <div className="relative z-10 text-white text-center">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                  <cta.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-white">
                {cta.title}
              </h3>
              <p className="text-gray-200 mb-8 max-w-sm mx-auto">{cta.desc}</p>
              <button className="bg-white text-gray-950 px-8 py-3 rounded-sm font-bold hover:bg-brand hover:text-white transition-all uppercase tracking-wider text-xs">
                {cta.btnText}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --- Featured Creations ---
const FeaturedCreations = () => {
  const products = [
    {
      name: "3D Sculpture v1",
      price: 320.0,
      img: "/3dprint1.jpg",
      desc: "An intricate red mesh structure pushing the limits of additive manufacturing.",
      rating: 5,
      reviews: 24,
    },
    {
      name: "3D Sculpture v2",
      price: 450.0,
      img: "/3dprint2.jpg",
      desc: "Smooth, mathematically derived red vase capturing fluid motion in solid form.",
      rating: 5,
      reviews: 18,
    },
    {
      name: "3D Sculpture v3",
      price: 185.0,
      img: "/3dprint3.jpg",
      desc: "A bold, geometric red sculpture exploring the interplay of light and shadow.",
      rating: 4,
      reviews: 32,
    },
    {
      name: "3D Sculpture v4",
      price: 540.0,
      img: "/3dprint4.jpg",
      desc: "A complex, lattice-like red sculpture showcasing the precision of 3D printing technology.",
      rating: 5,
      reviews: 12,
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-sm font-mono text-brand uppercase tracking-[0.3em] font-bold mb-4">
              Curated Collection
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-950">
              FEATURED CREATIONS
            </h3>
          </div>
          <div className="flex gap-4">
            <button className="p-3 border border-gray-200 rounded-full hover:bg-brand hover:text-white hover:border-brand transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="p-3 border border-gray-200 rounded-full hover:bg-brand hover:text-white hover:border-brand transition-all">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group">
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-6 bg-gray-100 relative">
                <img
                  id={`creation-img-${i}`}
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-3 bg-white rounded-full shadow-lg hover:bg-brand hover:text-white transition-all">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <h4 className="font-display font-bold text-lg mb-1 group-hover:text-brand transition-colors">
                {p.name}
              </h4>
              <p className="text-sm text-gray-500 mb-2">{p.desc}</p>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(p.rating)].map((_, index) => (
                    <Star
                      key={index}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  ({p.reviews})
                </span>
              </div>
              <p className="text-xl font-display font-bold text-gray-950">
                ${p.price.toFixed(2)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-16 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full cursor-pointer ${i === 0 ? "bg-brand" : "bg-gray-200"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Premium Materials ---
const PremiumMaterials = () => {
  return (
    <section className="bg-gray-950 py-24 px-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand/10 skew-x-12 translate-x-1/2" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="flex items-center gap-8 mb-10 md:mb-0">
          <div className="p-6 bg-brand rounded-2xl shadow-2xl">
            <Layers className="w-12 h-12 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
              PREMIUM MATERIALS
            </h3>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Explore a range of high-quality materials from biocompatible
              resins to precious metals, to suit every vision and purpose.
            </p>
          </div>
        </div>
        <button className="bg-white text-gray-950 px-10 py-4 rounded-sm font-bold hover:bg-brand hover:text-white transition-all uppercase tracking-widest text-xs">
          Explore Materials
        </button>
      </div>
    </section>
  );
};

// --- Social Proof ---
const SocialProof = () => {
  return (
    <section className="py-32 bg-[#FCFAF9] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-20">
        {/* Trusted Store */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <h4 className="font-display font-bold text-xl text-gray-950">
              TRUSTED QUALITY
            </h4>
          </div>
          <p className="text-gray-500 mb-8 leading-relaxed">
            We are a verified boutique studio, recognized for our commitment to
            precision and artistic integrity.
          </p>
          <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-950 text-white rounded-full flex items-center justify-center font-bold text-xl">
              e
            </div>
            <div>
              <p className="font-display font-bold text-gray-950 leading-none mb-1 uppercase tracking-tighter">
                TRUSTED SHOPS®
              </p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">
                The trademark with buyer protection
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-sm font-mono text-brand uppercase tracking-[0.3em] font-bold mb-8">
            Voices of Clients
          </h2>
          <div className="relative pt-8 pb-8">
            <p className="text-2xl font-display font-medium text-gray-950 leading-relaxed italic mb-8">
              "ImaRea Studios turned my abstract concept into a physical
              masterpiece. The attention to detail and material quality is
              unmatched!"
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand/20">
                <img src="https://i.pravatar.cc/150?u=1" alt="Client" />
              </div>
              <div>
                <p className="font-display font-bold text-gray-950">
                  Julian Sterling
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  Architectural Designer
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-brand" />
            <div className="w-2 h-2 rounded-full bg-gray-200" />
            <div className="w-2 h-2 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Partners */}
        <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
          <h4 className="font-display font-bold text-xl text-gray-950 mb-8 uppercase tracking-widest">
            Creators & Partners
          </h4>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-24 h-24 bg-white border border-gray-100 rounded-lg flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
              >
                <Box className="w-8 h-8 text-gray-400" />
              </div>
            ))}
          </div>
          <button className="text-sm font-bold text-gray-950 hover:text-brand transition-colors uppercase tracking-widest flex items-center gap-2">
            View All Partners
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- Newsletter ---
const Newsletter = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 bg-brand rounded-[40px] p-12 md:p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-10">
            <div className="hidden lg:block border border-white/20 p-8 rounded-2xl transform -rotate-6">
              <Box className="w-16 h-16 text-white" />
            </div>
            <div className="text-center md:text-left text-white">
              <h3 className="text-4xl font-bold mb-4 text-white">
                STAY INSPIRED
              </h3>
              <p className="text-white/70 max-w-sm">
                Subscribe to our newsletter for updates on new creations,
                limited editions, and exclusive offers.
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-8 py-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-white/30 w-full sm:w-64"
                required
              />
              <button className="bg-white text-brand px-10 py-4 rounded-sm font-bold hover:bg-gray-100 transition-all uppercase tracking-widest text-xs">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand flex items-center justify-center rounded-sm">
              <span className="text-white font-display font-bold text-base tracking-tighter">
                IR
              </span>
            </div>
            <span className="font-display font-bold text-xl tracking-tighter text-gray-950 uppercase">
              ImaRea
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
            Defining the future of artistic fabrication. We blend traditional
            soul with digital precision.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-brand hover:border-brand transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-gray-950 mb-8 uppercase tracking-widest text-xs">
            Company
          </h4>
          <ul className="space-y-4">
            {["About Us", "Our Process", "Careers", "Journal"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-brand transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-gray-950 mb-8 uppercase tracking-widest text-xs">
            Help
          </h4>
          <ul className="space-y-4">
            {[
              "FAQ",
              "Policy & Safety",
              "Shipping & Returns",
              "Track Order",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-brand transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-gray-950 mb-8 uppercase tracking-widest text-xs">
            Contact
          </h4>
          <ul className="space-y-4">
            <li className="text-sm text-gray-500 leading-relaxed">
              12 Innovation Way, Sculpt City
              <br />
              Digital Arts District, DA 1010
            </li>
            <li>
              <a
                href="mailto:hello@imareastudios.com"
                className="text-sm font-bold text-gray-950 hover:text-brand transition-colors"
              >
                hello@imareastudios.com
              </a>
            </li>
            <li className="text-sm text-gray-500 font-mono">
              +1 (800) 555-IMAREA
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-gray-400">
          © 2024 ImaRea Studios. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-xs text-gray-400 hover:text-brand">
            Terms of Use
          </a>
          <a href="#" className="text-xs text-gray-400 hover:text-brand">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---
export default function App() {
  return (
    <div className="min-h-screen bg-[#050406]">
      <Header />
      <Hero />
      <div className="bg-white">
        <FeaturesBanner />
        <HowItWorks />
        <OrderCTA />
        <FeaturedCreations />
        <PremiumMaterials />
        <SocialProof />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}
