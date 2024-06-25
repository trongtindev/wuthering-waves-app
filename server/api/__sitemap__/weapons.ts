import weapons from '~/resources/characters';

export default defineSitemapEventHandler(async () => {
  return weapons.map((e) => {
    return asSitemapUrl({
      loc: `/weapons/${e.slug}`,
      _i18nTransform: true
    });
  });
});
