<script setup lang="ts">
import { mdiPlus, mdiCake, mdiMapMarker, mdiSword, mdiPistol } from '@mdi/js';
import type { IItem } from '~/interfaces/item';

const i18n = useI18n();
const route = useRoute();
const router = useRouter();
const resources = useResources();
const localePath = useLocalePath();
const runtimeConfig = useRuntimeConfig();

// states
const dictItems = ref<{ [key: number]: IItem }>({});

// fetch data
const items = await resources.getItems();
const characters = await resources.characters();
const item = characters.find((e) => e.slug === route.params.id);
if (!item) throw createError({ statusCode: 404 });

const data = await resources.getCharacterData(item.slug);
if (!data) throw createError({ statusCode: 404 });

// computed
const weaponIcon = computed(() => {
  switch (item.weapon) {
    case 'Pistols':
      return mdiPistol;
  }
  return mdiSword;
});

const nameLocalized = computed(() => {
  // if (data.nameLocalized && data.nameLocalized[i18n.locale.value]) {
  //   return data.nameLocalized[i18n.locale.value];
  // }
  return i18n.t(item.name);
});

// lifecycle
onMounted(() => {
  data.ascensions.forEach((e) => {
    e.cost.forEach((cost) => {
      const item = items.find((item) => item.id === cost.item);
      if (item) dictItems.value[cost.item] = item;
    });
  });
});

// seo meta
const title = `${i18n.t('Character')}: ${nameLocalized.value}`;
const description = i18n.t('meta.characters.id.description', {
  name: nameLocalized.value,
  attribute: item.attribute
});
const ogImage = `${runtimeConfig.public.SITE_URL}/characters/icons/${item.slug}.webp`;

useApp().title = i18n.t('characters.title');
useHead({ title });
useSeoMeta({
  ogTitle: title,
  ogImage: ogImage,
  description,
  ogDescription: description
});
useJsonld(() => ({
  '@context': 'https://schema.org',
  '@type': 'ImageObject',
  contentUrl: `${runtimeConfig.public.SITE_URL}/characters/icons/${item.slug}.webp`,
  license: `${runtimeConfig.public.SITE_URL}/license`,
  acquireLicensePage: `${runtimeConfig.public.SITE_URL}/license/#how-to-use`,
  creditText: 'Wuthering Waves',
  creator: {
    '@type': 'Organization',
    name: 'Wuthering Waves'
  },
  copyrightNotice: 'trongtindev'
}));
</script>

