import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12 w-full max-w-5xl mx-auto py-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-6">About PureClean</h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          At PureClean, we believe that a clean environment is the foundation of a healthy life. For over a decade, we have been at the forefront of providing elite hygiene solutions to both residential and commercial spaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="h-80 bg-teal-100 rounded-3xl overflow-hidden relative shadow-md flex items-center justify-center">
           <div className="absolute inset-0 bg-gradient-to-tr from-teal-300 to-indigo-200 opacity-80"></div>
           <div className="relative z-10 w-32 h-32 bg-white/30 backdrop-blur-md rounded-full border border-white/40 flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
           </div>
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-slate-800">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            Our mission is to democratize access to professional-grade cleaning supplies. We meticulously formulate our products using advanced research to ensure they are tough on dirt and germs but safe for your family and the environment.
          </p>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-3 text-slate-700">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              99.9% Germ Kill Guarantee
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              Eco-Friendly Formulations
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              Cruelty-Free Testing
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 mt-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Why Choose PureClean?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-black text-teal-600 mb-2">10k+</div>
            <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Businesses Trust Us</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-teal-600 mb-2">1M+</div>
            <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Homes Cleaned</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-teal-600 mb-2">50+</div>
            <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Product Variants</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-teal-600 mb-2">100%</div>
            <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Quality Assured</div>
          </div>
        </div>
      </div>
    </div>
  );
}
