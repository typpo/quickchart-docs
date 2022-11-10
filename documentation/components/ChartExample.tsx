import React from 'react';

// @ts-ignore: No types
import Loadable from '@docusaurus/react-loadable';

const ChartExample = Loadable({
  loader: () => import('./ChartExampleImpl'),
  loading: () => <span>Loading...</span>,
});

export default ChartExample;