<template>
  <div v-if="item && data">
    <!-- breadcrumbs -->
    <breadcrumbs
      :items="[
        {
          to: '/characters',
          title: i18n.t('characters.title')
        },
        {
          to: `/characters/${item.slug}`,
          title: i18n.t(item.name)
        }
      ]"
    />

    <v-card>
      <card-title>
        <template #title>
          <div :class="`text-rarity${item.rarity}`">
            <span> {{ i18n.t(item.name) }}</span>
            <span class="ml-2"> {{ item.rarity }} ★ </span>
          </div>
        </template>

        <template #actions>
          <edit-this-page
            :path="`/tree/main/resources/characters/${item.slug}.json`"
          />
        </template>
      </card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" class="d-flex justify-center align-center">
            <v-img
              :src="`/characters/portraits/${item.slug}.webp`"
              :alt="i18n.t(item.name)"
              :height="512"
            />
          </v-col>

          <v-col cols="12" md="8">
            <div class="d-flex flex-wrap ga-2">
              <v-chip
                :text="$t(data.birthplace)"
                :prepend-icon="mdiMapMarker"
              />
              <v-chip :text="data.birthday" :prepend-icon="mdiCake" />
              <v-chip :text="$t(item.weapon)" :prepend-icon="weaponIcon" />
              <v-chip :text="$t(item.attribute)" />
            </div>

            <div v-if="data.quote" class="mt-2" :innerHTML="data.quote"></div>
            <div
              v-if="data.description"
              class="mt-2"
              :innerHTML="data.description"
            ></div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Skills -->
    <v-card class="mt-4">
      <v-card-title>
        {{ $t('characters.skills') }}
      </v-card-title>
      <v-divider />

      <v-card-text>
        <v-row>
          <v-col
            v-for="(element, index) in data.skills"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card class="fill-height">
              <v-sheet class="pt-2">
                <v-list-item
                  :title="$t(element.name)"
                  :subtitle="$t(element.type)"
                >
                  <template #prepend>
                    <v-avatar class="border rounded">
                      <v-img
                        :src="`/skills/icons/${element.slug}.webp`"
                        :alt="element.name"
                      />
                    </v-avatar>
                  </template>
                </v-list-item>
              </v-sheet>

              <v-card-text v-if="element.description">
                <div
                  :innerHTML="element.description.replaceAll('\n', '<br/>')"
                />
              </v-card-text>
              <v-sheet v-else class="pb-2" />
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Resonance Chain -->
    <v-card class="mt-4">
      <v-card-title>
        {{ $t('characters.resonanceChain') }}
      </v-card-title>
      <v-divider />

      <v-card-text>
        <v-row>
          <v-col
            v-for="(element, index) in data.resonanceChain"
            :key="index"
            cols="12"
            md="6"
          >
            <v-card class="fill-height">
              <v-sheet class="pt-2">
                <v-list-item
                  :title="$t(element.name)"
                  :subtitle="$t(element.idx)"
                >
                  <template #prepend>
                    <v-avatar class="border rounded">
                      <v-img
                        :src="`/resonance_chain/icons/${element.slug}.webp`"
                        :alt="element.name"
                      />
                    </v-avatar>
                  </template>
                </v-list-item>
              </v-sheet>

              <v-card-text v-if="element.description">
                <div
                  :innerHTML="
                    element.description
                      .replace(/\{(\d+)\}/g, (_, j) => element.params[j] || '')
                      .replaceAll('\n', '<br/>')
                  "
                />
              </v-card-text>
              <v-sheet v-else class="pb-2" />
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Ascension Material -->
    <v-card class="mt-4">
      <v-card-title>
        {{ $t('common.ascensionMaterial') }}
      </v-card-title>
      <v-divider />

      <v-card-text
        v-for="(ascension, index) in data.ascensions.filter(
          (e) => e.cost.length > 0
        )"
        :key="index"
      >
        <v-row>
          <v-col cols="12" sm="3" md="2">
            <v-card
              class="d-flex align-center justify-center text-center text-h6 fill-height pa-2"
            >
              Lv. {{ ascension.minLevel }}
            </v-card>
          </v-col>

          <v-col
            v-for="(cost, j) in ascension.cost"
            :key="j"
            cols="4"
            sm="3"
            md="2"
          >
            <v-card
              :to="
                dictItems[cost.item]
                  ? localePath(`/items/${dictItems[cost.item].slug}`)
                  : `/items`
              "
            >
              <v-responsive :aspect-ratio="1">
                <v-img
                  v-if="dictItems[cost.item]"
                  :src="`/items/icons/${dictItems[cost.item].slug}.webp`"
                  :alt="$t(dictItems[cost.item].name)"
                  class="align-end h-100"
                  cover
                />
              </v-responsive>
              <v-divider />

              <v-card-title class="text-center">
                x{{ formatNumber(cost.quantity) }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />

      <v-card-actions class="d-flex align-center justify-end">
        <v-btn
          :to="localePath(`/todo-list/create?type=character&slug=${item.slug}`)"
          :text="$t('Add to Todo list')"
          :append-icon="mdiPlus"
          variant="outlined"
        />
      </v-card-actions>
    </v-card>

    <!-- Recommended Weapons -->
    <!--    <v-card class="mt-4">-->
    <!--      <v-card-title>-->
    <!--        {{ $t('Recommended Weapons') }}-->
    <!--      </v-card-title>-->
    <!--    </v-card>-->

    <div class="mt-4">
      <comments :channel="route.path" />
    </div>
  </div>
</template>
