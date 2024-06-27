import type { IEvent } from '~/interfaces/event';

const items = [
  [
    {
      url: 'https://wutheringwaves-echoes.kurogames-global.com/',
      name: 'Version 1.0',
      time: {
        start: '2024-05-22 10:00',
        end: '2024-06-28 06:00'
      },
      color: '#535353'
    },
    {
      name: 'Version 1.1',
      time: {
        start: '2024-06-28 13:00',
        end: '2024-07-27 10:00'
      },
      color: '#535353'
    }
  ],
  [
    {
      url: 'https://wutheringwaves-echoes.kurogames-global.com/',
      name: 'Echo Summon Web Event',
      time: {
        start: '2024-04-29 00:00',
        end: '2024-06-06 00:00'
      },
      color: '#bbb44e',
      thumbnail: '/events/covers/echo-summon.webp',
      description:
        "Log in with your Kuro Account to participate in this event. To claim the rewards, create a profile on the server you've pre-registered your Kuro Account under during this event after the official release of Wuthering Waves."
    },
    {
      name: 'Intensive Training – Limited Time EXP Material Double Drop Event',
      time: {
        start: '2024-06-06 04:00',
        end: '2024-06-13 03:59'
      },
      color: '#a5b8d1',
      thumbnail: '/events/covers/intensive-training.webp'
    },
    {
      name: 'Second Coming of Solaris',
      time: {
        start: '2024-06-13 04:00',
        end: '2024-06-27 03:59'
      },
      color: '#141427',
      thumbnail: '/events/covers/second-coming-of-solaris.webp',
      description:
        "Accept Maqi's daily commission and retrieve the items requested for rewards."
    }
  ],
  [
    {
      url: 'https://wutheringwaves.kurogames.com/en/main/news/detail/813',
      name: 'Overdash Club',
      time: {
        start: '2024-05-30 04:00',
        end: '2024-06-17 03:59'
      },
      color: '#c2a262',
      thumbnail:
        'https://hw-media-cdn-mingchao.kurogame.com/object/1716825600000/a3kz8j2pfjc2nyzz9k-1716864253876.jpg'
    },
    {
      name: '"Chord Cleansing" LT Echo Double Drop Event',
      time: {
        start: '2024-06-20 04:00',
        end: '2024-06-27 03:59'
      },
      color: '#6e371e',
      thumbnail: '/events/covers/chord-cleansing.webp',
      description:
        'During the Chord Cleansing event period, players can claim double the rewards from Tacet Suppressions.'
    }
  ],
  {
    name: 'Alloy Smelt – Limited Time Battle Event',
    time: {
      start: '2024-06-06 10:00',
      end: '2024-06-27 03:59'
    },
    color: '#181f35',
    thumbnail: '/events/covers/alloy-smelt.webp'
  },
  {
    name: 'Wuthering Exploration',
    time: {
      start: '2024-06-13 10:00',
      end: '2024-06-27 03:59'
    },
    color: '#b19abd',
    thumbnail: '/events/covers/wuthering-exploration.webp',
    description:
      'Complete Exploration Quests daily to get Exploration Points and claim rewards after achieving Exploration Point milestones.'
  },
  // Featured Weapon
  [
    {
      name: 'Absolute Pulsation: Verdant Summit',
      time: {
        start: '2024-05-23 10:00',
        end: '2024-06-13 09:59'
      },
      color: '#1f5456',
      thumbnail: '/cards/T_Card5.png'
    },
    {
      name: 'Absolute Pulsation: Ages of Harvest',
      time: {
        start: '2024-06-28 13:00',
        end: '2024-07-22 09:59'
      },
      color: '#143a4f',
      thumbnail: '/events/covers/ages-of-harvest.webp',
      description:
        'During the event, boosted drop rates for 5-Star Weapon: Ages of Harvest, 4-Star Weapons: Discord, Commando of Conviction, and Amity Accord!'
    }
  ],
  // Featured Resonator
  [
    {
      name: 'Prevail the Lasting Night – Jiyan',
      time: {
        start: '2024-05-23 10:00',
        end: '2024-06-13 09:59'
      },
      color: '#1f5456',
      thumbnail: '/cards/T_Card5.png'
    },
    {
      name: 'Thawborn Renewal — Jinhsi',
      time: {
        start: '2024-06-28 13:00',
        end: '2024-07-22 09:59'
      },
      color: '#b59270',
      thumbnail: '/events/covers/thawborn-renewal.webp',
      description:
        'During the event, boosted drop rates for 5-Star Resonator: Jinhsi, 4-Star Resonators: Sanhua, Danjin, and Yangyang!'
    }
  ],
  // jinlin
  {
    name: 'Absolute Pulsation: Stringmaster',
    time: {
      start: '2024-06-06 10:00',
      end: '2024-06-26 11:59'
    },
    color: '#721f29',
    thumbnail: '/events/covers/stringmaster.webp',
    description:
      'During the event, boosted drop rates for 5-star Weapon [Stringmaster], 4-star Weapons [Jinzhou Keeper], [Cadenza], and [Lunar Cutter]!'
  },
  {
    name: 'When Thunder Pours – Jinlin',
    time: {
      start: '2024-06-06 10:00',
      end: '2024-06-26 11:59'
    },
    color: '#0f1014',
    thumbnail: '/events/covers/when-thunder-pours.webp',
  }
];
export default items as IEvent[] | IEvent[][];
