export default function ReviewCard({ title, desc, img, type }) {
  return (
    <div className="w-full max-w-xl bg-white border border-[#e0c9a6] rounded-xl shadow p-6 text-center hover:shadow-lg transition">
      {img && (
        <img src={img} alt={title + ' cover'} className="mx-auto mb-3 rounded-lg max-h-40 object-cover" loading="lazy" />
      )}
      <div className="mb-2 text-xs uppercase text-[#e0c9a6]">{type}</div>
      <h2 className="text-xl font-bold text-[#542437] mb-2">{title}</h2>
      <p className="text-[#444]">{desc}</p>
    </div>
  );
}
