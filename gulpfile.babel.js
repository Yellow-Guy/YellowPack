import 'babel-polyfill';

import gulp from 'gulp';
import request from 'request';
import fs from 'fs-extra-promise';
import util from 'gulp-util';
import streamToPromise from 'stream-to-promise';
import chalk from 'chalk';

import mods from './src/mods';

gulp.task('default', async () => {
  await fs.emptyDirAsync('dist');
  await fs.ensureDirAsync('dist/mods');
  await fs.ensureDirAsync('dist/config');
  for (const mod of mods) {
    util.log(`Downloading ${chalk.green(mod.name)} from ${chalk.magenta(mod.url)}`);
    const src = request(mod.url);
    const dest = fs.createWriteStream('dist/mods/' + mod.path);
    src.pipe(dest);
    await streamToPromise(src);
    util.log(`Sucessfully saved ${chalk.green(mod.name)} to ${chalk.magenta(mod.path)}`);
  }
  util.log(`Copying config from ${chalk.magenta('src/mods-config')} to ${chalk.magenta('dist/config')}`);
});

gulp.task('clean', () => fs.emptyDirAsync('dist'));

export default null;
