export function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/photos/wildlife/Website-11.jpg"
          alt="Wildlife bird photography"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl mb-6">Capturing Life's Moments</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Professional photography for wildlife, portraits, and more
        </p>
        <button 
          onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          View Portfolio
        </button>
      </div>
    </section>
  );
}