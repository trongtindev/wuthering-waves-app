import { defineStore } from 'pinia';
import {
  mdiHomeOutline,
  mdiChartBarStacked,
  mdiCounter,
  mdiAccountGroup,
  mdiTrophy,
  mdiListStatus,
  mdiChartTimeline,
  mdiWalletGiftcard,
  mdiMap,
  mdiCalendar,
  mdiGrid,
  mdiCompareHorizontal,
  mdiBagPersonal
} from '@mdi/js';

export interface IMenu {
  url?: string;
  icon: string;
  title: string;
  items?: IMenu[];
  beta?: boolean;
  upcoming?: boolean;
}

export const useSidebar = defineStore('useSidebar', () => {
  // uses
  const analytics = useAnalytics();

  // states
  const notify = ref<{
    [key: string]: {
      value: number;
      policy?: 'default' | 'resetOnVisit';
    };
  }>({});
  const open = ref();
  const items = ref<IMenu[]>([
    {
      url: '/',
      icon: mdiHomeOutline,
      title: 'sidebar.home'
    },
    {
      url: '/convene-history',
      icon: mdiCounter,
      title: 'sidebar.conveneHistory'
    },
    {
      url: '/timeline',
      icon: mdiCalendar,
      title: 'sidebar.timeline'
    },
    {
      url: '/map',
      icon: mdiMap,
      title: 'sidebar.map',
      beta: true
    },
    {
      url: '/characters',
      icon: '/icons/character.png',
      title: 'sidebar.characters'
    },
    {
      url: '/codes',
      icon: mdiWalletGiftcard,
      title: 'sidebar.codes'
    },
    {
      url: '/teams',
      icon: mdiAccountGroup,
      title: 'sidebar.teams',
      upcoming: true
    },
    {
      url: '/leaderboards',
      icon: mdiChartTimeline,
      title: 'sidebar.leaderboards',
      upcoming: true
    },
    {
      url: '/tier-list',
      icon: mdiChartBarStacked,
      title: 'sidebar.tierList',
      upcoming: true
    },
    {
      url: '/todo-list',
      icon: mdiListStatus,
      title: 'sidebar.todoList',
      upcoming: true
    },
    {
      url: '/guides',
      icon: mdiMap,
      title: 'sidebar.guides',
      upcoming: true
    },
    {
      url: '/comparison',
      icon: mdiCompareHorizontal,
      title: 'sidebar.comparison',
      upcoming: true
    },
    {
      icon: mdiBagPersonal,
      title: 'sidebar.database',
      items: [
        {
          url: '/items',
          icon: mdiGrid,
          title: 'sidebar.items'
        },
        {
          url: '/trophies',
          icon: mdiTrophy,
          title: 'sidebar.trophies'
        },
        {
          url: '/echos',
          icon: '/icons/echo.png',
          title: 'sidebar.echos'
        },
        {
          url: '/weapons',
          icon: '/icons/weapon.png',
          title: 'sidebar.weapons'
        }
      ]
    }
  ]);

  // functions
  const togglePin = (url: string) => {};

  const setNotify = (
    url: string,
    value: number,
    policy?: 'default' | 'resetOnVisit'
  ) => {
    notify.value[url] = { value, policy };
  };

  // events
  const onOpened = (
    url: string,
    options?: {
      ignoreAnalytics?: boolean;
    }
  ) => {
    options ??= {};
    if (!options.ignoreAnalytics) {
      analytics.logEvent('sidebar', { url });
    }

    Object.keys(notify.value).forEach((e) => {
      if (notify.value[e].policy === 'resetOnVisit') {
        delete notify.value[e];
      }
    });

    // TODO: update count to sort
  };

  // lifecycle
  // onMounted(() => {
  //   setTimeout(() => {
  //     setNotify('/', 1, 'resetOnVisit');
  //   }, 1500);
  // });

  return { open, items, notify, togglePin, setNotify, onOpened };
});
