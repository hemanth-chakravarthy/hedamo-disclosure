export type Status = 'Draft' | 'Submitted' | 'Published';

export interface Version {
  id: string;
  timestamp: string;
  status: Status;
  declaredBy: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  producer: string;
  status: Status;
  updatedAt: string;
  evidenceCount: number;
  versions: Version[];
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Eco-Industrial Solvent-X',
    category: 'Industrial Chemicals',
    producer: 'ChemCorp Industries',
    status: 'Published',
    updatedAt: '2024-05-12T14:30:00Z',
    evidenceCount: 4,
    versions: [
      { id: 'v2', timestamp: '2024-05-12T14:30:00Z', status: 'Published', declaredBy: 'Sarah Jenkins' },
      { id: 'v1', timestamp: '2024-05-10T09:15:00Z', status: 'Submitted', declaredBy: 'Sarah Jenkins' }
    ]
  },
  {
    id: '2',
    name: 'Global-Reach Logistics API',
    category: 'Digital Services',
    producer: 'SoftNodes Ltd.',
    status: 'Draft',
    updatedAt: '2024-05-14T11:00:00Z',
    evidenceCount: 0,
    versions: [
      { id: 'v1', timestamp: '2024-05-14T11:00:00Z', status: 'Draft', declaredBy: 'Marcus Zhao' }
    ]
  },
  {
    id: '3',
    name: 'Agricultural Fertilizer Plus',
    category: 'Agrochemicals',
    producer: 'GreenField Agro',
    status: 'Submitted',
    updatedAt: '2024-05-13T16:45:00Z',
    evidenceCount: 2,
    versions: [
      { id: 'v1', timestamp: '2024-05-13T16:45:00Z', status: 'Submitted', declaredBy: 'Robert Chen' }
    ]
  },
  {
    id: '4',
    name: 'Medical Device Sterilizer 3000',
    category: 'Medical Equipment',
    producer: 'MediSafe Technologies',
    status: 'Published',
    updatedAt: '2024-05-10T10:20:00Z',
    evidenceCount: 5,
    versions: [
      { id: 'v3', timestamp: '2024-05-10T10:20:00Z', status: 'Published', declaredBy: 'Dr. Elena Rodriguez' },
      { id: 'v2', timestamp: '2024-05-08T14:15:00Z', status: 'Submitted', declaredBy: 'Dr. Elena Rodriguez' },
      { id: 'v1', timestamp: '2024-05-05T09:30:00Z', status: 'Draft', declaredBy: 'Dr. Elena Rodriguez' }
    ]
  },
  {
    id: '5',
    name: 'Blockchain Supply Chain Platform',
    category: 'Digital Services',
    producer: 'ChainSecure Inc.',
    status: 'Published',
    updatedAt: '2024-05-11T13:00:00Z',
    evidenceCount: 3,
    versions: [
      { id: 'v2', timestamp: '2024-05-11T13:00:00Z', status: 'Published', declaredBy: 'Alex Thompson' },
      { id: 'v1', timestamp: '2024-05-09T11:45:00Z', status: 'Submitted', declaredBy: 'Alex Thompson' }
    ]
  },
  {
    id: '6',
    name: 'Heavy Machinery Lubricant',
    category: 'Industrial Lubricants',
    producer: 'PowerDrive Engineering',
    status: 'Draft',
    updatedAt: '2024-05-14T09:30:00Z',
    evidenceCount: 1,
    versions: [
      { id: 'v1', timestamp: '2024-05-14T09:30:00Z', status: 'Draft', declaredBy: 'James Wilson' }
    ]
  },
  {
    id: '7',
    name: 'Recycled Plastic Packaging',
    category: 'Packaging Materials',
    producer: 'EcoPack Solutions',
    status: 'Submitted',
    updatedAt: '2024-05-12T15:20:00Z',
    evidenceCount: 4,
    versions: [
      { id: 'v1', timestamp: '2024-05-12T15:20:00Z', status: 'Submitted', declaredBy: 'Maria Garcia' }
    ]
  },
  {
    id: '8',
    name: 'Data Analytics Dashboard v2.0',
    category: 'Digital Services',
    producer: 'DataInsight Corp',
    status: 'Published',
    updatedAt: '2024-05-09T12:10:00Z',
    evidenceCount: 6,
    versions: [
      { id: 'v3', timestamp: '2024-05-09T12:10:00Z', status: 'Published', declaredBy: 'Priya Sharma' },
      { id: 'v2', timestamp: '2024-05-07T16:00:00Z', status: 'Submitted', declaredBy: 'Priya Sharma' },
      { id: 'v1', timestamp: '2024-05-05T10:30:00Z', status: 'Draft', declaredBy: 'Priya Sharma' }
    ]
  },
  {
    id: '9',
    name: 'Organic Fertilizer Concentrate',
    category: 'Agrochemicals',
    producer: 'BioGrow Organics',
    status: 'Published',
    updatedAt: '2024-05-08T14:50:00Z',
    evidenceCount: 3,
    versions: [
      { id: 'v2', timestamp: '2024-05-08T14:50:00Z', status: 'Published', declaredBy: 'Thomas Brown' },
      { id: 'v1', timestamp: '2024-05-06T11:25:00Z', status: 'Submitted', declaredBy: 'Thomas Brown' }
    ]
  },
  {
    id: '10',
    name: 'Industrial Battery Pack',
    category: 'Energy Storage',
    producer: 'VoltMax Energy',
    status: 'Draft',
    updatedAt: '2024-05-15T10:15:00Z',
    evidenceCount: 2,
    versions: [
      { id: 'v1', timestamp: '2024-05-15T10:15:00Z', status: 'Draft', declaredBy: 'Kim Lee' }
    ]
  },
  {
    id: '11',
    name: 'Hospital Disinfectant Solution',
    category: 'Medical Chemicals',
    producer: 'SteriClean Medical',
    status: 'Published',
    updatedAt: '2024-05-07T13:45:00Z',
    evidenceCount: 5,
    versions: [
      { id: 'v3', timestamp: '2024-05-07T13:45:00Z', status: 'Published', declaredBy: 'Dr. Michael Park' },
      { id: 'v2', timestamp: '2024-05-05T15:20:00Z', status: 'Submitted', declaredBy: 'Dr. Michael Park' },
      { id: 'v1', timestamp: '2024-05-03T10:10:00Z', status: 'Draft', declaredBy: 'Dr. Michael Park' }
    ]
  },
  {
    id: '12',
    name: 'AI-Powered Risk Assessment Tool',
    category: 'Digital Services',
    producer: 'RiskIntel AI',
    status: 'Submitted',
    updatedAt: '2024-05-13T11:30:00Z',
    evidenceCount: 4,
    versions: [
      { id: 'v1', timestamp: '2024-05-13T11:30:00Z', status: 'Submitted', declaredBy: 'David Miller' }
    ]
  },
  {
    id: '13',
    name: 'Industrial Water Purifier',
    category: 'Water Treatment',
    producer: 'AquaPure Systems',
    status: 'Published',
    updatedAt: '2024-05-06T16:20:00Z',
    evidenceCount: 7,
    versions: [
      { id: 'v4', timestamp: '2024-05-06T16:20:00Z', status: 'Published', declaredBy: 'Sophie Martin' },
      { id: 'v3', timestamp: '2024-05-04T14:30:00Z', status: 'Submitted', declaredBy: 'Sophie Martin' },
      { id: 'v2', timestamp: '2024-05-02T11:45:00Z', status: 'Draft', declaredBy: 'Sophie Martin' },
      { id: 'v1', timestamp: '2024-04-30T09:15:00Z', status: 'Draft', declaredBy: 'Sophie Martin' }
    ]
  },
  {
    id: '14',
    name: 'Biodegradable Cleaning Agent',
    category: 'Industrial Chemicals',
    producer: 'CleanEarth Solutions',
    status: 'Draft',
    updatedAt: '2024-05-15T14:00:00Z',
    evidenceCount: 0,
    versions: [
      { id: 'v1', timestamp: '2024-05-15T14:00:00Z', status: 'Draft', declaredBy: 'Lisa Wong' }
    ]
  },
  {
    id: '15',
    name: 'IoT Fleet Management System',
    category: 'Digital Services',
    producer: 'LogiTech IoT',
    status: 'Published',
    updatedAt: '2024-05-10T09:45:00Z',
    evidenceCount: 5,
    versions: [
      { id: 'v3', timestamp: '2024-05-10T09:45:00Z', status: 'Published', declaredBy: 'Raj Patel' },
      { id: 'v2', timestamp: '2024-05-08T13:20:00Z', status: 'Submitted', declaredBy: 'Raj Patel' },
      { id: 'v1', timestamp: '2024-05-06T10:00:00Z', status: 'Draft', declaredBy: 'Raj Patel' }
    ]
  },
  {
    id: '16',
    name: 'Pharmaceutical Grade Excipients',
    category: 'Pharmaceutical Materials',
    producer: 'PharmaPure Corp',
    status: 'Submitted',
    updatedAt: '2024-05-12T12:15:00Z',
    evidenceCount: 3,
    versions: [
      { id: 'v1', timestamp: '2024-05-12T12:15:00Z', status: 'Submitted', declaredBy: 'Dr. Anna Schmidt' }
    ]
  },
  {
    id: '17',
    name: 'Renewable Energy Controller',
    category: 'Energy Management',
    producer: 'SolarEdge Technologies',
    status: 'Published',
    updatedAt: '2024-05-08T11:30:00Z',
    evidenceCount: 6,
    versions: [
      { id: 'v2', timestamp: '2024-05-08T11:30:00Z', status: 'Published', declaredBy: 'Carlos Hernandez' },
      { id: 'v1', timestamp: '2024-05-06T14:45:00Z', status: 'Submitted', declaredBy: 'Carlos Hernandez' }
    ]
  },
  {
    id: '18',
    name: 'Advanced Composite Material',
    category: 'Industrial Materials',
    producer: 'MatTech Innovations',
    status: 'Draft',
    updatedAt: '2024-05-14T16:10:00Z',
    evidenceCount: 1,
    versions: [
      { id: 'v1', timestamp: '2024-05-14T16:10:00Z', status: 'Draft', declaredBy: 'Nina Petrova' }
    ]
  },
  {
    id: '19',
    name: 'Cybersecurity Monitoring Platform',
    category: 'Digital Services',
    producer: 'SecureNet Systems',
    status: 'Published',
    updatedAt: '2024-05-09T15:40:00Z',
    evidenceCount: 8,
    versions: [
      { id: 'v4', timestamp: '2024-05-09T15:40:00Z', status: 'Published', declaredBy: 'Kevin Johnson' },
      { id: 'v3', timestamp: '2024-05-07T10:20:00Z', status: 'Submitted', declaredBy: 'Kevin Johnson' },
      { id: 'v2', timestamp: '2024-05-05T13:30:00Z', status: 'Draft', declaredBy: 'Kevin Johnson' },
      { id: 'v1', timestamp: '2024-05-03T09:00:00Z', status: 'Draft', declaredBy: 'Kevin Johnson' }
    ]
  },
  {
    id: '20',
    name: 'Food Grade Packaging Film',
    category: 'Packaging Materials',
    producer: 'SafePack Foods',
    status: 'Submitted',
    updatedAt: '2024-05-13T14:25:00Z',
    evidenceCount: 2,
    versions: [
      { id: 'v1', timestamp: '2024-05-13T14:25:00Z', status: 'Submitted', declaredBy: 'Emma Wilson' }
    ]
  }
];

