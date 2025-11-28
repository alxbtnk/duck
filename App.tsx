import React, { useState, useEffect } from 'react';
import ComicPanel from './components/ComicPanel';
import DuckifyWidget from './components/DuckifyWidget';
import AssetLoader from './components/AssetLoader';
import DeploymentGuide from './components/DeploymentGuide';
import { loadImageFromDB, loadAllKeys } from './services/persistenceService';

// Initial placeholders
const INITIAL_IMAGES = {
  "hero": "https://i.postimg.cc/gknKFwmc/Gemini_Generated_Image_v1i4ezv1i4ezv1i4.png",
  "egg_single": "https://i.postimg.cc/RCPTD1rj/Gemini_Generated_Image_lwotyllwotyllwot.png",
  "origin_strip": "https://i.postimg.cc/BZhCV599/Gemini_Generated_Image_f1eq9wf1eq9wf1eq.png",
  "evolution_strip": "https://i.postimg.cc/28VxRqr1/Gemini_Generated_Image_vw7fo5vw7fo5vw7f.png",
  "neighborhood": "https://i.postimg.cc/HWSth0DG/Gemini_Generated_Image_j1fysej1fysej1fy.png",
  "infection_grid": "https://i.postimg.cc/NFP72t7k/Gemini_Generated_Image_j376n5j376n5j376.png",
  "crypto_grid": "https://i.postimg.cc/Y2XxsNKt/Gemini_Generated_Image_p0yfcwp0yfcwp0yf.png",
  "final_fullbody": "https://i.postimg.cc/gknKFwmc/Gemini_Generated_Image_v1i4ezv1i4ezv1i4.png"
};


// Character prompts for the gallery to show diversity
const INFECTED_CHARACTERS = [
  "grumpy old grandma with curly grey hair",
  "punk rocker with green mohawk and piercings",
  "overworked corporate businessman in suit",
  "tired fast food worker in uniform",
  "scruffy biker with beard",
  "goth girl with dark makeup",
  "confused police officer",
  "nerdy gamer with headset",
  "gym bro with tank top",
  "hip hop artist with gold chains",
  "suburban dad with grill apron",
  "cat with human clothes"
];

