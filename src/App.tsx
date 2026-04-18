import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "motion/react";
import React, { useRef, useState } from "react";
import { 
  Frame, 
  MapPin, 
  Phone, 
  Clock,
  Compass,
  ShieldCheck,
  Brush,
  ChevronRight,
  Menu,
  X,
  Star,
  Layers,
  Sparkles,
  Zap
} from "lucide-react";

// --- Data ---
const NAV_LINKS = [
  { name: "Portfolio", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Story", href: "#story" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

const SERVICES = [
  { 
    title: "Bespoke Framing", 
    desc: "Custom-built wood profiles scaled precisely to your artwork's dimensions and aesthetic personality.",
    icon: <Frame className="w-6 h-6" />
  },
  { 
    title: "Archival Mounting", 
    desc: "Museum-grade, pH-balanced mats that guard against atmospheric yellowing and environmental decay.",
    icon: <Layers className="w-6 h-6" />
  },
  { 
    title: "Conservation Glass", 
    desc: "Specialized UV-protective glazing that provides 99% filtering while maintaining surgical clarity.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  { 
    title: "Art Restoration", 
    desc: "Qualified assessment and delicate surgical repair for your cherished vintage photographs and oils.",
    icon: <Brush className="w-6 h-6" />
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Curation", desc: "A detailed dialogue where we match your art with the perfect material palette." },
  { step: "02", title: "Engineering", desc: "Precision cutting and joining using specialized archival machinery." },
  { step: "03", title: "Preservation", desc: "Sealing your art in a vacuum-controlled environment to prevent oxidation." },
  { step: "04", title: "Installation", desc: "Professional delivery and museum-standard hanging advice for your space." },
];

const FAQS = [
  { q: "How long does a custom frame take?", a: "Typically 2 to 3 days for bespoke orders, as every profile is hand-finished with precision." },
  { q: "Do you offer UV protection?", a: "Yes, we exclusively use museum-grade TruVue glass for maximum conservation." },
  { q: "Can you frame oversized canvases?", a: "Absolutely. We specialize in large-format industrial framing and shipping." },
];

// --- Components ---

function ParallaxHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center px-10 md:px-20 py-32 overflow-hidden"
    >
      <div className="z-10 max-w-6xl space-y-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-6 py-2 border border-studio-accent/30 rounded-full text-[10px] font-bold tracking-[4px] uppercase text-studio-accent bg-studio-accent/5 backdrop-blur-sm"
        >
          Balaji Legacy • 15 Years of Excellence
        </motion.div>
        
        <h1 className="font-serif text-[clamp(4rem,12vw,10rem)] leading-[0.85] font-normal tracking-tighter">
          Mastering <br />
          <span className="italic text-studio-accent">The View.</span>
        </h1>
        
        <p className="max-w-xl text-xl leading-relaxed text-studio-text/50 font-sans font-light">
          At Balaji, we transform moments into monuments. Our 15-year precision in archival framing ensures your story isn't just displayed—it's preserved for the next century.
        </p>
        
        <div className="flex flex-wrap gap-8 pt-4">
          <a href="#portfolio" className="bg-studio-accent text-black px-12 py-5 text-sm font-bold uppercase tracking-[2px] hover:bg-white hover:scale-105 transition-all duration-500 shadow-glow">
            View Collection
          </a>
          <a href="#contact" className="border border-white/20 text-white px-12 py-5 text-sm font-bold uppercase tracking-[2px] hover:bg-white/5 transition-all">
            Consultation
          </a>
        </div>
      </div>

      {/* 3D Floating Frames Background */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none -z-10 opacity-40">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            style={{
              x: useTransform(springX, [-0.5, 0.5], [i * -100, i * 100]),
              y: useTransform(springY, [-0.5, 0.5], [i * -100, i * 100]),
              rotateY: useTransform(springX, [-0.5, 0.5], [-15, 15]),
              rotateX: useTransform(springY, [-0.5, 0.5], [15, -15]),
              translateZ: i * 50
            }}
            className={`absolute aspect-[3/4] border-[15px] border-white/5 bg-studio-surface shadow-2xl overflow-hidden ${i === 1 ? 'w-64 top-[15%] right-[25%]' : i === 2 ? 'w-80 top-[45%] right-[10%]' : 'w-56 top-[65%] right-[35%]'}`}
          >
            <div className="w-full h-full bg-studio-bg/50 backdrop-blur-md flex items-center justify-center border border-white/5">
                <span className="text-white/5 uppercase text-xs tracking-widest">Preserved Art</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Visual Accents */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-studio-accent/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Handle scroll for Back to Top and Navbar
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Disable body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen selection:bg-studio-accent selection:text-black bg-studio-bg text-studio-text overflow-x-hidden selection:shadow-glow">
      
      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 w-12 h-12 bg-studio-accent text-black flex items-center justify-center rounded-full z-[100] shadow-glow hover:scale-110 active:scale-90 transition-transform"
          >
            <ChevronRight className="-rotate-90 w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-5 md:p-8 md:px-20 flex justify-between items-center z-[60] bg-studio-bg/90 backdrop-blur-xl border-b border-white/5">
        <div className="font-serif text-xl md:text-2xl font-bold tracking-[2px] md:tracking-[3px] uppercase flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-studio-accent text-black flex items-center justify-center font-bold text-lg md:text-xl shadow-glow">B</div>
          BALAJI <span className="text-studio-accent italic font-normal tracking-normal capitalize ml-1 hidden sm:inline">Framing</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-12">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-[3px] hover:text-studio-accent transition-all hover:translate-y-[-2px] relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-studio-accent transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 -mr-2 outline-none z-[70]" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
          {isMenuOpen ? <X className="text-studio-accent w-6 h-6 animate-in spin-in-90 duration-300" /> : <Menu className="w-6 h-6 animate-in zoom-in-50 duration-300" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[55] bg-studio-bg/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:gap-10"
          >
            {NAV_LINKS.map((link, idx) => (
              <motion.a 
                key={link.name} 
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl md:text-5xl font-serif italic hover:text-studio-accent transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <ParallaxHero />

      {/* Trust Banner */}
      <div className="py-20 border-y border-white/5 bg-studio-surface overflow-hidden">
        <div className="flex gap-20 items-center justify-center opacity-30 animate-pulse">
            <span className="text-xs font-bold uppercase tracking-[5px]">Museum Verified</span>
            <div className="w-1 h-1 bg-white rounded-full" />
            <span className="text-xs font-bold uppercase tracking-[5px]">Archival Standard</span>
            <div className="w-1 h-1 bg-white rounded-full" />
            <span className="text-xs font-bold uppercase tracking-[5px]">Artisan Hand-Cut</span>
        </div>
      </div>

      {/* Expertise Section */}
      <section id="services" className="py-40 px-10 md:px-20">
        <div className="grid lg:grid-cols-2 gap-20 mb-32 items-end">
          <div className="space-y-6">
            <h2 className="text-studio-accent font-bold uppercase text-[10px] tracking-[5px]">Our Expertise</h2>
            <h3 className="font-serif text-5xl md:text-7xl leading-tight">The Science <br/> <span className="italic text-white/50">of preservation.</span></h3>
          </div>
          <p className="max-w-md text-lg text-studio-text/50 font-light leading-relaxed">
            We don't just put art in a box. We engineer micro-environments that shield your cherished pieces from UV damage, humidity, and time itself.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((item) => (
            <motion.div 
               whileHover={{ y: -10 }}
               key={item.title} 
               className="p-10 bg-studio-surface border border-white/5 hover:border-studio-accent/30 transition-all duration-500 group relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    {item.icon}
                </div>
                <div className="w-14 h-14 flex items-center justify-center border border-white/10 mb-10 group-hover:bg-studio-accent transition-all group-hover:rotate-12">
                    <span className="group-hover:text-black text-studio-accent">{item.icon}</span>
                </div>
                <h4 className="font-serif text-2xl mb-4 group-hover:text-studio-accent transition-colors">{item.title}</h4>
                <p className="text-xs leading-loose text-studio-text/40 group-hover:text-studio-text/80 transition-colors uppercase tracking-wider">{item.desc}</p>
            </motion.div>
            ))}
        </div>
      </section>

      {/* 3D Process Grid */}
      <section id="process" className="py-40 px-10 md:px-20 bg-studio-surface/50">
        <h3 className="font-serif text-5xl md:text-8xl text-center mb-32">The Artisan Lifecycle</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {PROCESS_STEPS.map((step) => (
                <div key={step.step} className="three-d-card p-12 bg-studio-bg border border-white/5 space-y-8 relative overflow-hidden shadow-2xl">
                    <div className="text-studio-accent text-8xl font-serif opacity-5 absolute -top-10 -right-5 scale-150 rotate-12">{step.step}</div>
                    <span className="text-studio-accent font-mono text-sm tracking-tighter block">{step.step}</span>
                    <h4 className="font-serif text-3xl italic">{step.title}</h4>
                    <p className="text-studio-text/60 text-sm leading-relaxed font-light">{step.desc}</p>
                    <div className="h-1 w-0 bg-studio-accent transition-all group-hover:w-full" />
                </div>
            ))}
        </div>
      </section>

      {/* Philosophy Callout */}
      <section id="philosophy" className="py-40 px-10 md:px-20 bg-white text-black relative z-10">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
                <div className="space-y-4">
                    <Zap className="w-10 h-10 text-studio-accent" />
                    <h3 className="font-serif text-6xl md:text-8xl">Why Balaji?</h3>
                </div>
                <div className="space-y-8 text-xl leading-relaxed font-light">
                    <p>Since our inception in <span className="font-bold underline decoration-studio-accent decoration-4">2011</span>, we have framed over 40,000 distinct memories. We are not a factory; we are a studio.</p>
                    <p>Each corner is hand-cut. Each mount is acid-free. Each glass pane is conservation-grade. We serve the narrative of the image first, ensuring that when you hang your piece, it commands the room.</p>
                </div>
                <div className="grid grid-cols-2 gap-10 pt-10">
                    <div className="p-10 border border-black/5 flex flex-col gap-4 items-center">
                        <span className="text-xs uppercase font-bold tracking-[3px]">Success rate</span>
                        <span className="text-6xl font-serif">100%</span>
                    </div>
                    <div className="p-10 border border-black/5 flex flex-col gap-4 items-center">
                        <span className="text-xs uppercase font-bold tracking-[3px]">Materials</span>
                        <span className="text-6xl font-serif italic">Pure</span>
                    </div>
                </div>
            </div>
            <div className="aspect-[3/4] bg-studio-bg border-[30px] border-black shadow-2xl overflow-hidden group">
                <div className="w-full h-full bg-studio-accent/10 flex items-center justify-center p-20 text-center">
                    <span className="font-serif italic text-4xl opacity-40 group-hover:scale-110 transition-transform cursor-pointer">Experience the Touch of Wood.</span>
                </div>
            </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section id="portfolio" className="py-40">
        <div className="px-10 md:px-20 mb-20 space-y-6">
           <h2 className="font-serif text-5xl md:text-9xl tracking-tighter italic">Studio Archive.</h2>
           <p className="max-w-xl text-studio-text/40 uppercase text-[10px] tracking-[5px] font-bold">Selected Commissions 2024–2026</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <motion.div 
               key={i} 
               whileHover={{ scale: 0.98 }}
               className="aspect-square bg-studio-surface border-[1px] border-white/5 group relative overflow-hidden cursor-crosshair"
            >
              <div className="absolute inset-0 bg-studio-accent/0 group-hover:bg-studio-accent/10 transition-colors duration-700" />
              <div className="w-full h-full flex items-center justify-center text-white/5 uppercase tracking-[5px] text-[10px] group-hover:text-studio-accent transition-all">
                Gallery Piece {i}
              </div>
              <div className="absolute bottom-10 left-10 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                  <h5 className="font-serif text-2xl italic">Masterpiece {i + 100}</h5>
                  <span className="text-[10px] uppercase font-bold tracking-[2px]">Custom Walnut • UV Glass</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-40 px-10 md:px-20 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-20">
            <h3 className="font-serif text-5xl text-center">Curated Inquiries</h3>
            <div className="space-y-12">
                {FAQS.map(faq => (
                    <div key={faq.q} className="group border-b border-white/5 pb-10 space-y-6 cursor-help">
                        <div className="flex justify-between items-center gap-10">
                            <h4 className="font-serif text-3xl group-hover:text-studio-accent transition-colors">{faq.q}</h4>
                            <ChevronRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
                        </div>
                        <p className="text-studio-text/50 max-w-2xl text-lg hidden group-hover:block transition-all animate-in fade-in slide-in-from-top-4">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Our Story / Heritage */}
      <section id="story" className="py-40 px-10 md:px-20 grid lg:grid-cols-2 gap-20">
         <div className="space-y-12">
             <h2 className="font-serif text-6xl md:text-8xl leading-[0.9]">The Heritage of <br/> <span className="italic text-studio-accent">Balaji.</span></h2>
             <div className="space-y-8 text-studio-text/50 text-xl font-light leading-loose">
                 <p>In 2011, we laid the first corner of what would become a generational institution. Balaji Photo Framing was born from a simple obsession: that every memory deserves a physical temple of wood and glass.</p>
                 <p>Over 15 years later, we continue that tradition in Swastik Complex, serving as the trusted stewards of visual history for families and galleries alike.</p>
             </div>
         </div>
         <div className="flex flex-col justify-end gap-10">
            <div className="p-12 border-l-2 border-studio-accent bg-studio-surface/30 space-y-4">
                <blockquote className="font-serif text-3xl italic opacity-80">"Craft isn't about speed; it's about the silence when the client sees their art framed for the first time."</blockquote>
                <cite className="text-[10px] uppercase font-bold tracking-[3px] opacity-40">— The Founder</cite>
            </div>
         </div>
      </section>

      {/* Large CTA Footer Section */}
      <section id="contact" className="py-40 px-10 md:px-20 bg-studio-accent text-black text-center">
            <h3 className="font-serif text-5xl md:text-9xl mb-12 tracking-tighter">Enter the Studio.</h3>
            <div className="flex flex-wrap justify-center gap-10">
                <a href="tel:+917016339821" className="flex items-center gap-4 text-3xl font-serif italic hover:scale-105 transition-transform">
                    <Phone className="w-8 h-8" />
                    +91 7016339821
                </a>
            </div>
      </section>

      {/* Global Footer */}
      <footer className="py-20 px-10 md:px-20 bg-studio-bg border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          <div className="space-y-8">
            <div className="font-serif text-2xl font-bold tracking-[3px] uppercase">
              BALAJI <span className="text-studio-accent italic font-normal ml-1">Framing</span>
            </div>
            <p className="text-studio-text/30 text-[10px] font-bold uppercase tracking-[2px] leading-relaxed">
              Serving the community with artisanal <br /> precision since 2011.
            </p>
          </div>
          
          <div className="space-y-6">
            <h5 className="text-[10px] font-bold uppercase tracking-[4px] text-studio-accent">Location</h5>
            <p className="text-sm font-bold flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>Busstand Road, Near Khadi Bajar,<br/>Swastik Complex, First Floor</span>
            </p>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] font-bold uppercase tracking-[4px] text-studio-accent">Appointments</h5>
            <p className="text-sm font-bold flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <span>10:00 AM – 08:30 PM (Mon-Sat)</span>
            </p>
          </div>

          <div className="space-y-8 flex flex-col justify-end">
            <div className="flex gap-10 opacity-30">
              <span className="text-[9px] font-bold uppercase tracking-[3px]">Instagram</span>
              <span className="text-[9px] font-bold uppercase tracking-[3px]">Facebook</span>
            </div>
          </div>
        </div>
        <div className="pt-20 text-[9px] font-bold uppercase tracking-[3px] opacity-20 text-center">
            © 2026 BALAJI PHOTO FRAMING • ARCHIVAL QUALITY GUARANTEED
        </div>
      </footer>
    </div>
  );
}
