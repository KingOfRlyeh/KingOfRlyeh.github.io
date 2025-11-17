import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "Personal Website",
    desc: "A creative portfolio and CV built with Astro, React, and Tailwind.",
    img: "/images/personal-site-thumb.png",
    expanded: (
      <>
        <img src="/images/personal-site-demo.gif" alt="Personal Website Demo" className="mx-auto mb-4 rounded-lg max-h-64" />
        <p>This site is built with Astro, React, and Tailwind CSS. It features a custom animated project gallery, a CV, and creative UI/UX experiments.</p>
        <ul className="list-disc list-inside mt-2 text-left">
          <li>Astro for static site generation</li>
          <li>React for interactive components</li>
          <li>Tailwind CSS for rapid styling</li>
        </ul>
      </>
    ),
  },
  {
    title: "CDMS Research",
    desc: "Exploring the frontier of solid state dark matter detectors",
    img: "/images/cdms-research-thumb.jpg",
    expanded: (
      <>
        <img src="/images/cdms-research-demo.gif" alt="CDMS Research Demo" className="mx-auto mb-4 rounded-lg max-h-64" />
        <p>I'm a part of the SuperCDMS research collaboration, through SLAC and Texas A&M.</p>
        <p>I'm currently working on tuning parameters for a thing called "Intervalley Scattering" that goes on in Si and Ge based detectors.</p>
        <p>There are a couple models of this phenomenon that the collaboration uses for simulation, and I'm trying to figure out which one best matches the empirical data, as well as the theory.</p>
      </>
    ),
  },
  {
    title: "RTI Simulator",
    desc: "A compact simulation of Rayleigh-Taylor Instability in 2D",
    img: "/images/RT-thumb.png",
    expanded: (
      <>
        <img src="/images/RT-demo.gif" alt="Rayleigh-Taylor instability demo" className="mx-auto mb-4 rounded-lg max-h-64" />
        <p>In this project, I and two friends made a simple simulation and visualization of the Rayleigh-Taylor instability using grid discretization and time-stepping methods.</p>
        <p>This was created as a final to our freshman Intro to Physics Programming class. Yes, this is very over the top, but we were bored the whole semester and wanted a challenge that wasn't "simulate a bouncing ball".</p>
      </>
    ),
  },

  {
    title: "A Computational Model of Influencer Sociodynamics",
    desc: "A mathematical model of the effect of influencers on social trends in multi-layer networks",
    img: "/images/Influencernetwork-socialmedia.png",
    github: "https://github.com/KingOfRlyeh/Influencer-Dynamics/tree/main",
    expanded: (
      <>
        <img src="/images/figure_saved_20251117_115258" alt="'Fashion space' magnitude over time" className="mx-auto mb-4 rounded-lg max-h-64" />
        <p>I created a mathematical model of the effect of influencers on self-representation(fashion) and conformity in multiple different layers via a multilayer network.</p>
      </>
    ),
  },

  {
    title: "Other projects",
    desc: "Some projects I've created aren't really big enough to be deserving of a showcase here. Check out my GitHub for more!",
    github: "https://github.com/kingofrlyeh",
    // No 'expanded' property needed anymore
  }
];

