<script setup lang="ts">
import urlSlug from 'url-slug';
import { Bar, Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { CardPoolType, type IBanner } from '~/interfaces/banner';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
);

// uses
const i18n = useI18n();
const resources = useResources();

// fetch
const banners = await resources.getBanners();
const activeBanners = ref<IBanner[]>([]);
const displayBanner = ref<IBanner>();

// states
const types = ref([
  {
    name: 'Featured resonator',
    cardPoolType: CardPoolType['featured-resonator']
  },
  {
    name: 'Featured weapon',
    cardPoolType: CardPoolType['featured-weapon']
  },
  {
    name: 'Standard resonator',
    cardPoolType: CardPoolType['standard-resonator']
  },
  {
    name: 'Standard weapon',
    cardPoolType: CardPoolType['standard-weapon']
  }
]);
const filterType = ref<number>();
const filterBanner = ref<string>();

// computed
const bannerType = computed(() => {
  if (displayBanner.value) {
    if (
      [
        CardPoolType['featured-weapon'],
        CardPoolType['standard-weapon']
      ].includes(displayBanner.value.type)
    ) {
      return 'weapons';
    }
  }
  return 'characters';
});

// functions
const initialize = () => {
  filterType.value ??= CardPoolType['featured-resonator'];
  displayBanner.value = activeBanners.value.find((e) => {
    return e.name === filterBanner.value;
  });
};

// changes
watch(
  () => filterType.value,
  (value) => {
    const now = dayjs();
    activeBanners.value = banners.filter((e) => {
      if (e.time) {
        if (dayjs(e.time.start) > now) {
          return false;
        }
      }
      return e.type === value;
    });
    if (activeBanners.value.length > 0) {
      filterBanner.value = activeBanners.value[0].name;
    }
  }
);

watch(() => filterBanner.value, initialize);

// lifecycle
onMounted(initialize);

// seo meta
const title = i18n.t('meta.convene.global.title');
const description = i18n.t('meta.convene.global.description');

useApp().title = i18n.t('convene.global.title');
useHead({ title });
useSeoMeta({
  ogTitle: title,
  description,
  ogDescription: description
});
</script>

<template>
  <div>
    <!-- breadcrumbs -->
    <breadcrumbs
      :items="[
        {
          to: '/convene-history',
          title: i18n.t('convene.history.title')
        },
        {
          to: '/convene-history/global',
          title: i18n.t('Global')
        }
      ]"
    />

    <!-- alert -->
    <alert
      id="convene.global.alert"
      class="mb-2"
      color="info"
      :text="$t('convene.global.alert', [0])"
    />

    <!-- filter -->
    <v-row class="mt-1">
      <v-col cols="12" sm="4">
        <v-select
          v-model="filterType"
          :items="types"
          :label="$t('Type')"
          :hide-details="true"
          item-title="name"
          item-value="cardPoolType"
        />
      </v-col>

      <v-col cols="12" sm="8">
        <v-select
          v-model="filterBanner"
          :items="activeBanners"
          :label="$t('Banner')"
          :hide-details="true"
          item-title="name"
          item-value="name"
        />
      </v-col>
    </v-row>

    <!-- thumbnails -->
    <v-row class="mt-2">
      <v-col cols="12" sm="6">
        <v-responsive :aspect-ratio="16 / 9" class="border rounded bg-image">
          <v-img
            v-if="displayBanner && displayBanner.thumbnail"
            :src="displayBanner.thumbnail"
          />
        </v-responsive>
      </v-col>
    </v-row>

    <!-- summary -->
    <v-row class="mt-1">
      <v-col cols="12" sm="9">
        <v-row>
          <v-col cols="12" sm="7">
            <v-card class="fill-height d-flex">
              <v-card-text>
                <table>
                  <tr>
                    <td class="py-4 pl-4 pr-2 text-center">
                      <v-avatar :size="128" rounded>
                        <v-img
                          v-if="displayBanner && displayBanner.featuredRare"
                          :src="`/${bannerType}/icons/${urlSlug(displayBanner.featuredRare)}.webp`"
                        />
                      </v-avatar>
                    </td>

                    <td class="pl-2 pr-2 text-h3" style="width: 50%">
                      <div class="d-flex justify-end w-100">0</div>
                    </td>

                    <td class="pr-4" style="width: 30%">
                      <div class="w-100">
                        <div class="text-h6">
                          <span v-if="displayBanner">
                            {{ displayBanner.featuredRare }}
                          </span>
                          <span v-else>...</span>
                        </div>
                        <div class="text-gray-400">
                          {{ $t('common.summoned') }}
                        </div>
                        <p class="text-gray-400">0% won 50:50</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="5">
            <v-card class="fill-height d-flex align-center">
              <div class="w-100">
                <table class="w-100">
                  <tr>
                    <td
                      style="width: 60%"
                      class="text-rarity5 py-4 pl-4 pr-2 text-right"
                    >
                      <div class="w-100 text-h3">0%</div>
                    </td>

                    <td style="width: 40%" class="text-rarity5 py-4 pr-4">
                      <div>★★★★★</div>
                      <div>Total 0</div>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="width: 60%"
                      class="text-rarity4 py-4 pl-4 pr-2 text-right"
                    >
                      <div class="w-100 text-h3">0%</div>
                    </td>
                    <td style="width: 40%" class="text-rarity4 py-4 pr-4">
                      <div>★★★★</div>
                      <div>Total 0</div>
                    </td>
                  </tr>
                </table>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="3">
        <v-card class="fill-height">
          <v-list>
            <v-list-item :title="$t('convene.global.median')">
              <template #append> 0 </template>
            </v-list-item>
            <v-list-item :title="$t('convene.global.totalUsers')">
              <template #append> 0 </template>
            </v-list-item>
            <v-list-item :title="$t('convene.global.conveneTotal')">
              <template #append> 0 </template>
            </v-list-item>
            <v-list-item :title="$t('common.astrite')">
              <template #append> 0 </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- pullByDay -->
    <v-card class="mt-2">
      <v-card-text>
        <Line
          id="pullByDay"
          :options="{
            responsive: true,
            maintainAspectRatio: false
          }"
          :data="{
            labels: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July'
            ],
            datasets: [
              {
                label: i18n.t('convene.global.pullByDay'),
                backgroundColor: '#f87979',
                data: [40, 39, 10, 40, 39, 80, 40]
              }
            ]
          }"
        />
      </v-card-text>
    </v-card>

    <!-- rc -->
    <v-card class="mt-2">
      <v-card-text>
        <Bar
          id="my-chart-id"
          :options="{
            responsive: true
          }"
          :data="{
            labels: ['January', 'February', 'March'],
            datasets: [{ data: [40, 20, 12] }]
          }"
        />
      </v-card-text>
    </v-card>

    <v-row class="mt-4">
      <v-col>
        <v-card>
          <v-card-title class="text-rarity5">
            {{ $t('convene.global.fiveStar') }}
          </v-card-title>
          <v-divider />

          <v-card-text>
            <v-alert :text="$t('common.noRecords')" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-card-title class="text-rarity4">
            {{ $t('convene.global.fourStar') }}
          </v-card-title>
          <v-divider />

          <v-card-text>
            <v-alert :text="$t('common.noRecords')" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
