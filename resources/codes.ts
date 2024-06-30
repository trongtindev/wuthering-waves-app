import type { ICode } from '@/interfaces/code';

const items: ICode[] = [
  {
    code: 'WUTHERING2024',
    expiredAt: '2024-05-23'
  },
  {
    code: 'WUTHERINGWAVESGIFT',
    expiredAt: '2024-05-23'
  },
  {
    code: 'WUTHERINGGIFT',
    rewards: [
      {
        item: 'Astrite',
        quantity: 50
      },
      {
        item: 'Premium Resonance Potion',
        quantity: 2
      },
      {
        item: 'Medium Revival Inhaler',
        quantity: 2
      },
      {
        item: 'Medium Energy Bag',
        quantity: 2
      },
      {
        item: 'Shell Credit',
        quantity: 10000
      }
    ],
    expiredAt: undefined
  },
  {
    code: 'BAHAMUTKXMHM',
    rewards: [
      {
        item: 'Medium Resonance Potion',
        quantity: 5
      },
      {
        item: 'Medium Energy Core',
        quantity: 5
      },
      {
        item: 'Shell Credit',
        quantity: 5000
      }
    ],
    expiredAt: undefined
  },
  {
    code: 'DCARD3VN7M',
    rewards: [
      {
        item: 'Medium Resonance Potion',
        quantity: 5
      },
      {
        item: 'Medium Energy Core',
        quantity: 5
      },
      {
        item: 'Shell Credit',
        quantity: 5000
      }
    ],
    expiredAt: undefined
  }
];
export default items;
