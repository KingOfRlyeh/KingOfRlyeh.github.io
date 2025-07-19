import { useEffect, useState } from 'react';

const extracurricularEntries = [
    { date: 'Fall 2024 – Present', title: 'CDMS Research Assistant', desc: 'Simulating particle interactions in germanium crystals using Geant4.' },
    { date: 'Summer 2024', title: 'Metal Radio Host (KANM)', desc: 'Weekly show on metal history and interviews.' },
    { date: 'Fall 2023 – Spring 2024', title: 'Undergraduate TA', desc: 'Assisted in grading and tutoring for Classical Mechanics.' }
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
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 200); // 200ms linger
    };

    const sorted = [...extracurricularEntries].sort((a, b) =>
        sortNewest ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
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
                >
                    Sort: {sortNewest ? 'Newest' : 'Oldest'}
                </button>
            </div>
            {sorted.map((entry) => (
                <div className="bg-white rounded-lg shadow-md p-4 mb-4" key={entry.title}>
                    <h3 className="text-sm text-[#8b5e3c] mb-1">{entry.date}</h3>
                    <h4 className="text-lg font-bold">{entry.title}</h4>
                    <p className="text-sm text-[#444]">{entry.desc}</p>
                </div>
            ))}
        </section>
    );
}
