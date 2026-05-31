import { Game } from "../data/games";
import { Trash2, ShoppingBag, Truck, MapPin, Send, Plus, CheckCircle, Calculator } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface CartItem {
  game: Game;
  action: "rent" | "buy";
  duration: "primary" | "secondary";
}

interface RentCartProps {
  cartItems: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateItem: (index: number, updatedItem: CartItem) => void;
  onClearCart: () => void;
  whatsappNumber: string;
}

export default function RentCart({
  cartItems,
  onRemoveItem,
  onUpdateItem,
  onClearCart,
  whatsappNumber,
}: RentCartProps) {
  const [customerName, setCustomerName] = useState("");
  const [prefDate, setPrefDate] = useState("");

  const durationLabels = {
    primary: "1 Month Account (Primary)",
    secondary: "1 Month Account (Secondary)",
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      if (item.action === "buy") {
        return acc + item.game.buyPrice;
      } else {
        return acc + item.game.rentPrices[item.duration];
      }
    }, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const subtotal = calculateSubtotal();
    const finalTotal = subtotal;

    // Build human-friendly formatted message
    let msg = `🎮 *PLAYONRENT PS5 ORDER DETAILS* 🎮\n\n`;
    msg += `Hello Store Manager, I want to book the following PS5 games:\n\n`;

    cartItems.forEach((item, index) => {
      if (item.action === "buy") {
        msg += `*${index + 1}. ${item.game.title}*\n`;
        msg += `   • Type: Outright Purchase\n`;
        msg += `   • Price: ₹${item.game.buyPrice}\n\n`;
      } else {
        const pLabel = durationLabels[item.duration];
        const pVal = item.game.rentPrices[item.duration];
        msg += `*${index + 1}. ${item.game.title}*\n`;
        msg += `   • Type: Rental (${pLabel})\n`;
        msg += `   • Charges: ₹${pVal}\n\n`;
      }
    });

    msg += `--- *CUSTOMER DETAILS* ---\n`;
    msg += `👤 *Name:* ${customerName || "Not specified"}\n`;
    if (prefDate) {
      msg += `📅 *Preferred Date:* ${prefDate}\n`;
    }
    msg += `\n`;

    msg += `--- *BILLING SUMMARY* ---\n`;
    msg += `⚙️ Subtotal: ₹${subtotal}\n`;
    msg += `💰 *Total Amount:* ₹${finalTotal}\n\n`;
    msg += `Please confirm the availability and sharing parameters to initiate playing!`;

    const encodedText = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    // Open WhatsApp in a new window/tab safely
    window.open(whatsappUrl, "_blank");
    onClearCart();
  };

  const subtotal = calculateSubtotal();

  return (
    <div id="rental-invoice-cart" className="bg-slate-900 border border-white/10 rounded-2.5xl p-6 shadow-2xl relative">
      <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-slate-100">Booking Cart</h3>
            <p className="text-xs text-slate-400">Configure multiple games instantly</p>
          </div>
        </div>
        <span className="bg-indigo-500/10 text-indigo-400 text-xs px-2.5 py-1 rounded-full font-bold border border-indigo-500/20">
          {cartItems.length} {cartItems.length === 1 ? "Game" : "Games"} Selected
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-2xl p-8 text-center bg-slate-950/30">
          <Calculator className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-300">Your Booking cart is currently empty</p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Browse our game selection below and select "Rent Game" or "Buy Outright" to formulate a customized quote.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Item List */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={`${item.game.id}-${index}`}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  className="p-3 bg-slate-950 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-xs"
                >
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={item.game.coverUrl}
                    alt={item.game.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover bg-slate-900 shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="font-semibold text-slate-100 truncate">{item.game.title}</h5>
                    <div className="flex items-center space-x-1.5 mt-1">
                      <button
                        onClick={() => onUpdateItem(index, { ...item, action: "rent" })}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          item.action === "rent" ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        Rent
                      </button>
                      <button
                        onClick={() => onUpdateItem(index, { ...item, action: "buy" })}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          item.action === "buy" ? "bg-amber-500/20 text-amber-300" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-3">
                  {item.action === "rent" ? (
                    <div className="space-y-1">
                      <select
                        value={item.duration}
                        onChange={(e) =>
                          onUpdateItem(index, {
                            ...item,
                            duration: e.target.value as any,
                          })
                        }
                        className="bg-slate-900 border border-white/5 rounded px-2 py-1 text-[10px] sm:text-xs text-slate-300 focus:outline-none cursor-pointer w-full sm:w-auto"
                      >
                        <option value="primary">1 Month Primary - ₹{item.game.rentPrices.primary}</option>
                        <option value="secondary">1 Month Secondary - ₹{item.game.rentPrices.secondary}</option>
                      </select>
                    </div>
                  ) : (
                    <span className="font-mono text-xs font-bold text-indigo-400">₹{item.game.buyPrice}</span>
                  )}

                  <button
                    onClick={() => onRemoveItem(index)}
                    className="p-1.5 text-slate-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10 cursor-pointer shrink-0"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>

          {/* Account Delivery Configuration */}
          <div className="bg-slate-950 rounded-xl p-4 border border-white/5 space-y-4">
            <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-400">
              Account Fulfillment Details
            </h4>
            
            {/* Customer form detail inputs */}
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Sufiyan Cruise"
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Preferred Booking Date
                  </label>
                  <input
                    type="date"
                    value={prefDate}
                    onChange={(e) => setPrefDate(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing summary */}
          <div className="border-t border-white/10 pt-4 space-y-2 text-xs font-sans">
            <div className="flex justify-between text-slate-400">
              <span>Cart Subtotal</span>
              <span className="font-mono text-slate-200 font-medium font-bold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-slate-100 pt-1.5 border-t border-white/10">
              <span className="font-display">Total Bill Amount</span>
              <span className="font-mono text-indigo-400">₹{subtotal}</span>
            </div>
          </div>

          {/* Order execution CTA */}
          <button
            type="button"
            onClick={handleCheckout}
            disabled={!customerName || !prefDate}
            className={`w-full rounded-full font-black tracking-widest uppercase text-xs py-3.5 flex items-center justify-center space-x-2 shadow-xl cursor-pointer transition-all ${
              !customerName || !prefDate 
                ? "bg-slate-700 text-slate-500 cursor-not-allowed shadow-none" 
                : "bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 shadow-emerald-500/10"
            }`}
          >
            <Send className="w-4.5 h-4.5" />
            <span>Complete Order & WhatsApp Us</span>
          </button>

          <p className="text-[10px] text-slate-500 text-center leading-normal">
            No instant online money deduction. Just tap to send order specs on WhatsApp. We look up availability and verify details instantly. Credentials delivered securely via WhatsApp in 10-15 minutes.
          </p>
        </div>
      )}
    </div>
  );
}
