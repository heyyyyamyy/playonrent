import { useState } from "react";
import { Game } from "../data/games";
import { Star, ShieldAlert, ShoppingCart, KeyRound, CalendarCheck } from "lucide-react";

interface GameCardProps {
  key?: any;
  game: Game;
  onRentClick: (game: Game, packageType: "primary" | "secondary") => void;
  onBuyClick: (game: Game) => void;
  onViewDetails: (game: Game) => void;
}

export default function GameCard({ game, onRentClick, onBuyClick, onViewDetails }: GameCardProps) {
  const [selectedDuration, setSelectedDuration] = useState<"primary" | "secondary">("primary");

  const durationLabels = {
    primary: "1 Month - Primary",
    secondary: "1 Month - Secondary",
  };

  return (
    <div
      id={`game-card-${game.id}`}
      className="group bg-slate-900 rounded-2xl border border-white/10 overflow-hidden hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] transition-all duration-300 flex flex-col h-full relative"
    >
      {/* Absolute Badges */}
      {game.isNewRelease && (
        <span className="absolute top-3 left-3 z-10 text-[10px] font-bold font-sans tracking-widest text-[#6366f1] bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-1 rounded-full uppercase shadow-md backdrop-blur-md">
          New Launched
        </span>
      )}

      {/* Media Containment */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 cursor-pointer" onClick={() => onViewDetails(game)}>
        <img
          src={game.coverUrl}
          alt={game.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30 pointer-events-none" />
        
        {/* Genre Overlay & Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
          <span className="bg-slate-900/80 backdrop-blur-md text-xs text-slate-300 font-medium px-2.5 py-1 rounded-md border border-white/10">
            {game.genre}
          </span>
          <div className="flex items-center space-x-1 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-300 font-semibold px-2 py-0.5 rounded-md text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>{game.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Information Package */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase font-bold">
              {game.developer}
            </span>
            <span className="text-[11px] font-semibold text-slate-500">{game.releaseYear}</span>
          </div>
          
          <h4
            className="font-display text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors cursor-pointer line-clamp-1"
            onClick={() => onViewDetails(game)}
            title={game.title}
          >
            {game.title}
          </h4>
          
          <p className="text-xs text-slate-400 mt-2 line-clamp-2 h-8">
            {game.description}
          </p>

          {/* Pricing Configurator */}
          <div className="mt-4 bg-slate-950 rounded-xl p-3 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">Account Type:</span>
              <span className="font-mono text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ₹{game.rentPrices[selectedDuration]}
              </span>
            </div>
            
            {/* Quick selectors */}
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg bg-slate-900 border border-white/5">
              {(["primary", "secondary"] as const).map((dur) => (
                <button
                  type="button"
                  key={dur}
                  onClick={() => setSelectedDuration(dur)}
                  className={`text-[10px] font-bold py-1.5 rounded transition-all cursor-pointer ${
                    selectedDuration === dur
                      ? "bg-indigo-600 text-white shadow-md font-extrabold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {durationLabels[dur]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="mt-5 space-y-2">
          {game.isAvailable ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onRentClick(game, selectedDuration)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg hover:shadow-indigo-950/20 transition-all border border-indigo-400/20"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Rent Game</span>
              </button>

              <button
                type="button"
                onClick={() => onBuyClick(game)}
                className="w-full bg-slate-800 hover:bg-slate-700 hover:border-slate-400/30 text-slate-200 hover:text-white text-xs font-semibold py-2.5 px-3 rounded-xl border border-white/5 flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Buy Outright</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#1f191b] border border-red-500/20 rounded-xl p-2.5 flex items-center justify-center text-red-300">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400 mr-2" />
              <div className="text-[11px] leading-tight font-medium">
                All slots booked
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => onViewDetails(game)}
            className="w-full text-center text-xs text-indigo-400 hover:text-indigo-300 py-1 font-semibold transition-colors bg-transparent border-0 cursor-pointer"
          >
            Read game reviews & gameplay specs &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
