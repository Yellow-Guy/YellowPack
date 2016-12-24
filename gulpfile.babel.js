import 'babel-polyfill';

import gulp from 'gulp';
import request from 'request';
import fs from 'fs-extra-promise';
import util from 'gulp-util';
import streamToPromise from 'stream-to-promise';
import chalk from 'chalk';
import AdmZip from 'adm-zip';

import mods from './src/mods';

function downloadFile (url, path) {
  const src = request(url);
  const dest = fs.createWriteStream(path);
  src.pipe(dest);
  return streamToPromise(src);
}

const forgeUri = 'http://files.minecraftforge.net/maven/net/minecraftforge/forge/1.10.2-12.18.3.2185/forge-1.10.2-12.18.3.2185-universal.jar';
const serverUri = 'https://launcher.mojang.com/mc/game/1.10.2/server/3d501b23df53c548254f5e3f66492d178a48db63/server.jar'
gulp.task('default', async () => {
  await fs.emptyDirAsync('dist');
  await fs.ensureDirAsync('dist/mods');
  await fs.ensureDirAsync('dist/config');
  await fs.ensureDirAsync('dist/bin');
  for (const mod of mods) {
    util.log(`Downloading ${chalk.green(mod.name)} from ${chalk.magenta(mod.url)}`);
    await downloadFile(mod.url, 'dist/mods/' + mod.path);
    util.log(`Sucessfully saved ${chalk.green(mod.name)} to ${chalk.magenta(mod.path)}`);
  }
  util.log(`Copying config from ${chalk.magenta('src/mods-config')} to ${chalk.magenta('dist/config')}`);
  await fs.copyAsync('src/mods-config', 'dist/config');
  util.log(`Downloading forge`);
  await downloadFile(forgeUri, 'dist/bin/modpack.jar');
  await downloadFile(serverUri, 'dist/bin/server.jar');
  util.log(`Successfully downloaded forge to ${chalk.magenta('dist/bin/modpack.jar')}`);
  const zip = new AdmZip();
  zip.addLocalFolder('dist');
  zip.writeZip('dist/dist.zip');
  util.log(`Saved all files into ${chalk.magenta('dist/dist.zip')}`);
});

gulp.task('clean', () => fs.emptyDirAsync('dist'));

export default null;
