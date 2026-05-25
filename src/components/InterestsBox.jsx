export default function InterestsBox() {
  return (
    <div className="bg-white border border-[#e0c9a6] rounded-xl shadow p-6 mb-8">
      <h2 className="text-2xl font-bold text-[#8b5e3c] mb-4">Interests</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Philosophy of technology: what technology <em>is</em>, not just what it does or how it is developed</li>
        <li>Formal systems and their limits: category theory, Gödel, Wittgenstein, and what breaks down at the edges</li>
        <li>Partial differential equations and scattering theory</li>
        <li>Music composition — metal and classical</li>
      </ul>
    </div>
  );
}
