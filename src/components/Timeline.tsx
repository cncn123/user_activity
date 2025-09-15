import React from 'react';
import { cn } from '../lib/utils';

interface TimelineProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  iconSize?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface TimelineItemProps {
  date?: Date | string | number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  iconColor?: 'primary' | 'secondary' | 'muted' | 'accent';
  status?: 'completed' | 'in-progress' | 'pending';
  loading?: boolean;
  error?: string;
  isLast?: boolean;
  themeColor?: 'blue' | 'emerald' | 'orange' | 'cyan' | 'violet';
}

const Timeline: React.FC<TimelineProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn('relative', className)}>
      {children}
    </div>
  );
};

const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  description,
  icon,
  error,
  isLast = false,
  themeColor = 'blue'
}) => {
  const getThemeColors = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          line: 'from-blue-400 to-blue-600',
          dot: 'bg-blue-500 border-blue-400',
          text: 'text-blue-100'
        };
      case 'emerald':
        return {
          line: 'from-emerald-400 to-emerald-600',
          dot: 'bg-emerald-500 border-emerald-400',
          text: 'text-emerald-100'
        };
      case 'orange':
        return {
          line: 'from-orange-400 to-orange-600',
          dot: 'bg-orange-500 border-orange-400',
          text: 'text-orange-100'
        };
      case 'cyan':
        return {
          line: 'from-cyan-400 to-cyan-600',
          dot: 'bg-cyan-500 border-cyan-400',
          text: 'text-cyan-100'
        };
      case 'violet':
        return {
          line: 'from-violet-400 to-violet-600',
          dot: 'bg-violet-500 border-violet-400',
          text: 'text-violet-100'
        };
      default:
        return {
          line: 'from-blue-400 to-blue-600',
          dot: 'bg-blue-500 border-blue-400',
          text: 'text-blue-100'
        };
    }
  };

  const colors = getThemeColors(themeColor);
  
  const formatTime = (timeStr: string) => {
    return timeStr;
  };

  return (
    <div className="relative flex items-start pb-4">
      {/* Timeline line */}
      {!isLast && (
        <div className={`absolute left-3 top-8 bottom-0 w-0.5 bg-gradient-to-b ${colors.line} opacity-60`}></div>
      )}
      
      {/* Timeline dot/icon */}
      <div className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full border-2 border-white ${colors.dot} shadow-lg animate-pulse`}>
        {icon && <span className="text-xs text-white">{icon}</span>}
      </div>
      
      {/* Content */}
      <div className="flex-1 ml-4">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-white font-bold text-sm drop-shadow-sm">{title}</h4>
          {date && (
            <div className="text-white/90 font-medium text-right text-xs bg-white/20 px-2 py-1 rounded border border-white/30">
              {typeof date === 'string' ? formatTime(date) : date.toString()}
            </div>
          )}
        </div>
        {description && (
          <div className="text-xs text-white/80 font-medium bg-white/15 px-2 py-1 rounded inline-block border border-white/20">
            {description}
          </div>
        )}
        {error && (
          <div className="text-xs text-red-300 bg-red-500/10 px-2 py-1 rounded mt-1">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export { Timeline, TimelineItem };