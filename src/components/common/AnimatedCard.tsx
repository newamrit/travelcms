import React from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'shine' | 'none';
  delay?: number;
  onClick?: () => void;
}

export default function AnimatedCard({
  children,
  className = '',
  hoverEffect = 'lift',
  delay = 0,
  onClick
}: AnimatedCardProps) {
  const hoverClasses = {
    lift: 'hover-lift',
    scale: 'hover-scale',
    glow: 'hover-glow',
    shine: 'hover-shine',
    none: ''
  };

  return (
    <div
      className={`card-hover-effect ${hoverClasses[hoverEffect]} stagger-item ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Pre-built animated card variants

interface TileCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick?: () => void;
  delay?: number;
  badge?: string | number;
}

export function TileCard({
  icon,
  title,
  description,
  color,
  onClick,
  delay = 0,
  badge
}: TileCardProps) {
  return (
    <AnimatedCard
      hoverEffect="lift"
      delay={delay}
      onClick={onClick}
      className="bg-white rounded-3xl border-2 border-slate-200 p-8 text-left cursor-pointer hover:border-[#012871] hover:shadow-2xl"
    >
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 icon-hover-rotate`}>
          {icon}
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-slate-800 mb-1">{title}</h2>
          <p className="text-slate-500 text-sm">{description}</p>
        </div>
        {badge && (
          <div className="px-3 py-1 bg-slate-100 rounded-full">
            <span className="text-sm font-semibold text-slate-700">{badge}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-[#012871] font-medium text-sm group-hover:gap-3 transition-all">
          <span>View Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </AnimatedCard>
  );
}
