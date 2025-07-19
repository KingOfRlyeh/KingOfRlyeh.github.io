const termWeight = { Spring: 1, Summer: 2, Fall: 3 };
function parseSortKey(dateStr) {
    const match = dateStr.match(/(Spring|Summer|Fall) (\d{4})/);
    if (!match) return 0;
    const [, term, year] = match;
    return parseInt(year) * 10 + termWeight[term];
}

const courseworkEntries = [
    {
        date: 'Fall 2024',
        sortKey: parseSortKey('Fall 2024'),
        title: 'History of the U.S. (HIST 105)',
        desc: `Survey of American history through Reconstruction, emphasizing political, economic, and social development.`
    },
    {
        date: 'Fall 2024',
        sortKey: parseSortKey('Fall 2024'),
        title: 'Multivariable Calculus (MATH 221)',
        desc: `Vectors, partial derivatives, multiple integrals, and vector calculus.`
    },
    {
        date: 'Fall 2024',
        sortKey: parseSortKey('Fall 2024'),
        title: 'Intro to Performance Studies (PERF 101)',
        desc: `Introduction to performativity and interdisciplinary methods in the study of performance.`
    },
    {
        date: 'Fall 2024',
        sortKey: parseSortKey('Fall 2024'),
        title: 'Freshman Physics Orientation (PHYS 101)',
        desc: `Overview of physics as a field; introduction to research, careers, and academic planning.`
    },
    {
        date: 'Fall 2024',
        sortKey: parseSortKey('Fall 2024'),
        title: 'Intro Programming for Physics (PHYS 150)',
        desc: `Fundamentals of programming using physics examples; focus on computational tools.`
    },
    {
        date: 'Spring 2025',
        sortKey: parseSortKey('Spring 2025'),
        title: 'Observational Astronomy (ASTR 102)',
        desc: `Hands-on introduction to telescopic observation and celestial measurements.`
    },
    {
        date: 'Spring 2025',
        sortKey: parseSortKey('Spring 2025'),
        title: 'Program Design & Concepts (CSCE 102)',
        desc: `Foundations of software development in C++, with emphasis on modular design.`
    },
    {
        date: 'Spring 2025',
        sortKey: parseSortKey('Spring 2025'),
        title: 'Linear Algebra (MATH 304)',
        desc: `Matrix operations, vector spaces, eigenvalues, and linear transformations.`
    },
    {
        date: 'Spring 2025',
        sortKey: parseSortKey('Spring 2025'),
        title: 'Differential Equations (MATH 308)',
        desc: `First- and second-order ODEs, systems of equations, Laplace transforms.`
    },
    {
        date: 'Spring 2025',
        sortKey: parseSortKey('Spring 2025'),
        title: 'Optics & Thermal Physics (PHYS 221)',
        desc: `Geometrical and physical optics, heat, and thermodynamics.`
    },
    {
        date: 'Summer 2025',
        sortKey: parseSortKey('Summer 2025'),
        title: 'Theory of Partial Differential Equations (MATH 412)',
        desc: `Analytical techniques for solving PDEs in physics and engineering.`
    },
    {
        date: 'Summer 2025',
        title: 'Undergraduate Research (PHYS 291)',
        subtitle: 'Computational High Energy and Condensed Matter Physics',
        desc: `Faculty-supervised research experience in computational physics (see "Undergraduate Researcher").`
    },
    {
        date: 'Fall 2025',
        title: 'Foundations of Mathematics (MATH 300)',
        desc: `Logic, set theory, and proof techniques; introduction to rigorous mathematics.`
    },
    {
        date: 'Fall 2025',
        title: 'Mathematical Probability (MATH 411)',
        desc: `Probability theory including random variables, distributions, and expectations.`
    },
    {
        date: 'Fall 2025',
        title: 'Tensors and General Relativity (MATH 460)',
        desc: `Tensor calculus and Einstein's theory of gravitation.`
    },
    {
        date: 'Fall 2025',
        title: 'Contemporary Moral Issues (PHIL 111)',
        desc: `Critical thinking on moral problems in modern society.`
    },
    {
        date: 'Fall 2025',
        title: 'State & Local Government (POLS 207)',
        desc: `Government structure and policy at the state and local levels in the U.S.`
    }
];

function CourseworkColumn() {
    const [sortNewest, setSortNewest] = useState(true); // default to newest
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('courseworkSort');
        if (saved === null) {
            setSortNewest(true); // force default to newest
            localStorage.setItem('courseworkSort', 'true');
        } else {
            setSortNewest(saved === 'true');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('courseworkSort', sortNewest);
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

    const sorted = [...courseworkEntries].sort((a, b) =>
        sortNewest ? b.sortKey - a.sortKey : a.sortKey - b.sortKey
    );

    // Group entries by semester
    const grouped = sorted.reduce((acc, entry) => {
        if (!acc[entry.date]) acc[entry.date] = [];
        acc[entry.date].push(entry);
        return acc;
    }, {});

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#542437]">Coursework</h2>
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
            <div className="relative pl-8">
                {/* Timeline vertical line */}
                <div className="absolute top-0 left-3 w-0.5 h-full bg-[#e0c9a6] z-0" />
                <AnimatePresence initial={false}>
                {Object.entries(grouped).map(([semester, courses], idx) => (
                    <motion.div
                        key={semester}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.35, type: 'spring', bounce: 0.2 }}
                        className="relative mb-10"
                    >
                        {/* Timeline dot */}
                        <div className="absolute -left-1.5 top-2 w-4 h-4 bg-[#542437] rounded-full border-4 border-[#f4e9dc] z-10" />
                        <div className="ml-6">
                            <div className="font-bold text-lg text-[#542437] mb-2">{semester}</div>
                            <div className="space-y-4">
                                <AnimatePresence initial={false}>
                                {courses.map((entry) => (
                                    <motion.div
                                        layout
                                        key={entry.title}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.25 }}
                                        className="bg-white rounded-lg shadow-md p-4"
                                    >
                                        <h4 className="text-lg font-bold">{entry.title}</h4>
                                        {entry.subtitle && (
                                            <div className="text-xs text-[#8b5e3c] italic mb-1">{entry.subtitle}</div>
                                        )}
                                        <p className="text-sm text-[#444]">{entry.desc}</p>
                                    </motion.div>
                                ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
            </div>
        </section>
    );

}

export default CourseworkColumn;
