export default function ProductPage() {
  return (
    <div className="w-[350px] p-6">
      <h1 className="text-2xl font-bold">Amazon Helper</h1>

      <div className="mt-4 rounded-lg border p-4">
        <h2 className="font-semibold">Product Name</h2>
        <p className="mt-2 text-lg">$299.99</p>
        <p className="mt-1">⭐ 4.7</p>
      </div>

      <button className="mt-4 w-full rounded-lg bg-black p-3 text-white">
        Analyze Product
      </button>
    </div>
  );
}
