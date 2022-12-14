/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docsSidebar: [{ type: 'autogenerated', dirName: '.' }],

  guideSidebar: [{}],

  googleImageChartsSidebar: [
    {
      type: 'doc',
      id: 'integrations/google-image-charts/migrating-from-google-image-charts',
    },
    {
      type: 'doc',
      id: 'integrations/google-image-charts/parameters',
    },
    {
      type: 'doc',
      id: 'integrations/google-image-charts/examples',
    },
    {
      type: 'link',
      label: 'Full docs',
      href: '/documentation',
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['using-the-api'],
    },
  ],
  */
};

module.exports = sidebars;
