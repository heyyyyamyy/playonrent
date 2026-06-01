import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Gamepad2, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  PhoneCall, 
  Compass, 
  HelpCircle, 
  Info, 
  Layers, 
  Check, 
  Instagram, 
  Twitter, 
  Facebook,
  AlertCircle
} from "lucide-react";
import { PS5_GAMES, Game } from "./data/games";
import GameCard from "./components/GameCard";
import GameDetailsModal from "./components/GameDetailsModal";
import RentCart, { CartItem } from "./components/RentCart";

export default function App() {
  // Store settings (WhatsApp phone)
  const storeSettings = {
    whatsappNumber: "916372695263",
  };

  // Cart & UI State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  const [activeView, setActiveView] = useState<"catalog" | "cart">("catalog");
  
  // Modals & Popups
  const [focusedGame, setFocusedGame] = useState<Game | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Helper: Trigger beautiful momentary feedback toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 2500);
  };

  // Add game to bundle booking cart
  const handleAddGameToCart = (game: Game, duration: "primary" | "secondary") => {
    // Check if game already in cart to prevent duplicates
    const alreadyExists = cart.find(item => item.game.id === game.id);
    if (alreadyExists) {
      triggerToast(`"${game.title}" is already in your booking list!`);
      // Smooth scroll to cart container
      document.getElementById("rental-invoice-cart")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const newItem: CartItem = {
      game,
      action: "rent",
      duration,
    };

    setCart([...cart, newItem]);
    triggerToast(`Added ${game.title} (${duration === "primary" ? "1 Month Primary" : "1 Month Secondary"}) to Booking Cart!`);
    
    // Auto scroll to cart
    setTimeout(() => {
      document.getElementById("rental-invoice-cart")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  // Direct checkout bypass for individual items (rent)
  const handleIndividualRent = (game: Game, duration: "primary" | "secondary") => {
    const durLabel = duration === "primary" ? "1 Month Primary Account" : "1 Month Secondary Account";
    const price = game.rentPrices[duration];
    
    const msg = `🎮 *PLAYONRENT PS5 QUICK RENTAL* 🎮\n\n` +
                `Hi! I would like to instantly rent this newly launched title:\n\n` +
                `• *Game:* ${game.title}\n` +
                `• *Duration:* ${durLabel}\n` +
                `• *Rental Option Price:* ₹${price}\n\n` +
                `Please let me know the account verification process and credentials!`;
    
    const whatsappUrl = `https://wa.me/${storeSettings.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Direct checkout bypass for individual items (purchase/buy)
  const handleIndividualBuy = (game: Game) => {
    const msg = `🎮 *PLAYONRENT PS5 QUICK PURCHASE* 🎮\n\n` +
                `Hi! I'm interested in buying this digital PS5 game:\n\n` +
                `• *Game:* ${game.title}\n` +
                `• *Outright Buy Price:* ₹${game.buyPrice}\n\n` +
                `Please send me the account details to setup!`;
                
    const whatsappUrl = `https://wa.me/${storeSettings.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Cart operations
  const handleRemoveFromCart = (index: number) => {
    const prevItemName = cart[index].game.title;
    const updated = cart.filter((_, idx) => idx !== index);
    setCart(updated);
    triggerToast(`Removed "${prevItemName}" from Booking Cart.`);
  };

  const handleUpdateItemInCart = (index: number, updatedItem: CartItem) => {
    const updated = cart.map((item, idx) => (idx === index ? updatedItem : item));
    setCart(updated);
  };

  // Gather unique genres dynamically with a clean ordering
  const genres = useMemo(() => {
    const setOfGenres = new Set(PS5_GAMES.map((g) => g.genre));
    return ["All", ...Array.from(setOfGenres)];
  }, []);

  // Filter games based on search strings and selected tabs
  const filteredGames = useMemo(() => {
    return PS5_GAMES.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            game.developer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === "All" || game.genre === selectedGenre;
      const matchesNew = !showOnlyNew || game.isNewRelease;
      return matchesSearch && matchesGenre && matchesNew;
    });
  }, [searchQuery, selectedGenre, showOnlyNew]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Toast System */}
      <AnimatePresence>
        {isToastVisible && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 bg-[#09090b] border-2 border-emerald-500/50 text-emerald-300 font-sans px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
            <span className="text-sm font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top PlayStation Navy Header */}
      <header className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => {
            setSearchQuery("");
            setSelectedGenre("All");
            setShowOnlyNew(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)] border border-indigo-400/20">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="bg-indigo-600 px-2 py-0.5 rounded font-black text-white text-base tracking-tighter">PLAYON</span>
                <span className="font-display font-bold text-lg tracking-widest text-white uppercase">RENT</span>
              </div>
              <p className="text-[9px] text-slate-400 font-mono uppercase tracking-widest">Premium Gaming &bull; From ₹800</p>
            </div>
          </div>

          {/* Nav Details & Shortcuts */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest text-slate-400">
            <button onClick={() => setActiveView("catalog")} className={`${activeView === "catalog" ? "text-indigo-400" : "hover:text-indigo-400"} transition-colors flex items-center gap-1.5 cursor-pointer`}>
              <Compass className="w-4 h-4" /> Browse Catalog
            </button>
            <button onClick={() => setActiveView("cart")} className={`${activeView === "cart" ? "text-indigo-400" : "hover:text-indigo-400"} transition-colors flex items-center gap-1.5 relative cursor-pointer`}>
              <Layers className="w-4 h-4" /> 
              <span>Booking Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2.5 -right-3.5 bg-indigo-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                  {cart.length}
                </span>
              )}
            </button>
            <a href="#frequently-asked-questions" className="hover:text-indigo-400 transition-colors">FAQS</a>
          </div>

          {/* Support Link & Mobile Cart */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setActiveView(activeView === "cart" ? "catalog" : "cart")}
              className="md:hidden relative p-2 text-slate-300 hover:text-white transition-colors bg-[#18181b] rounded-full border border-white/5"
            >
              {activeView === "cart" ? <Compass className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
              {cart.length > 0 && activeView !== "cart" && (
                <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <a
              href={`https://wa.me/${storeSettings.whatsappNumber}?text=Hi!+I+want+to+enquire+about+PS5+games+available+for+rent.`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-4 md:px-6 rounded-full text-xs flex items-center gap-2 uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/10 cursor-pointer text-center"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              <span className="hidden md:inline">Buy Games Directly</span>
            </a>
          </div>

        </div>
      </header>

      {/* Main Body Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow space-y-12">
        {activeView === "catalog" ? (
          <>
            {/* Immersive Hero Section representing PS5 LED Glow */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden bg-gradient-to-br from-slate-900/40 to-slate-950 border border-white/10 rounded-3xl p-8 md:p-12 shadow-3xl"
            >
          {/* Neon side lights */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left informational pack */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-block px-3.5 py-1.5 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full mb-1 uppercase tracking-widest border border-indigo-500/30">
                New Launch Season &bull; Rent 1 Month Start ₹800
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.95] text-white tracking-tighter col-span-1">
                PREMIUM <br />
                <span className="text-primary bg-gradient-to-r from-primary-glow to-primary bg-clip-text text-transparent">PS5, PS4 & PC</span> <br />
                GAME RENTALS
              </h1>

              <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-xl">
                Experience the next generation of gaming without the high costs. Rent any blockbuster PS5, PS4, or PC title for 1 month starting from just <span className="text-white font-bold text-xl">₹800</span>. Zero deposit, instant credentials.
              </p>

              <div className="flex flex-wrap gap-4 pt-1 text-xs">
                <div className="flex items-center space-x-2 bg-slate-900/60 p-3 rounded-xl border border-[rgba(255,255,255,0.1)]">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="font-bold text-slate-200 block">Primary Account</span>
                    <span className="text-[10px] text-slate-400">Priced at ₹900/month</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-slate-900/60 p-3 rounded-xl border border-[rgba(255,255,255,0.1)]">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="font-bold text-slate-200 block">Instant Digital</span>
                    <span className="text-[10px] text-slate-400">Credentials on WhatsApp</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-slate-900/60 p-3 rounded-xl border border-[rgba(255,255,255,0.1)]">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="font-bold text-slate-200 block">Buy Outright</span>
                    <span className="text-[10px] text-slate-400">Own premium games instantly</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-4">
                <a
                  href="#games-catalog"
                  className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
                >
                  Browse Games List
                </a>
                <a
                  href="#how-it-works"
                  className="px-6 py-3 rounded-xl bg-transparent hover:bg-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  How It Works &rarr;
                </a>
              </div>

            </div>

            {/* Right Interactive Image Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="relative w-full max-w-sm rounded-2.5xl overflow-hidden border-2 border-[rgba(255,255,255,0.1)] bg-slate-950/80 p-5 shadow-2xl">
                <div className="absolute top-2 right-2 flex space-x-1.5 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                </div>
                
                <h5 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-3">Live Feed / Spotlight</h5>
                
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBjKn3EOiE_eI4HFDKUJbRGk2AId4vgZMGboPo-hRl-80nZawTuzogBRH0vGfvtCTBqniV&s=10"
                    alt="Playstation setup"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/30" />
                  
                  {/* Spotlight overlay texts */}
                  <div className="absolute bottom-4 left-4 right-4 text-xs space-y-1 p-3 bg-slate-900/90 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-1.5 text-indigo-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
                      <span>Trending New Release</span>
                    </div>
                    <p className="text-slate-100 font-bold leading-tight">007 First Light slots are booking fast! Book your slots now.</p>
                    <span className="text-[10px] text-indigo-400 font-semibold block pt-0.5">Rent 1 Month @ ₹900/-</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* Live Catalog Header Section */}
        <section id="games-catalog" className="pt-8 border-t border-white/10 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <div className="w-2 h-8 bg-[#d946ef] rounded-full"></div>
                EXPLORE GAME CATALOGUE
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Filter and browse original digital PS5 game accounts. Simple click lets you choose 1-month rentals or outright ownership purchase.
              </p>
            </div>

            {/* Quick checkbox search overlay */}
            <label className="inline-flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 cursor-pointer text-xs select-none">
              <input
                type="checkbox"
                checked={showOnlyNew}
                onChange={(e) => setShowOnlyNew(e.target.checked)}
                className="w-4 h-4 accent-indigo-500 rounded border-white/10"
              />
              <span className="font-semibold text-slate-300">Show only New Launches</span>
            </label>
          </div>

          {/* Filtering Widgets */}
          <div className="space-y-4">
            
            {/* Search + Category Grid layout mapping */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Keyword text search panel */}
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search over game names or developers..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-xs placeholder:text-slate-500 focus:outline-[#d946ef] focus:border-transparent text-slate-100 font-sans"
                />
              </div>

              {/* Genre Category Tab Pillbox */}
              <div className="md:col-span-8 flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none pr-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0 hidden sm:inline" />
                {genres.map((gen) => (
                  <button
                    key={gen}
                    onClick={() => setSelectedGenre(gen)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedGenre === gen
                        ? "bg-[#d946ef] text-white shadow-md font-extrabold"
                        : "bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {gen}
                  </button>
                ))}
              </div>

            </div>

            {/* Catalog feedback / Search state results */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>
                Found <strong className="text-indigo-400">{filteredGames.length}</strong> matching games
              </span>
              {(searchQuery || selectedGenre !== "All" || showOnlyNew) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGenre("All");
                    setShowOnlyNew(false);
                  }}
                  className="text-xs text-indigo-400 hover:underline cursor-pointer bg-none border-0"
                >
                  Clear all search filters
                </button>
              )}
            </div>

          </div>

          {/* Actual Catalog Grid Layout */}
          {filteredGames.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredGames.map((game, index) => (
                  <motion.div 
                    key={game.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <GameCard
                      game={game}
                      onRentClick={handleAddGameToCart}
                      onBuyClick={handleIndividualBuy}
                      onViewDetails={(g) => setFocusedGame(g)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="border border-dashed border-white/10 p-12 text-center rounded-3xl bg-slate-900/30 max-w-lg mx-auto">
              <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h5 className="font-display font-bold text-lg text-slate-200">No digital accounts match your filter query</h5>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                We periodically restock highly demanded game copies. If there is a specific game you want that isn't listed, click below to suggest it on WhatsApp!
              </p>
              <button
                type="button"
                onClick={() => {
                  const url = `https://wa.me/${storeSettings.whatsappNumber}?text=Hi!+I+was+browsing+your+PlayonRent+site.+Can+you+procure+or+lease+a+specific+game+for+me?`;
                  window.open(url, "_blank");
                }}
                className="mt-5 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold cursor-pointer"
              >
                <span>Request Custom Game</span>
              </button>
            </div>
          )}

        </section>

        {/* How It Works Segment explaining 4 easy steps */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          id="how-it-works" 
          className="pt-12 border-t border-white/10 space-y-8"
        >
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Simplified 4-Step Rental Experience
            </h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
              Playing premium titles on your console doesn't require upfront spending! Here is how our digital delivery flows:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="p-5 bg-[#09090b] border border-white/10 rounded-2xl space-y-3 relative">
              <span className="absolute top-4 right-4 text-3xl font-black font-mono text-indigo-500/10">01</span>
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold font-mono text-sm">
                1
              </div>
              <h4 className="font-display font-bold text-slate-100 text-sm">Pick Your Target Game</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Browse our collection. Choose a 1-month PSN account block (Primary or Secondary setup) starting from ₹800.
              </p>
            </div>

            <div className="p-5 bg-[#09090b] border border-white/10 rounded-2xl space-y-3 relative">
              <span className="absolute top-4 right-4 text-3xl font-black font-mono text-indigo-500/10">02</span>
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold font-mono text-sm">
                2
              </div>
              <h4 className="font-display font-bold text-slate-100 text-sm">Instantly Book on WhatsApp</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Click checkout to send structured auto-formatted bills to our staff contact on WhatsApp. No money pre-deducts.
              </p>
            </div>

            <div className="p-5 bg-[#09090b] border border-white/10 rounded-2xl space-y-3 relative">
              <span className="absolute top-4 right-4 text-3xl font-black font-mono text-indigo-500/10">03</span>
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold font-mono text-sm">
                3
              </div>
              <h4 className="font-display font-bold text-slate-100 text-sm">Receive Login Credentials</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Our support team shares the secure PSN account details with the game pre-purchased directly to your WhatsApp.
              </p>
            </div>

            <div className="p-5 bg-[#09090b] border border-white/10 rounded-2xl space-y-3 relative">
              <span className="absolute top-4 right-4 text-3xl font-black font-mono text-indigo-500/10">04</span>
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold font-mono text-sm">
                4
              </div>
              <h4 className="font-display font-bold text-slate-100 text-sm">Login, Download & Play!</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Add the account to your PS5, download the game securely, and start your block! Swap or extend easily when the month ends.
              </p>
            </div>

          </div>
        </motion.section>

        {/* FAQs Panel */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          id="frequently-asked-questions" 
          className="pt-12 border-t border-white/10 space-y-8"
        >
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-400" />
              FAQ - PlayonRent Corner
            </h2>
            <p className="text-xs text-slate-400">
              Quick insights on digital ownership, renting parameters, and account support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            <div className="p-5 bg-[#09090b] border border-white/10 rounded-2xl space-y-2">
              <h4 className="font-display font-bold text-sm text-slate-200">Is there any security deposit required?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                For repeat players or those sharing a valid ID and local utility address proof, there is <strong>Zero security deposit</strong> requested! First-time users are verified during booking with basic reference credentials.
              </p>
            </div>

            <div className="p-5 bg-[#09090b] border border-white/10 rounded-2xl space-y-2">
              <h4 className="font-display font-bold text-sm text-slate-200">How do you provide the games?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We provide 100% genuine PSN accounts that have the game purchased. You simply log in to your PS5 with the provided credentials, start the download, and switch back to your own profile to play and earn trophies!
              </p>
            </div>

            <div className="p-5 bg-[#09090b] border border-white/10 rounded-2xl space-y-2">
              <h4 className="font-display font-bold text-sm text-slate-200">How do swaps work during rent?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Finished playing before the month ends? Direct message us on WhatsApp with the title you want next. We can quickly provision a new account for your next adventure.
              </p>
            </div>

            <div className="p-5 bg-[#09090b] border border-white/10 rounded-2xl space-y-2">
              <h4 className="font-display font-bold text-sm text-slate-200">Can I buy an account outright?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yes! Every game supports a "Buy Outright" option. If a customer wishes to indefinitely hold access to a digital title, click the Buy button to receive official rates.
              </p>
            </div>

          </div>
        </motion.section>
        </>
        ) : (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-8"
          >
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  <div className="w-2 h-8 bg-[#d946ef] rounded-full shrink-0"></div>
                  YOUR BOOKING CART
                </h3>
                <p className="text-xs text-slate-400 mt-1">Review your selected accounts and checkout via WhatsApp.</p>
              </div>
              <button onClick={() => setActiveView("catalog")} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer shrink-0 self-start sm:self-auto">&larr; Back to Catalog</button>
            </div>
            
            <RentCart
              cartItems={cart}
              onRemoveItem={handleRemoveFromCart}
              onUpdateItem={handleUpdateItemInCart}
              onClearCart={() => setCart([])}
              whatsappNumber={storeSettings.whatsappNumber}
            />
            
            {/* Platform benefits list inside cart view instead */}
            <div className="bg-[#09090b] border border-white/10 rounded-2.5xl p-6 mt-8 hidden lg:block relative overflow-hidden">
              <h4 className="font-display font-bold text-sm text-slate-100 uppercase tracking-widest mb-4 flex items-center space-x-2">
                <Info className="w-4 h-4 text-indigo-400" />
                <span>Our Rental Mandate</span>
              </h4>
              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-[10px] font-bold shrink-0">✓</span>
                  <span><strong>100% Real Digital Accounts:</strong> We provide 100% real digital PS5 game accounts. Over 120+ happy customers currently playing with zero issues!</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-[10px] font-bold shrink-0">✓</span>
                  <span><strong>Instant Delivery via WhatsApp:</strong> We instantly share PSN login parameters to set up games securely. No CDs and no physical delivery limitations!</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-[10px] font-bold shrink-0">✓</span>
                  <span><strong>Primary & Secondary Options:</strong> Play affordably on your PS5 using structured Primary or Secondary login rentals tailored to you.</span>
                </li>
              </ul>
            </div>
            
          </motion.section>
        )}

      </main>

      {/* Modern High-End Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-12 mt-16 text-slate-400 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="bg-indigo-600 px-2 py-0.5 rounded font-black text-white text-xs tracking-tighter">PLAYON</span>
              <span className="font-display font-extrabold text-white text-md tracking-widest uppercase">RENT</span>
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              India's premium digital rental marketplace for Playstation 5 consoles. Enjoy blockbuster titles at a fraction of standard retail purchase values.
            </p>
            <div className="flex space-x-3.5 text-slate-500">
              <Instagram className="w-4.5 h-4.5 hover:text-indigo-400 cursor-pointer" />
              <Twitter className="w-4.5 h-4.5 hover:text-indigo-400 cursor-pointer" />
              <Facebook className="w-4.5 h-4.5 hover:text-indigo-400 cursor-pointer" />
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="text-white font-semibold text-xs tracking-wider uppercase font-display">Serving Audience</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>All India</li>
              <li>100% Digital Delivery</li>
              <li>Instant Access</li>
              <li>24/7 Fast Support</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-white font-semibold text-xs tracking-wider uppercase font-display">Assistance</h5>
            <ul className="space-y-2 text-xs text-slate-500 font-medium font-bold uppercase tracking-widest text-[10px]">
              <li><a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How to Swap Discs</a></li>
              <li><a href="#frequently-asked-questions" className="hover:text-indigo-400 transition-colors">Security Parameters</a></li>
              <li><a href={`https://wa.me/${storeSettings.whatsappNumber}?text=Hi!+I+need+custom+help+on+game+shipment.`} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Direct WhatsApp Support</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="text-white font-semibold text-xs tracking-wider uppercase font-display">Compliance</h5>
            <p className="text-xs text-slate-500 leading-normal font-sans">
              PlayonRent operates digitally. We are independent of Sony Interactive Entertainment but worship the console ecosystem!
            </p>
            <span className="text-[10px] text-indigo-400 font-mono bg-indigo-500/10 px-2 py-1 rounded inline-block font-semibold">
              Prices Starting at ₹800/- Only
            </span>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-slate-600 uppercase font-bold tracking-[0.2em]">
          <span>© {new Date().getFullYear()} PlayonRent PS5 Store • All India Digital Rentals</span>
          <div className="flex gap-6">
            <span>Trustpilot 4.9/5</span>
            <span>Verified Seller</span>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp Button */}
      <motion.a
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
        href={`https://wa.me/${storeSettings.whatsappNumber}?text=Hi!+I+want+to+know+more+about+PS5+games+rental.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] bg-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transition-all flex items-center justify-center cursor-pointer mb-[env(safe-area-inset-bottom)]"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </motion.a>

      {/* Focus Dialog overlay details view */}
      <AnimatePresence>
        {focusedGame && (
          <GameDetailsModal
            game={focusedGame}
            onClose={() => setFocusedGame(null)}
            onRent={(g, dur) => {
              handleIndividualRent(g, dur);
              setFocusedGame(null);
            }}
            onBuy={(g) => {
              handleIndividualBuy(g);
              setFocusedGame(null);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
