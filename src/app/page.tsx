'use client';
import { useState, useMemo } from 'react';
import { 
  PRODUCTS, 
  Product, 
  CATEGORIES, 
  STATUSES, 
  SORT_OPTIONS 
} from '../app/lib/mockData';
import DetailView from '../app/components/Disclosure/DetailView';
import Badge from '../app/components/UI/Badge';
import { Search, Filter, ChevronDown, X } from 'lucide-react';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');
  const [sortOrder, setSortOrder] = useState('updatedAt-desc');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const clearSearch = () => setSearchTerm('');

  
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        categoryFilter === 'All Categories' || p.category === categoryFilter;
      
      const matchesStatus = 
        statusFilter === 'All Statuses' || p.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    }).sort((a, b) => {
      if (sortOrder === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOrder === 'name-desc') return b.name.localeCompare(a.name);
      if (sortOrder === 'updatedAt-desc') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      if (sortOrder === 'updatedAt-asc') return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      if (sortOrder === 'producer-asc') return a.producer.localeCompare(b.producer);
      if (sortOrder === 'category-asc') return a.category.localeCompare(b.category);
      return 0;
    });
  }, [searchTerm, categoryFilter, statusFilter, sortOrder]);

  
  const activeFilterCount = [
    searchTerm !== '',
    categoryFilter !== 'All Categories',
    statusFilter !== 'All Statuses'
  ].filter(Boolean).length;

  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        
        <div className="mb-8 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-gray-500" />
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Filters &amp; Controls</h2>
              </div>
              {activeFilterCount > 0 && (
                <button 
                  onClick={() => { 
                    setSearchTerm(''); 
                    setCategoryFilter('All Categories'); 
                    setStatusFilter('All Statuses');
                    setSortOrder('updatedAt-desc');
                  }}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Reset all
                </button>
              )}
            </div>
          </div>
          
          
          <div className="p-6">
            
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input 
                  type="text" 
                  placeholder="Search by product name, producer, or category..." 
                  className="w-full pl-12 pr-10 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {searchTerm && (
                <p className="mt-2 text-xs text-gray-500">
                  Searching for: <span className="font-medium text-gray-700">&quot;{searchTerm}&quot;</span>
                </p>
              )}
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Category
                </label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-4 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors cursor-pointer"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat} className="py-2">
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Status
                </label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-4 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors cursor-pointer"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All Statuses" className="py-2">All Statuses</option>
                    {STATUSES.map(stat => (
                      <option key={stat} value={stat} className="py-2">
                        {stat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Sort by
                </label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-4 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors cursor-pointer"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value} className="py-2">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            
            {activeFilterCount > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-gray-600 mr-2">Active filters:</span>
                  
                  {searchTerm && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      Search: &quot;{searchTerm}&quot;
                      <button 
                        onClick={clearSearch}
                        className="ml-1 hover:text-blue-900 transition-colors"
                        aria-label="Remove search filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  {categoryFilter !== 'All Categories' && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      Category: {categoryFilter}
                      <button 
                        onClick={() => setCategoryFilter('All Categories')}
                        className="ml-1 hover:text-gray-900 transition-colors"
                        aria-label="Remove category filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  {statusFilter !== 'All Statuses' && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      Status: {statusFilter}
                      <button 
                        onClick={() => setStatusFilter('All Statuses')}
                        className="ml-1 hover:text-gray-900 transition-colors"
                        aria-label="Remove status filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        
        <div className="mb-6 px-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Product Disclosures ({filteredProducts.length})
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Displaying producer-reported information. {activeFilterCount > 0 ? `${activeFilterCount} active filter${activeFilterCount > 1 ? 's' : ''}.` : 'Showing all disclosures.'}
              </p>
            </div>
            
            
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                Draft
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Submitted
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                Published
              </span>
            </div>
          </div>
        </div>

        
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Product Identification
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Classification
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Producer Name
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Workflow Status
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider text-right">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map(product => (
                <tr 
                  key={product.id} 
                  onClick={() => setSelectedProduct(product)}
                  className="group cursor-pointer transition-all duration-150 hover:bg-gray-50 active:bg-blue-50/50"
                >
                  <td className="px-6 py-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="block font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate max-w-xs">
                          {product.name}
                        </span>
                        {product.evidenceCount > 0 && (
                          <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                            {product.evidenceCount} doc{product.evidenceCount !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 font-mono mt-0.5">ID-{product.id.padStart(4, '0')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700 font-medium">{product.producer}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={product.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="tabular-nums">
                      <div className="text-gray-900 font-medium">
                        {new Date(product.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(product.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="py-16 text-center">
              <div className="mx-auto max-w-sm">
                <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No disclosures found</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Try adjusting your search terms or filters to find what you&apos;re looking for.
                </p>
                <button
                  onClick={() => { 
                    setSearchTerm(''); 
                    setCategoryFilter('All Categories'); 
                    setStatusFilter('All Statuses');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <DetailView 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </main>
  );
}