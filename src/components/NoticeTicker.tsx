import React from 'react';
import { BellRing, ChevronRight } from 'lucide-react';
import { Notice } from '../types';

interface NoticeTickerProps {
  tickerText: string;
  importantNotices: Notice[];
  onSelectNotice: (notice: Notice) => void;
  onViewAllNotices: () => void;
}

export const NoticeTicker: React.FC<NoticeTickerProps> = ({
  tickerText,
  importantNotices,
  onSelectNotice,
  onViewAllNotices,
}) => {
  return (
    <div className="bg-amber-500/10 border-y border-amber-300/40 text-slate-800 py-2 px-3 no-print">
      <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-hidden text-sm">
        {/* Ticker Badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-amber-600 text-white px-2.5 py-1 rounded text-xs font-bold shadow-xs">
          <BellRing className="w-3.5 h-3.5 animate-bounce" />
          <span>জরুরি বার্তা</span>
        </div>

        {/* Marquee Content */}
        <div className="flex-1 overflow-hidden relative cursor-pointer group">
          <div className="inline-block animate-marquee whitespace-nowrap text-xs md:text-sm text-slate-800 font-medium hover:[animation-play-state:paused]">
            <span className="mx-4">{tickerText}</span>
            {importantNotices.map((n) => (
              <span
                key={n.id}
                onClick={() => onSelectNotice(n)}
                className="mx-6 hover:text-emerald-700 hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <span className="text-amber-700 font-semibold">[{n.category}]</span>
                <span>{n.title}</span>
                <span className="text-slate-400">({n.date})</span>
              </span>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <button
          onClick={onViewAllNotices}
          className="flex-shrink-0 text-xs text-emerald-800 font-semibold hover:text-emerald-950 flex items-center hover:underline cursor-pointer"
        >
          <span>সকল নোটিশ</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
