import React from 'react';

import Badge from './Badge';
import { Product } from '../../lib/mockData';

interface TableProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

export default function Table({ products, onSelect }: TableProps) {
  return (
    <div className="w-full overflow-hidden rounded-institutional border border-border bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-canvas text-[11px] font-bold uppercase tracking-wider text-brand-muted">
            <th className="px-6 py-4">Product Identification</th>
            <th className="px-6 py-4">Classification</th>
            <th className="px-6 py-4">Producer Name</th>
            <th className="px-6 py-4">Workflow Status</th>
            <th className="px-6 py-4 text-right">Last Logged</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product) => (
            <tr
              key={product.id}
              onClick={() => onSelect(product)}
              className="group cursor-pointer transition-all duration-150 hover:bg-surface-hover"
            >
              <td className="px-6 py-4">
                <div className="font-semibold text-brand-navy group-hover:text-blue-600">
                  {product.name}
                </div>
                <div className="text-[11px] text-brand-muted">ID: {product.id.padStart(6, '0')}</div>
              </td>
              <td className="px-6 py-4 text-brand-muted">
                {product.category}
              </td>
              <td className="px-6 py-4 font-medium text-slate-700">
                {product.producer}
              </td>
              <td className="px-6 py-4">
                <Badge status={product.status} />
              </td>
              <td className="px-6 py-4 text-right tabular-nums text-brand-muted">
                {new Date(product.updatedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}