export default function ProjectGallery() {
  const [expanded, setExpanded] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (expanded === null) return;
    function onKey(e) {
      if (e.key === "Escape") setExpanded(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  // Animation variants for cards
  const quarterCircleEase = [0.77, 0, 0.175, 1];
  const cardVariants = {
    hidden: (i) => ({
      opacity: 0,
      x: i % 2 === 0 ? -120 : 120,
      scale: 0.92,
    }),
    visible: (i) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        x: { type: 'tween', duration: 0.18, ease: quarterCircleEase },
        opacity: { duration: 0.09, ease: 'linear' },
        scale: { type: 'tween', duration: 0.18, ease: quarterCircleEase },
      },
    }),
    exit: (i) => ({
      opacity: 0,
      x: i % 2 === 0 ? 120 : -120,
      scale: 0.92,
      transition: { type: 'tween', duration: 0.12, ease: quarterCircleEase },
    }),
  };

  return (
    <>
      {/* Only render cards after hydration is complete */}
      {mounted && (
        <motion.div
          className="flex flex-col gap-6 items-center w-full"
          initial="hidden"
          animate="visible"
          variants={{}}
        >
          <AnimatePresence>
            {projects.map((proj, i) =>
              proj.github ? (
                <motion.a
                  key={i}
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xl bg-white border border-[#e0c9a6] rounded-xl shadow p-6 text-center cursor-pointer relative overflow-hidden group transition-transform"
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: 'tween', duration: 0.10, ease: 'linear' }}
                  whileHover={{
                    y: -10,
                    scale: 1.04
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  layout
                >
                  <div className="flex flex-row items-center justify-between w-full mb-2" style={{minHeight: '2.5rem'}}>
                    <motion.h2
                      className="text-2xl font-bold text-[#542437] flex items-center justify-start gap-2"
                      layout
                    >
                      {proj.title}
                    </motion.h2>
                    <span className="text-[#e0c9a6] text-lg opacity-60 group-hover:opacity-100 transition-opacity select-none pointer-events-none whitespace-nowrap bg-white bg-opacity-80 px-2 rounded ml-4">
                      Visit GitHub
                    </span>
                  </div>
                  {proj.img && (
                    <img
                      src={proj.img}
                      alt={proj.title + " preview"}
                      className="mx-auto mb-3 rounded-lg max-h-40 object-contain"
                      loading="lazy"
                    />
                  )}
                  <motion.p className="text-[#444]" layout>{proj.desc}</motion.p>
                </motion.a>
              ) : (
                <motion.div
                  key={i}
                  className="w-full max-w-xl bg-white border border-[#e0c9a6] rounded-xl shadow p-6 text-center cursor-pointer relative overflow-hidden group"
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: 'tween', duration: 0.10, ease: 'linear' }}
                  whileHover={{
                    y: -10,
                    scale: 1.04
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  // Add a Tailwind shadow class for hover effect
                  whileHoverClassName="shadow-2xl shadow-[#e0c9a6cc] ring-4 ring-[#e0c9a6]"
                  onClick={() => setExpanded(i)}
                  style={{ zIndex: expanded === i ? 10 : 1 }}
                  layout
                >
                  <div className="flex flex-row items-center justify-between w-full mb-2" style={{minHeight: '2.5rem'}}>
                    <motion.h2
                      className="text-2xl font-bold text-[#542437] flex items-center justify-start gap-2"
                      layout
                    >
                      {proj.title}
                    </motion.h2>
                    <span className="text-[#e0c9a6] text-lg opacity-90 group-hover:opacity-100 transition-opacity select-none pointer-events-none whitespace-nowrap bg-white bg-opacity-80 px-2 rounded ml-4">
                      Click to expand
                    </span>
                  </div>
                  {proj.img && (
                    <img
                      src={proj.img}
                      alt={proj.title + " preview"}
                      className="mx-auto mb-3 rounded-lg max-h-40 object-contain"
                      loading="lazy"
                    />
                  )}
                  <motion.p className="text-[#444]" layout>{proj.desc}</motion.p>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </motion.div>
      )}
      <AnimatePresence>
        {expanded !== null && (
          <>
            {/* Vignette overlay */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{
                background: 'rgba(34, 24, 16, 0.32)',
                backdropFilter: 'blur(1px)',
                pointerEvents: 'auto',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpanded(null)}
            />
            {/* Enlarged card modal */}
            <motion.div
              className="fixed left-1/2 top-1/2 z-50 flex flex-col items-center justify-center"
              style={{
                transform: 'translate(-50%, -50%)',
                width: 'min(96vw, 700px)',
                maxHeight: '90vh',
                borderRadius: 32,
                boxShadow: '0 16px 64px #0008, 0 0 0 6px #e0c9a6',
                background: 'white',
                padding: '2.5rem',
                border: '3px solid #e0c9a6',
                overflowY: 'auto',
              }}
              initial={{ opacity: 0, scale: 0.92, x: '-50%', y: '-50%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.92, x: '-50%', y: '-50%' }}
              transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
              layout
            >
              <button
                className="absolute right-6 top-6 text-3xl text-[#e0c9a6] hover:text-[#ffb347] font-bold bg-transparent border-none cursor-pointer z-10"
                onClick={() => setExpanded(null)}
                aria-label="Close expanded project"
                tabIndex={0}
              >
                &times;
              </button>
              <h2 className="text-3xl font-bold text-[#542437] mb-4 text-center">{projects[expanded].title}</h2>
              <div className="text-[#444] text-lg mb-4 text-center">
                {projects[expanded].expanded || projects[expanded].desc}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
