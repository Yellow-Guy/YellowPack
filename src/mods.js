// should be an array of objects with properties url, path, and name
// all mods should be for 1.10.2
module.exports = [
  {
    name: 'Tinker\'s Construct',
    path: 'tinkers-construct.jar',
    url: 'https://addons-origin.cursecdn.com/files/2353/329/TConstruct-1.10.2-2.6.1.jar'
  },
  {
    name: 'Mekanism',
    path: 'mekanism.jar',
    url: 'http://aidancbrady.com/wp-content/uploads/mekanism/295-recommended/Mekanism-1.10.2-9.2.1.295.jar'
  },
  {
    name: 'MekanismTools',
    path: 'mekanism-tools.jar',
    url: 'http://aidancbrady.com/wp-content/uploads/mekanism/295-recommended/MekanismTools-1.10.2-9.2.1.295.jar'
  },
  {
    name: 'Extra Utilities 2',
    path: 'exu.jar',
    url: 'https://addons-origin.cursecdn.com/files/2355/919/extrautils2-1.10.2-1.1.3a.jar'
  },
  {
    name: 'Chisels & Bits',
    path: 'chiselsandbits.jar',
    url: 'https://addons-origin.cursecdn.com/files/2350/460/chiselsandbits-12.8.jar'
  },
  {
    name: 'ProjectE',
    path: 'projecte.jar',
    url: 'https://addons-origin.cursecdn.com/files/2357/355/ProjectE-1.10.2-PE1.1.1B.jar'
  },
  {
    name: 'JEI',
    path: 'jei.jar',
    url: 'https://addons-origin.cursecdn.com/files/2357/416/jei_1.10.2-3.13.6.392.jar'
  },
  {
    name: 'Mantle',
    path: 'mantle.jar',
    url: 'https://addons-origin.cursecdn.com/files/2353/326/Mantle-1.10.2-1.1.3.jar'
  },
  {
    name: 'CodeChickenLib',
    path: 'chicken.jar',
    url: 'https://addons-origin.cursecdn.com/files/2356/881/CodeChickenLib-1.10.2-2.5.0.178-universal.jar'
  },
  {
    name: 'Refined Storage',
    path: 'refined.jar',
    url: 'https://addons-origin.cursecdn.com/files/2359/687/refinedstorage-1.2.13.jar'
  }
];

// i got lazy
const extras = [
  'https://addons-origin.cursecdn.com/files/2359/908/ExtremeReactors-1.10.2-0.4.5.22.jar',
  'https://addons-origin.cursecdn.com/files/2347/456/BiomesOPlenty-1.10.2-5.0.0.2109-universal.jar',
  'https://addons-origin.cursecdn.com/files/2351/656/zerocore-1.10.2-0.0.8.2.jar',
  'https://addons-origin.cursecdn.com/files/2354/613/modularity-3.0.2.jar',
  'https://addons-origin.cursecdn.com/files/2358/355/AstroLib-2.1.1-jenkins25.jar'
];
let cnt = 0;
for (const extra of extras) {
  module.exports.push({
    name: 'mod-' + cnt,
    path: 'ext-' + cnt + '.jar',
    url: extra
  });
  cnt++;
}
