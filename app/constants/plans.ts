export const FREE_DOCUMENT_LIMIT = 5;

export interface PlanPoint {
  label: string;
  /** Set in bold in front of the label. */
  highlight?: string;
  included: boolean;
}

export interface Plan {
  id: 'free' | 'pro';
  name: string;
  price: string;
  period: string;
  lead: string;
  points: PlanPoint[];
  cta: string;
}

const SHARED_POINTS: PlanPoint[] = [
  { label: 'Hosted in the EU', included: true },
  { label: 'No tracking', included: true },
  { label: 'Support small tech', included: true },
];

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '0 €',
    period: 'for life',
    lead: `${FREE_DOCUMENT_LIMIT} documents, everything else included.`,
    points: [
      { highlight: String(FREE_DOCUMENT_LIMIT), label: 'docs', included: true },
      { label: 'Access control for collaboration', included: false },
      ...SHARED_POINTS,
      { label: 'Support development', included: false },
    ],
    cta: 'Don’t buy',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '25 €',
    period: 'a year',
    lead: 'As many documents as you can write.',
    points: [
      { highlight: 'Unlimited', label: 'docs', included: true },
      { label: 'Access control for collaboration', included: true },
      ...SHARED_POINTS,
      { label: 'Support development', included: true },
    ],
    cta: 'Buy',
  },
];
