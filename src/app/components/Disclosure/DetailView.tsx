import Badge from '../UI/Badge';
import { Product } from '../../lib/mockData';

export default function DetailView({ product, onClose }: { product: Product, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white p-8 shadow-2xl animate-in slide-in-from-right duration-300">
        <button onClick={onClose} className="mb-8 text-sm text-slate-400 hover:text-slate-900">← Back to listing</button>
        
        
        <div className="mb-8 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="font-semibold">Information Transparency Notice</p>
          <p className="mt-1">This page presents producer-declared information; it is not certification or verification.</p>
        </div>

        <h2 className="text-2xl font-bold tracking-tight">{product.name}</h2>
        <p className="text-slate-500">Producer-reported classification: {product.category}</p>

        <div className="mt-8 grid grid-cols-2 gap-6 rounded-lg border border-slate-100 p-6 bg-slate-50">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Declared By</p>
            <p className="text-sm font-medium">{product.producer}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Evidence Attached</p>
            <p className="text-sm font-medium">{product.evidenceCount > 0 ? `${product.evidenceCount} Documents` : 'No evidence attached'}</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Disclosure History</h3>
          <div className="space-y-4">
            {product.versions.map((v, i) => (
              <div key={v.id} className="flex items-start gap-4 border-l-2 border-slate-100 pl-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Version {product.versions.length - i}.0</span>
                    <Badge status={v.status} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Logged by {v.declaredBy} on {new Date(v.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}