import React from 'react';
import { Check, Zap, Star, ShieldCheck } from 'lucide-react';

const Plans: React.FC = () => {
  const plans = [
    {
      name: 'Free Plan',
      price: '$0',
      desc: 'Perfect for new artists',
      features: ['Unlimited Audio Uploads', '80% Royalty Share', 'Standard Distribution', 'Basic Analytics'],
      icon: <Zap size={24} className="text-indigo-400" />,
      current: true,
      btn: 'Current Plan'
    },
    {
      name: 'Pro Artist',
      price: '$19.99',
      desc: 'For professional careers',
      features: [
        'Unlimited Audio Uploads', 
        'Music Video Distribution',
        '100% Royalty Share', 
        'Fast Distribution', 
        'AI Mastering & Video Tools', 
        'Smart Links'
      ],
      icon: <Star size={24} className="text-purple-400" />,
      current: false,
      btn: 'Upgrade Now',
      popular: true
    },
    {
      name: 'Label Plan',
      price: '$99.99',
      desc: 'Manage multiple artists',
      features: [
        'Unlimited Artist Seats', 
        'Unlimited Music Video Distribution',
        '100% Royalty Share', 
        'Priority Support', 
        'YouTube OAC Support', 
        'Vevo Verification'
      ],
      icon: <ShieldCheck size={24} className="text-emerald-400" />,
      current: false,
      btn: 'Contact Sales'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Choose the right plan for you</h2>
        <p className="text-slate-400">Take your music & video career to the next level with OrbitX Music</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div 
            key={idx} 
            className={`relative p-8 rounded-3xl border transition-all flex flex-col ${
              plan.popular 
                ? 'bg-slate-900 border-indigo-500/50 shadow-2xl shadow-indigo-500/10 scale-105 z-10' 
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                Most Popular
              </span>
            )}

            <div className="mb-6">
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                {plan.icon}
              </div>
              <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
              <p className="text-slate-500 text-sm">{plan.desc}</p>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-black">{plan.price}</span>
              <span className="text-slate-500 text-sm ml-2">/ year</span>
            </div>

            <div className="space-y-4 mb-10 flex-1">
              {plan.features.map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-indigo-500/10 rounded-full flex items-center justify-center shrink-0">
                    <Check size={12} className="text-indigo-400" />
                  </div>
                  <span className="text-sm text-slate-300">{f}</span>
                </div>
              ))}
            </div>

            <button 
              className={`w-full py-4 rounded-2xl font-bold transition-all ${
                plan.current 
                  ? 'bg-slate-800 text-slate-400 cursor-default' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20'
              }`}
            >
              {plan.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;