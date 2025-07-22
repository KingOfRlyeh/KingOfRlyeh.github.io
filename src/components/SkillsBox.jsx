export default function SkillsBox() {
  return (
    <div className="bg-white border border-[#e0c9a6] rounded-xl shadow p-6 mb-8">
      <h2 className="text-2xl font-bold text-[#8b5e3c] mb-4">Skills</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Python, C++, Java, Bash</li>
        <li>High-Performance Computing (HPC), Slurm</li>
        <li>Git, Linux</li>
        <li>Scientific Computing: Geant4, NumPy, Matplotlib, Librosa</li>
        <li>Audio Production (Reaper, mixing, editing)</li>
      </ul>
    </div>
  );
}