export const CATEGORIES = [
  'All Categories',
  'Industrial Chemicals',
  'Digital Services',
  'Agrochemicals',
  'Medical Equipment',
  'Industrial Lubricants',
  'Packaging Materials',
  'Energy Storage',
  'Medical Chemicals',
  'Water Treatment',
  'Pharmaceutical Materials',
  'Energy Management',
  'Industrial Materials'
];

export const STATUSES: Status[] = ['Draft', 'Submitted', 'Published'];

export const SORT_OPTIONS = [
  { value: 'updatedAt-desc', label: 'Newest First' },
  { value: 'updatedAt-asc', label: 'Oldest First' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'producer-asc', label: 'Producer (A-Z)' },
  { value: 'category-asc', label: 'Category (A-Z)' }
];

export const STATUS_COLORS: Record<Status, string> = {
  Draft: 'bg-gray-100 text-gray-700 border-gray-200',
  Submitted: 'bg-blue-50 text-blue-700 border-blue-200',
  Published: 'bg-emerald-50 text-emerald-700 border-emerald-200'
};

export const CATEGORY_COLORS: Record<string, string> = {
  'Digital Services': 'text-purple-600 bg-purple-50',
  'Industrial Chemicals': 'text-blue-600 bg-blue-50',
  'Agrochemicals': 'text-green-600 bg-green-50',
  'Medical Equipment': 'text-red-600 bg-red-50',
  'Industrial Lubricants': 'text-orange-600 bg-orange-50',
  'Packaging Materials': 'text-amber-600 bg-amber-50',
  'Energy Storage': 'text-cyan-600 bg-cyan-50',
  'Medical Chemicals': 'text-pink-600 bg-pink-50',
  'Water Treatment': 'text-teal-600 bg-teal-50',
  'Pharmaceutical Materials': 'text-indigo-600 bg-indigo-50',
  'Energy Management': 'text-lime-600 bg-lime-50',
  'Industrial Materials': 'text-gray-600 bg-gray-50'
};