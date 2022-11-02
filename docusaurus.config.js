// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'QuickChart',
  tagline: 'Dinosaurs are cool',
  url: 'https://quickchart.io/documentation/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'QuickChart', // Usually your GitHub org/user name.
  projectName: 'QuickChart', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/typpo/quickchart-docs',
          path: 'documentation',
          routeBasePath: 'documentation',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/typpo/quickchart-docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themes: ['mdx-v2'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'QuickChart',
        logo: {
          alt: 'QuickChart logo',
          src: 'https://quickchart.io/images/bar_chart_logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'right',
            label: 'Docs',
          },
          { to: '/gallery/', label: 'Example Charts', position: 'right' },
          { to: '/chart-maker/', label: 'Chart Builder', position: 'right' },
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Get started',
                to: '/documentation/intro/',
              },
              {
                label: 'Chart gallery',
                to: '/gallery/',
              },
              {
                label: 'Chart builder',
                to: '/chart-maker/',
              },
              {
                label: 'Guides',
                to: '/documentation/guides/',
              },
              {
                label: 'Integrations',
                to: '/documentation/integrations/',
              },
            ],
          },
          {
            title: 'Libraries',
            items: [
              {
                label: 'Javascript',
                href: 'https://github.com/typpo/quickchart-js',
              },
              {
                label: 'Python',
                href: 'https://github.com/typpo/quickchart-python',
              },
              {
                label: 'Ruby',
                href: 'https://github.com/typpo/quickchart-ruby',
              },
              {
                label: 'PHP',
                href: 'https://github.com/typpo/quickchart-php',
              },
              {
                label: 'C#',
                href: 'https://github.com/typpo/quickchart-csharp',
              },
              {
                label: 'Java',
                href: 'https://github.com/typpo/quickchart-java',
              },
              {
                label: 'Go',
                href: 'https://github.com/henomis/quickchart-go',
              },
              {
                label: 'chartjs-to-image',
                href: 'https://www.npmjs.com/package/chartjs-to-image',
              },
            ],
          },
          {
            title: 'Need help?',
            items: [
              {
                label: 'QuickChart Community',
                href: 'https://community.quickchart.io/',
              },
              {
                label: 'Contact Support',
                href: 'https://quickchart.io/contact/',
              },
              {
                label: 'Open source',
                href: 'https://github.com/typpo/quickchart',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} QuickChart`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['ruby', 'php', 'csharp', 'java'],
      },
    }),
};

module.exports = config;
