function onRouteDidUpdate({ location, prevLocation }) {
  if (location.pathname !== prevLocation?.pathname && typeof window.mixpanel !== 'undefined') {
    if (process.env.NODE_ENV === 'production') {
      mixpanel.track('Browse ' + window.location.pathname, {
        nonInteraction: true,
        branch: 'docs-20221105',
      });
    } else {
      console.info('Tracking: Browse ' + window.location.pathname);
    }
  }
}

module.exports = {
  onRouteDidUpdate,
};
