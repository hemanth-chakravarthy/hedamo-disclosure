'use client';

import { useState, useMemo, type ReactElement } from 'react';
import Image from 'next/image';
import { 
  PRODUCTS, 
  Product, 
  CATEGORIES, 
  STATUSES, 
  SORT_OPTIONS 
} from '../app/lib/mockData';
import DetailView from '../app/components/Disclosure/DetailView';
import Badge from '../app/components/UI/Badge';
import { 
  Search, Filter, ChevronDown, X, Building2, 
  Tag, Calendar, ImageIcon, AlertTriangle, Package,
  FileText, Droplets, Beaker, Factory, Server,
  Leaf, Shield, Battery, Truck, Pill,
  Heart
} from 'lucide-react';

/**
 * COMPONENT: SmartImage
 * Handles broken links and missing images with an institutional fallback UI.
 */
const SmartImage = ({ src, alt, category, status }: { 
  src: string; 
  alt: string; 
  category: string;
  status: string;
}) => {
  const [error, setError] = useState(false);

  // Get category-specific icon
  const getCategoryIcon = () => {
  const categoryIcons: Record<string, ReactElement> = {
      'Digital Services': <Server className="w-6 h-6" />,
      'Industrial Chemicals': <Beaker className="w-6 h-6" />,
      'Agrochemicals': <Leaf className="w-6 h-6" />,
      'Medical Equipment': <Shield className="w-6 h-6" />,
      'Industrial Lubricants': <Droplets className="w-6 h-6" />,
      'Packaging Materials': <Package className="w-6 h-6" />,
      'Energy Storage': <Battery className="w-6 h-6" />,
      'Medical Chemicals': <Pill className="w-6 h-6" />,
      'Water Treatment': <Droplets className="w-6 h-6" />,
      'Pharmaceutical Materials': <Pill className="w-6 h-6" />,
      'Energy Management': <Battery className="w-6 h-6" />,
      'Industrial Materials': <Factory className="w-6 h-6" />,
    };
    return categoryIcons[category] || <Package className="w-6 h-6" />;
  };

  // Get status-specific background color
  const getStatusColor = () => {
    const statusColors: Record<string, string> = {
      'Draft': 'bg-slate-100 border-slate-200',
      'Submitted': 'bg-blue-50 border-blue-200',
      'Published': 'bg-emerald-50 border-emerald-200'
    };
    return statusColors[status] || 'bg-slate-100 border-slate-200';
  };

  if (!src || error) {
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center p-6 ${getStatusColor()} border-b`}>
        <div className="relative mb-4">
          {/* Status indicator */}
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
            status === 'Draft' ? 'bg-slate-400' :
            status === 'Submitted' ? 'bg-blue-400' :
            'bg-emerald-400'
          }`} />
          
          {/* Icon container */}
          <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
            <div className={`${
              status === 'Draft' ? 'text-slate-400' :
              status === 'Submitted' ? 'text-blue-400' :
              'text-emerald-400'
            }`}>
              {getCategoryIcon()}
            </div>
          </div>
        </div>
        
        {/* Status label */}
        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider mb-2 ${
          status === 'Draft' ? 'bg-slate-200 text-slate-700' :
          status === 'Submitted' ? 'bg-blue-100 text-blue-700' :
          'bg-emerald-100 text-emerald-700'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${
            status === 'Draft' ? 'bg-slate-500' :
            status === 'Submitted' ? 'bg-blue-500' :
            'bg-emerald-500'
          }`} />
          {status}
        </div>
        
        {/* Message */}
        <p className="text-[10px] font-medium text-slate-500 text-center">
          {error ? 'Image link unavailable' : 'No visual asset'}
        </p>
        <p className="text-[9px] text-slate-400 mt-1 text-center">
          {category}
        </p>
        
        {/* Info icon for error - MOVED TO BOTTOM RIGHT */}
        {error && (
          <div className="absolute bottom-2 right-2">
            <div className="flex items-center justify-center w-6 h-6 bg-amber-100 border border-amber-200 rounded-full">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image 
        src={src} 
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        onError={() => setError(true)}
        onLoad={() => setError(false)}
        priority={false}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
    </div>
  );
};

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');
  const [sortOrder, setSortOrder] = useState('updatedAt-desc');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Toggle favorite status
  const toggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    const filtered = PRODUCTS.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = 
        categoryFilter === 'All Categories' || p.category === categoryFilter;
      
      const matchesStatus = 
        statusFilter === 'All Statuses' || p.status === statusFilter;

      const matchesFavorite = !showOnlyFavorites || favorites.has(p.id);

      return matchesSearch && matchesCategory && matchesStatus && matchesFavorite;
    });

    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortOrder === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOrder === 'name-desc') return b.name.localeCompare(a.name);
      if (sortOrder === 'updatedAt-desc') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      if (sortOrder === 'updatedAt-asc') return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      if (sortOrder === 'favorite') {
        const aIsFavorite = favorites.has(a.id);
        const bIsFavorite = favorites.has(b.id);
        if (aIsFavorite && !bIsFavorite) return -1;
        if (!aIsFavorite && bIsFavorite) return 1;
        return 0;
      }
      return 0;
    });
  }, [searchTerm, categoryFilter, statusFilter, sortOrder, favorites, showOnlyFavorites]);

  // Count active filters
  const activeFilterCount = [
    searchTerm !== '',
    categoryFilter !== 'All Categories',
    statusFilter !== 'All Statuses',
    showOnlyFavorites
  ].filter(Boolean).length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Institutional Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Product Disclosure Registry</h1>
            <p className="mt-1 text-sm text-slate-500 max-w-xl">
              Producer-declared technical specifications and compliance documentation
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Favorites Counter */}
            {favorites.size > 0 && (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-full px-3 py-1.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span className="text-xs font-medium text-rose-700">
                  {favorites.size} favorite{favorites.size !== 1 ? 's' : ''}
                </span>
              </div>
            )}
            <div className="text-right hidden md:block">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                System Status: <span className="text-emerald-600">Operational</span>
              </span>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('All Categories');
                  setStatusFilter('All Statuses');
                  setShowOnlyFavorites(false);
                }}
                className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Clear filters ({activeFilterCount})
              </button>
            )}
          </div>
        </div>

        {/* Filter Surface */}
        <div className="mb-8 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Search & Filter</h2>
          </div>
          
          {/* First Row: Search Only - Full Width */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products, producers, or descriptions..." 
                className="w-full pl-12 pr-10 py-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Second Row: Category, Status Filter, Sort */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            {/* Category Dropdown */}
            <div className="relative">
              <label className="block text-xs font-medium text-slate-500 mb-2">Category</label>
              <select 
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white pl-4 pr-10 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-2">Status</label>
              <div className="flex items-center gap-1.5">
                <div className="flex flex-1 gap-1">
                  {STATUSES.map(status => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(statusFilter === status ? 'All Statuses' : status)}
                      className={`flex-1 px-2 py-2 text-[10px] font-medium rounded-md transition-all min-w-0 truncate ${
                        statusFilter === status
                          ? status === 'Draft'
                            ? 'bg-slate-800 text-white shadow-sm'
                            : status === 'Submitted'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-emerald-600 text-white shadow-sm'
                          : status === 'Draft'
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : status === 'Submitted'
                          ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                      title={status}
                    >
                      <span className="hidden xs:inline">{status}</span>
                      <span className="xs:hidden">
                        {status === 'Draft' ? 'Draft' : status === 'Submitted' ? 'Submitted' : 'Published'}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStatusFilter('All Statuses')}
                  className={`px-3 py-2 text-[10px] font-medium rounded-md transition-all whitespace-nowrap ${
                    statusFilter === 'All Statuses'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All
                </button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <label className="block text-xs font-medium text-slate-500 mb-2">Sort by</label>
              <select 
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white pl-4 pr-10 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                <option value="favorite">Favorites First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Favorites Filter Toggle */}
            <div className="flex items-end">
              <button
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                  showOnlyFavorites
                    ? 'bg-rose-50 border-rose-200 text-rose-700 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                <span className="text-sm font-medium">
                  {showOnlyFavorites ? 'Showing Favorites' : 'Show Favorites'}
                </span>
              </button>
            </div>
          </div>

          {/* Active filters display */}
          {activeFilterCount > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-slate-600">Active filters:</span>
                {searchTerm && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    Search: &ldquo;{searchTerm}&rdquo;
                    <button onClick={() => setSearchTerm('')} className="hover:text-blue-900">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {categoryFilter !== 'All Categories' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                    Category: {categoryFilter}
                    <button onClick={() => setCategoryFilter('All Categories')} className="hover:text-slate-900">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {statusFilter !== 'All Statuses' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                    Status: {statusFilter}
                    <button onClick={() => setStatusFilter('All Statuses')} className="hover:text-slate-900">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {showOnlyFavorites && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-full text-xs font-medium">
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    Showing favorites only
                    <button onClick={() => setShowOnlyFavorites(false)} className="hover:text-rose-900">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Product Disclosures ({filteredProducts.length})
              {showOnlyFavorites && favorites.size > 0 && (
                <span className="ml-2 text-sm font-normal text-rose-600">
                  ({favorites.size} favorite{favorites.size !== 1 ? 's' : ''})
                </span>
              )}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {activeFilterCount > 0 ? `${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} applied` : 'Showing all disclosures'}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Draft
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Submitted
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Published
            </span>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const isFavorite = favorites.has(product.id);
            return (
              <div 
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group relative flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer overflow-hidden active:scale-[0.99]"
              >
                {/* Card Image Area with Smart Fallback */}
                <div className="relative h-48 w-full overflow-hidden">
                  <SmartImage 
                    src={product.imageUrl} 
                    alt={product.name} 
                    category={product.category}
                    status={product.status}
                  />
                  
                  {/* Badge Component - Top Right */}
                  <div className="absolute top-3 right-3 z-10">
                    <Badge status={product.status} />
                  </div>

                  {/* Favorite Button - Top Left */}
                  <button
                    onClick={(e) => toggleFavorite(product.id, e)}
                    className={`absolute top-3 left-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                      isFavorite
                        ? 'bg-rose-500/90 text-white hover:bg-rose-600/90 shadow-lg shadow-rose-200'
                        : 'bg-white/80 text-slate-400 hover:bg-white hover:text-rose-400 shadow-sm'
                    }`}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isFavorite ? (
                      <Heart className="w-4 h-4 fill-current" />
                    ) : (
                      <Heart className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                       <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                        ID-{product.id.padStart(4, '0')}
                       </span>
                        {isFavorite && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-full">
                            <Heart className="w-2.5 h-2.5 fill-rose-500" />
                            Saved
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                    </div>
                    {product.evidenceCount > 0 && (
                      <div className="flex items-center gap-1 text-[9px] font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-full">
                      <FileText className="w-3 h-3" />
                      {product.evidenceCount}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center text-[11px] text-slate-500 font-medium">
                      <Building2 className="w-3.5 h-3.5 mr-2 text-slate-300 flex-shrink-0" />
                      <span className="truncate" title={product.producer}>{product.producer}</span>
                    </div>
                    <div className="flex items-center text-[11px] text-slate-500 font-medium">
                      <Tag className="w-3.5 h-3.5 mr-2 text-slate-300 flex-shrink-0" />
                      <span className="truncate" title={product.category}>{product.category}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center text-[10px] font-medium text-slate-400">
                      <Calendar className="w-3 h-3 mr-1.5" />
                      {new Date(product.updatedAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="text-[10px] font-bold text-slate-900 group-hover:translate-x-1 transition-transform">
                       VIEW DETAILS →
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State UI */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center bg-white rounded-xl border border-slate-200">
            <div className="inline-flex p-5 rounded-2xl bg-slate-50 text-slate-300 mb-5">
              {showOnlyFavorites && favorites.size === 0 ? (
                <Heart className="w-10 h-10" />
              ) : (
                <Search className="w-10 h-10" />
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {showOnlyFavorites && favorites.size === 0 
                ? 'No favorites yet' 
                : 'No disclosures match your criteria'}
            </h3>
            <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
              {showOnlyFavorites && favorites.size === 0
                ? 'Click the heart icon on any product to add it to your favorites.'
                : 'Try adjusting your search terms or filters to find what you&apos;re looking for.'}
            </p>
            <div className="mt-8 flex gap-3 justify-center">
              {showOnlyFavorites ? (
                <button
                  onClick={() => setShowOnlyFavorites(false)}
                  className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Show All Products
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { 
                      setSearchTerm(''); 
                      setCategoryFilter('All Categories'); 
                      setStatusFilter('All Statuses'); 
                      setShowOnlyFavorites(false);
                    }}
                    className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Reset all filters
                  </button>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-5 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  >
                    Clear search
                  </button>
                </>
              )}
            </div>
          </div>
        )}
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