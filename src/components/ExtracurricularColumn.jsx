
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const termWeight = { Spring: 1, Summer: 2, Fall: 3 };
function parseSortKey(dateStr) {
    // Handles formats like 'Spring 2025 – Present', 'Fall 2024 - Present', etc.
    const match = dateStr.match(/(Spring|Summer|Fall) (\d{4})/);
    if (!match) return 0;
    const [, term, year] = match;
    return parseInt(year) * 10 + termWeight[term];
}

const extracurricularEntries = [
    {
        date: 'Summer 2024 – Present',
        sortKey: parseSortKey('Summer 2024'),
        title: 'Undergraduate Researcher',
        subtitle: 'SuperCDMS Collaboration, Texas A&M University',
        desc: `Developed and validated computational models of charge and phonon transport in germanium and silicon detectors for the SuperCDMS dark matter experiment. Compared phenomenological and first-principles models of intervalley scattering using G4CMP simulations and experimental electron drift data. Used a first-of-its-kind multiple-parameter tuning script to optimize simulation values to match experimental analysis, supporting improved detector design and rare event searches.\n\nGained hands-on experience with ROOT, Slurm, HPC computing, Geant4, and SuperSim, as well as advanced data analysis and scientific computing workflows.`
    },
    {
        date: 'Fall 2024 - Present',
        sortKey: parseSortKey('Fall 2024'),
        title: 'Radio Host (KANM)',
        desc: `Weekly show on metal history featuring album reviews, concert reviews, and artist interviews.\nVoted best DJ Spring 2025 by fellow radio members.`
    },
    {
        date: 'Spring 2025 – Present',
        sortKey: parseSortKey('Spring 2025'),
        title: 'Broadcast Engineer (KANM)',
        desc: `Responsible for engineering and maintaining complete audio signal chains from microphone input to streaming server output. Duties include live broadcast support, equipment setup and troubleshooting, digital and analog signal routing, audio recording and mixing, and facilitating live concert events. 
        Work spans both technical infrastructure and creative audio production for radio programming.`
    }
];

export default function ExtracurricularColumn() {
    const [sortNewest, setSortNewest] = useState(true); // default to newest
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('extracurricularSort');
        if (saved !== null) setSortNewest(saved === 'true');
    }, []);

    useEffect(() => {
        localStorage.setItem('extracurricularSort', sortNewest);
    }, [sortNewest]);

    const handleClick = () => {
        setSortNewest((prev) => !prev);
    };
    const handleMouseDown = () => {
        setIsClicked(true);
        if (handleMouseDown.timeout) clearTimeout(handleMouseDown.timeout);
    };
    const handleMouseUpOrLeave = () => {
        handleMouseDown.timeout = setTimeout(() => setIsClicked(false), 100);
    };

    const sorted = [...extracurricularEntries].sort((a, b) =>
        sortNewest ? b.sortKey - a.sortKey : a.sortKey - b.sortKey
    );

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#542437]">Research & Extracurriculars</h2>
                <button
                    className={
                        "text-sm text-[#8b5e3c] underline cursor-pointer transition rounded px-2 py-1 " +
                        (isClicked
                            ? "bg-[#e0c9a6] text-[#222]"
                            : "hover:bg-[#f4e9dc] hover:text-[#542437]")
                    }
                    onClick={handleClick}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                >
                    Sort: {sortNewest ? 'Newest' : 'Oldest'}
                </button>
            </div>
            <AnimatePresence initial={false}>
                {sorted.map((entry) => (
                    <motion.div
                        layout
                        key={entry.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.35, type: 'spring', bounce: 0.2 }}
                        className="bg-white rounded-lg shadow-md p-4 mb-4"
                    >
                        <h3 className="text-sm text-[#8b5e3c] mb-1">{entry.date}</h3>
                        <h4 className="text-lg font-bold">{entry.title}</h4>
                        {entry.title === 'Undergraduate Researcher' && entry.subtitle && (
                            <div className="text-xs text-[#8b5e3c] italic mb-1">{entry.subtitle}</div>
                        )}
                        {entry.title === 'Undergraduate Researcher' && entry.desc.includes('\n\n')
                            ? entry.desc.split(/\n\n+/).map((para, i) => (
                                <p className="text-sm text-[#444] mb-2 last:mb-0" key={i}>{para}</p>
                              ))
                            : <p className="text-sm text-[#444]">{entry.desc}</p>
                        }
                    </motion.div>
                ))}
            </AnimatePresence>
        </section>
    );
}
