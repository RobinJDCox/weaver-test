// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const repoUrl = 'https://github.com/disneystreaming/weaver-test';

const siteConfig = {
  title: 'Weaver Test',
  tagline: 'A lean test-framework built on top of cats-effect and fs2',
  url: 'http(s)://disneystreaming.github.io/',
  baseUrl: '/weaver-test/',
  projectName: 'weaver-test',
  organizationName: 'disneystreaming',
  githubHost: 'github.com',
  repoUrl: repoUrl,
  // For no header links in the top nav bar -> headerLinks: [],
  separateCss: ["api"],
  headerLinks: [
    {doc: 'installation', label: 'Docs'},
    { href: repoUrl, label: "GitHub", external: true },
  ],

  headerIcon: 'img/dss-profile-white-transparent.svg',
  favicon: 'img/dss-profile-white-transparent.svg',

  colors: {
    primaryColor: '#336699',
    secondaryColor: '#F1034A',
  },
  copyright: `Copyright © ${new Date().getFullYear()} Disney Streaming Services`,

  highlight: {
    theme: 'default',
  },

  scripts: ['https://buttons.github.io/buttons.js'],

  onPageNav: 'separate',
  cleanUrl: true,

  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  twitter: true,
  twitterUsername: 'disneystreaming',

  customDocsPath: 'modules/docs/target/mdoc',

};

module.exports = siteConfig;
