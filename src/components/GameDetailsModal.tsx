import { useState } from "react";
import { motion } from "motion/react";
import { Game } from "../data/games";
import { X, Calendar, Star, CheckCircle, Smartphone, Award, History, Landmark } from "lucide-react";

interface GameDetailsModalProps {
  game: Game;
  onClose: () => void;
  onRent: (game: Game, duration: "primary" | "secondary") => void;
  onBuy: (game: Game) => void;
}

export default function GameDetailsModal({ game, onClose, onRent, onBuy }: GameDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "reviews" | "specs">("overview");
  const [selectedDuration, setSelectedDuration] = useState<"primary" | "secondary">("primary");

  const durationLabels = {
    primary: "1 Month - Primary",
    secondary: "1 Month - Secondary",
  };

  const reviews = [
    {
      author: "Aditya Sharma",
      stars: 5,
      date: "May 2026",
      comment: "Rented this game. Fast digital delivery, credentials worked flawlessly! Completed the campaign in 5 days. Absolutely worth the price.",
    },
    {
      author: "Rohan Das",
      stars: 4,
      date: "April 2026",
      comment: "Excellent graphics and gameplay! The rent mechanics of this platform are perfect for single-player games where you don't want to spend 5000 onwards.",
    },
    {
      author: "Sneha Patel",
      stars: 5,
      date: "May 2026",
      comment: "Awesome service. Saved me thousands. Will rent again next weekend!",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2.5xl overflow-hidden shadow-2xl"
      >
        
        {/* Banner with Close Button */}
        <div className="relative h-48 md:h-64 overflow-hidden bg-slate-950">
          <img
            src={game.bannerUrl}
            alt={game.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-black/40" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 transition-colors hover:cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 font-mono">
              {game.genre}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mt-1 leading-tight">
              {game.title}
            </h3>
            <p className="text-xs text-slate-300 font-medium">Developed by {game.developer} &bull; {game.releaseYear}</p>
          </div>
        </div>

        {/* Tab Controllers */}
        <div className="flex border-b border-white/10 px-6 bg-slate-950">
          {(["overview", "reviews", "specs"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
                activeTab === tab
                  ? "border-indigo-500 text-indigo-400 font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h5 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider mb-2">Game Summary</h5>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">{game.description}</p>
              </div>

              {/* Booking Segment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                {/* Rent Configurator */}
                <div className="bg-slate-950 rounded-2xl p-4 border border-white/5 flex flex-col justify-between">
                  <div>
                    <h6 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider mb-3 flex items-center justify-between">
                      <span>Renting Options</span>
                      <span className="text-[10px] font-normal text-emerald-400 lowercase">Starts at 800</span>
                    </h6>

                    <div className="space-y-2">
                      {(["primary", "secondary"] as const).map((dur) => (
                        <div
                          key={dur}
                          onClick={() => setSelectedDuration(dur)}
                          className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                            selectedDuration === dur
                              ? "bg-indigo-500/10 border-indigo-500"
                              : "bg-slate-900 border-white/10 hover:border-slate-700"
                          }`}
                        >
                          <span className="text-xs font-semibold text-slate-300">{durationLabels[dur]}</span>
                          <span className="text-sm font-bold font-mono text-emerald-400">₹{game.rentPrices[dur]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onRent(game, selectedDuration)}
                    disabled={!game.isAvailable}
                    className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Rent Now on WhatsApp</span>
                  </button>
                </div>

                {/* Purchase Configurator */}
                <div className="bg-slate-950 rounded-2xl p-4 border border-white/5 flex flex-col justify-between">
                  <div>
                    <h6 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider mb-3">
                      Buy Outright
                    </h6>
                    <p className="text-xs text-slate-400 mb-4">
                      Love ownership? Buy this PS5 disk outright in pre-owned pristine condition today.
                    </p>
                    
                    <div className="bg-slate-900 p-4 rounded-xl border border-white/10 text-center">
                      <span className="text-[10px] uppercase text-slate-500 font-semibold block">Pre-Owned Price</span>
                      <span className="font-display text-2xl font-bold text-indigo-400 font-mono block mt-1">₹{game.buyPrice}</span>
                      <span className="text-[9px] text-emerald-400 block mt-1">Instant Digital Credentials</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onBuy(game)}
                    disabled={!game.isAvailable}
                    className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 border border-slate-600 transition-colors cursor-pointer"
                  >
                    <span>Enquire Buy on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                <span className="text-3xl font-bold font-mono text-slate-100">{game.rating}</span>
                <div>
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <span className="text-xs text-slate-400">Average of 14 renting reviews</span>
                </div>
              </div>

              {reviews.map((rev, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200">{rev.author}</span>
                    <span className="text-slate-500">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-500">
                    {Array.from({ length: rev.stars }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "specs" && (
            <div className="grid grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-white/5">
                <span className="text-slate-500 uppercase tracking-widest text-[9px] font-bold block mb-1">Developer</span>
                <span className="text-sm font-semibold text-slate-200">{game.developer}</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-white/5">
                <span className="text-slate-500 uppercase tracking-widest text-[9px] font-bold block mb-1">Release Year</span>
                <span className="text-sm font-semibold text-slate-200">{game.releaseYear}</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-white/5">
                <span className="text-slate-500 uppercase tracking-widest text-[9px] font-bold block mb-1">Genre</span>
                <span className="text-sm font-semibold text-slate-200">{game.genre}</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-white/5">
                <span className="text-slate-500 uppercase tracking-widest text-[9px] font-bold block mb-1">DualSense Support</span>
                <span className="text-sm font-semibold text-slate-100 flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-emerald-400 italic shrink-0" />
                  <span>Advanced Haptics</span>
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-white/5 col-span-2">
                <span className="text-slate-500 uppercase tracking-widest text-[9px] font-bold block mb-1">Minimum System Spec</span>
                <span className="text-xs text-slate-300 font-mono">
                  Strictly plays on Google Playstation 5 Physical Disc console edition only. Doesn't support digital-only consoles.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 px-8">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-yellow-500" />
            <span>Tested & Scratchless CDs</span>
          </div>
          <span>Doorstep Pick & Drop Setup</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
