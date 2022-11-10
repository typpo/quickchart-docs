// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'QuickChart',
  tagline: 'Generate chart images with a simple, open API',
  url: 'https://quickchart.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',

  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'QuickChart', // Usually your GitHub org/user name.
  projectName: 'QuickChart', // Usually your repo name.

  clientModules: [require.resolve('./src/tracking')],
  plugins: [
    () => ({
      name: 'tracking',
      injectHtmlTags() {
        return {
          headTags: [
            {
              tagName: 'script',
              innerHTML: `
(function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
mixpanel.init('652c6ab04d3d810b2c40261c54e3106e');
              `,
            },
            {
              tagName: 'script',
              innerHTML: `window.$crisp=[];window.CRISP_WEBSITE_ID="a43e456a-341b-4db6-a36e-032ea932f531";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
            },
          ],
        };
      },
    }),
  ],

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
        gtag: {
          trackingID: 'UA-135627396-1',
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/typpo/quickchart-docs',
          path: 'documentation',
          routeBasePath: 'documentation',
          breadcrumbs: false,
        },
        /*
        blog: {
          showReadingTime: true,
          blogSidebarCount: 0,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/typpo/quickchart-docs',
        },
        */
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
        hideOnScroll: true,
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
          { to: 'https://quickchart.io/gallery/', label: 'Example Charts', position: 'right' },
          { to: 'https://quickchart.io/chart-maker/', label: 'Chart Maker', position: 'right' },
          { to: 'https://quickchart.io/contact/', label: 'Support', position: 'right' },
        ],
      },
      algolia: {
        appId: 'D8BRSEFH6M',
        apiKey: '84ef93de3bae3e85fdc336f02bda3a04',
        indexName: 'quickchart',
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
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
                to: '/documentation/',
              },
              {
                label: 'Chart gallery',
                to: 'https://quickchart.io/gallery/',
              },
              {
                label: 'Chart maker',
                to: 'https://quickchart.io/chart-maker/',
              },
              {
                label: 'Integrations',
                to: '/documentation/category/integrations/',
              },
              {
                label: 'QR codes',
                to: '/documentation/qr-codes/',
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
              {
                label: 'Managed solutions',
                href: 'https://quickchart.io/pricing/',
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