const App: React.FC = () => {
  const [images, setImages] = useState(INITIAL_IMAGES);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved images from DB on mount
  useEffect(() => {
    const restoreImages = async () => {
      const keys = await loadAllKeys();
      if (keys.length > 0) {
        const loadedImages: Record<string, string> = {};
        for (const key of keys) {
           const url = await loadImageFromDB(key);
           if (url) {
             loadedImages[key] = url;
           }
        }
        setImages(prev => ({ ...prev, ...loadedImages }));
      }
      setIsLoaded(true);
    };

    restoreImages();
  }, []);

  const handleAssetUpdate = (key: string, url: string) => {
    setImages(prev => ({
      ...prev,
      [key]: url
    }));
  };

  if (!isLoaded) {
      return <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center font-comic text-2xl">LOADING DUCKS...</div>;
  }

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden selection:bg-yellow-300 text-black">
      
      <AssetLoader assets={images} onAssetUpdate={handleAssetUpdate} />
      <DeploymentGuide assets={images} onUpdateAsset={handleAssetUpdate} />

      {/* Sticky Header / Nav */}
      <nav className="sticky top-0 z-50 bg-[#f4f1ea] border-b-4 border-black px-4 py-2 flex justify-between items-center shadow-md">
        <h1 className="font-comic text-2xl md:text-3xl tracking-tighter text-black">$DUCKHAT</h1>
        <button className="btn-primary text-sm px-4 py-1 font-bold">Buy Now</button>
      </nav>

      <main className="container mx-auto px-4 md:px-8 max-w-5xl">

        {/* --- HERO SECTION --- */}
        <section className="py-12 md:py-20 flex flex-col items-center">
          <div className="comic-panel p-6 w-full max-w-4xl bg-[#fdfbf7] relative">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 relative order-2 md:order-1">
                <h2 className="font-comic text-6xl md:text-8xl leading-none mb-2 text-black drop-shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
                  DUCK<br/>HAT
                </h2>
                <div className="bg-black text-yellow-400 font-mono inline-block px-2 py-1 transform -rotate-2 text-xl mb-4 text-black">
                  $DUCKHAT
                </div>
                <p className="font-mono text-lg mb-6 leading-tight text-black">
                  Upload your head.<br/>Get a duck.<br/>Join the flock.
                </p>
                <div className="flex flex-col gap-3">
                  <button className="btn-primary px-8 py-3 text-xl w-full md:w-auto transform -rotate-1 text-black">
                    BUY $DUCKHAT
                  </button>
                  <a href="#duckify" className="btn-primary px-8 py-3 text-xl w-full md:w-auto bg-white hover:bg-gray-100 transform rotate-1 text-center text-black">
                    🦆 DUCKIFY ME
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                {/* Hero Image Holder */}
                <div className="border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-gray-200 aspect-[4/5] overflow-hidden relative">
                    <img src={images.hero} alt="Boy with duck hat" className="w-full h-full object-cover grayscale-[10%] contrast-110" />
                </div>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -top-6 -right-6 md:-right-12 hidden md:block">
              <svg width="150" height="100" viewBox="0 0 200 150" className="drop-shadow-lg">
                <path d="M10,75 Q20,10 90,10 T180,50 Q190,120 100,130 T20,100 L50,110 Z" fill="white" stroke="black" strokeWidth="3" />
                <text x="100" y="70" textAnchor="middle" fontFamily="Permanent Marker" fontSize="20" fill="black">QUACK?</text>
              </svg>
            </div>
          </div>
        </section>

        {/* --- ORIGIN STORY --- */}
        <section className="py-12 space-y-8">
          <h2 className="font-comic text-4xl text-center mb-8 bg-black text-white inline-block px-4 py-2 transform -rotate-1 mx-auto block w-max">
            THE ORIGIN
          </h2>
          
          <div className="grid grid-cols-1 gap-8">
             {/* Single Panel Setup */}
             <div className="max-w-2xl mx-auto w-full">
                <ComicPanel 
                    imageSrc={images.egg_single} 
                    altText="Egg falling on head" 
                    caption="One day, a very confused egg met a very soft head." 
                />
             </div>

             {/* 5-Panel Strip */}
             <div className="w-full">
                 <ComicPanel 
                    imageSrc={images.origin_strip} 
                    altText="Full Origin Sequence" 
                    caption="Someone decided this was prime real estate." 
                    className="transform rotate-1"
                />
             </div>
          </div>
        </section>

        {/* --- EVOLUTION --- */}
        <section className="py-16">
          <div className="comic-panel p-4 md:p-8 bg-yellow-50">
            <h3 className="font-comic text-2xl mb-6 text-center underline decoration-wavy decoration-yellow-400 text-black">THE EVOLUTION</h3>
            <div className="flex flex-col items-center">
              {/* 3-Panel Strip Container */}
              <img src={images.evolution_strip} alt="Evolution Strip" className="w-full border-2 border-black shadow-sm" />
            </div>
            <p className="text-center font-comic mt-4 text-sm bg-white border border-black inline-block px-4 py-1 ml-auto mr-auto shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-black">
              From duck-hat to duck-head in three easy steps.
            </p>
          </div>
        </section>

        {/* --- NEIGHBORHOOD --- */}
        <section className="py-12">
          <ComicPanel 
            imageSrc={images.neighborhood} 
            altText="Boy scratching head with duck" 
            caption="First they laugh. Then they copy."
            className="transform -rotate-1 max-w-3xl mx-auto"
          />
        </section>

        {/* --- INFECTION GRID --- */}
        <section className="py-12">
           <h2 className="font-comic text-3xl text-center mb-8 bg-yellow-400 border-2 border-black inline-block px-4 py-1 mx-auto block w-max transform rotate-1 text-black">
               THE SPREAD
           </h2>
           <div className="max-w-4xl mx-auto">
               <ComicPanel 
                 imageSrc={images.infection_grid} 
                 altText="The Infection Spread Comic" 
                 caption="One degen. Infinite copy trade." 
               />
           </div>
        </section>

        {/* --- MAIN FEATURE: DUCKIFY --- */}
        <section id="duckify" className="py-20 scroll-mt-20">
          <div className="text-center mb-8">
            <h2 className="font-comic text-5xl bg-yellow-400 border-4 border-black inline-block px-6 py-2 shadow-[8px_8px_0_0_#000] text-black">
              DUCKIFY YOUR HEAD
            </h2>
            <p className="font-mono mt-4 max-w-lg mx-auto text-black">
              Our Nano Banana Pro pipeline redraws your boring human face into a 90s grunge masterpiece with a duck on top.
            </p>
          </div>

          <DuckifyWidget />

          <div className="flex justify-center gap-4 mt-8 flex-wrap">
             {['Businessman', 'Gamer', 'Ape', 'Grandma'].map((type) => (
               <div key={type} className="w-20 h-20 border-2 border-black bg-white flex items-center justify-center text-xs font-mono transform hover:scale-110 transition-transform cursor-help text-black" title={`Duckified ${type}`}>
                 {type}
               </div>
             ))}
          </div>
        </section>

        {/* --- CRYPTO ANGLE --- */}
        <section className="py-16">
          <h2 className="font-comic text-3xl text-center mb-6 text-black">THE LIFE CYCLE</h2>
          <div className="max-w-4xl mx-auto">
            <ComicPanel 
                imageSrc={images.crypto_grid} 
                altText="Crypto Life Cycle Comic" 
                caption="We’re not promising to fix this. We’re just honest about it."
                className="transform rotate-1"
            />
           </div>
        </section>

        {/* --- TOKEN & UTILITY --- */}
        <section className="py-12">
          <div className="comic-panel p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-comic text-2xl mb-4 border-b-4 border-yellow-400 inline-block text-black">WHAT $DUCKHAT DOES</h3>
                <ul className="font-mono space-y-4 list-disc pl-5 text-black">
                  <li>On-chain cult of duck-heads.</li>
                  <li>Access to the DUCKIFY generator.</li>
                  <li>Exclusive roles for duck-pfp holders.</li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-red-100 opacity-50 transform scale-105 rotate-1 z-0 pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="font-comic text-2xl mb-4 border-b-4 border-red-400 inline-block text-black">WHAT IT DOES NOT DO</h3>
                  <ul className="font-mono space-y-4 list-disc pl-5 text-black">
                    <li>No serious roadmap.</li>
                    <li>No fake utility.</li>
                    <li>Just memes, ducks and chaotic vibes.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- COMMUNITY GALLERY --- */}
        <section className="py-16">
          <h2 className="font-comic text-4xl text-center mb-2 text-black">THE INFECTED</h2>
          <p className="text-center font-mono mb-8 text-sm text-black">They uploaded. They quacked. They stayed.</p>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {INFECTED_CHARACTERS.map((charDesc, i) => {
              // Construct a unique prompt-based URL for each character
              const prompt = encodeURIComponent(`Portrait of a ${charDesc} in gritty 1990s adult animated cartoon style, bold black outlines, beige texture, flat dirty colors. IMPORTANT: A bright yellow rubber duck sitting on their head.`);
              const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=400&height=400&nologo=true&seed=${i + 100}`;
              
              return (
                <div key={i} className="aspect-square border-2 border-black bg-white overflow-hidden hover:opacity-75 transition-opacity relative group">
                  <img 
                    src={imageUrl} 
                    alt={`Duckified ${charDesc}`} 
                    className="w-full h-full object-cover grayscale-[20%] contrast-125"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] p-1 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    {charDesc}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="py-20 mb-20">
          <div className="relative flex justify-center items-center">
             {/* Full Body Duck Man */}
            <div className="w-full max-w-md bg-white border-4 border-black p-4 transform -rotate-2 shadow-[16px_16px_0_0_rgba(0,0,0,0.15)]">
                <img src={images.final_fullbody} alt="Join us" className="w-full h-auto grayscale-[5%]" />
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10 pointer-events-none">
              <div className="bg-white border-4 border-black p-6 md:p-12 shadow-[12px_12px_0_0_#ffdb00] transform rotate-2 max-w-2xl mt-64 md:mt-0 pointer-events-auto">
                <h2 className="font-comic text-4xl md:text-6xl mb-6 text-black">WANNA BE NEXT?</h2>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button className="btn-primary py-4 px-8 text-2xl font-bold bg-white hover:bg-gray-100 text-black">
                    BUY $DUCKHAT
                  </button>
                  <button 
                    onClick={() => document.getElementById('duckify')?.scrollIntoView({behavior: 'smooth'})}
                    className="btn-primary py-4 px-8 text-2xl font-bold text-black"
                  >
                    🦆 DUCKIFY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center font-mono text-[10px] text-gray-500 mt-8 uppercase">
            Disclaimer: This is not financial advice. This is a duck on your head.
          </p>
        </section>

      </main>
    </div>
  );
};

export default App;