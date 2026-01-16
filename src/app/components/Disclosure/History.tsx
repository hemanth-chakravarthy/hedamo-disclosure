import React from 'react';
import { Version } from '../../lib/mockData';
import { UI_LABELS } from '../../lib/constants';

interface HistoryProps {
  versions: Version[];
}

export default function History({ versions }: HistoryProps) {
  return (
    <div className="mt-10 border-t border-border pt-8">
      <h3 className="text-sm font-bold text-brand-navy mb-6">
        {UI_LABELS.HISTORY_HEADER}
      </h3>
      
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-0.5 before:bg-slate-100">
        {versions.map((version, index) => (
          <div key={version.id} className="relative flex items-start pl-8 group">
            <div className={`absolute left-0 mt-1.5 h-6 w-6 rounded-full border-4 border-white shadow-sm transition-colors ${
              index === 0 ? 'bg-blue-500' : 'bg-slate-300'
            }`} />
            
            <div className="flex-1 rounded-institutional border border-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-brand-navy">
                  Version {versions.length - index}.0
                </span>
                <span className="text-[10px] font-medium text-brand-muted uppercase tracking-widest">
                  {version.status}
                </span>
              </div>
              
              <div className="text-sm text-slate-700">
                Data declared by <span className="font-semibold">{version.declaredBy}</span>
              </div>
              
              <div className="mt-2 text-[11px] text-brand-muted">
                {new Date(version.timestamp).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}