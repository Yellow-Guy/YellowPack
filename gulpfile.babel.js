import 'babel-polyfill'

import gulp from 'gulp'
import request from 'request'
import rp from 'request-promise'
import fs from 'fs-extra-promise'
import util from 'gulp-util'
import streamToPromise from 'stream-to-promise'
import chalk from 'chalk'
import cheerio from 'cheerio'

import mods from './src/mods'

function downloadFile(url, path) {
  const src = request(url)
  const dest = fs.createWriteStream(path)
  src.pipe(dest)
  return streamToPromise(src)
}

const exists = async function exists(path) {
  try {
    await fs.accessAsync(path)
    return true
  } catch (e) {
    return false
  }
}

const forgeUri = 'http://files.minecraftforge.net/maven/net/minecraftforge/forge/1.10.2-12.18.3.2185/forge-1.10.2-12.18.3.2185-universal.jar'
const serverUri = 'https://launcher.mojang.com/mc/game/1.10.2/server/3d501b23df53c548254f5e3f66492d178a48db63/server.jar'

gulp.task('default', async () => {
  await fs.emptyDirAsync('dist')
  await fs.ensureDirAsync('dist/mods')
  await fs.ensureDirAsync('dist/config')
  await fs.ensureDirAsync('dist/bin')

  let i = 1

  for (const mod of mods) {
    await downloadFile(mod.url, `dist/mods/mod-${i}`)
    util.log(`Downloaded mod from ${chalk.magenta(mod.url)}`)
    i += 1
  }

  // Special case for OptiFine
  const $ = cheerio.load(await rp('http://optifine.net/adloadx?f=OptiFine_1.10.2_HD_U_D4.jar'))
  await downloadFile(`http://optifine.net/${$('#Download').find('a').attr('href')}`, 'dist/mods/optifine.jar')

  // Special case for liteloader
  const liteloaderUrl = 'http://jenkins.liteloader.com/view/1.10.2/job/LiteLoader%201.10.2/lastSuccessfulBuild/artifact/build/libs/liteloader-1.10.2-SNAPSHOT-release.jar'
  await downloadFile(liteloaderUrl, 'dist/mods/liteloader.jar')

  util.log(`Copying config from ${chalk.magenta('src/mods-config')} to ${chalk.magenta('dist/config')}`)
  await fs.copyAsync('src/mods-config', 'dist/config')

  util.log('Downloading forge')
  await downloadFile(forgeUri, 'dist/bin/modpack.jar')
  await downloadFile(serverUri, 'dist/bin/minecraft_server-1.10.2.jar')
  util.log(`Successfully downloaded forge to ${chalk.magenta('dist/bin/modpack.jar')}`)
})

gulp.task('clean', () => fs.emptyDirAsync('dist'))

gulp.task('prepareServer', ['default'], async () => {
  await fs.ensureDirAsync('server')
  await fs.emptyDirAsync('server/mods')
  await fs.emptyDirAsync('server/config')
  await fs.copyAsync('dist/mods', 'server/mods')
  await fs.copyAsync('dist/config', 'server/config')
  await fs.unlinkAsync('server/mods/liteloader.jar')
  util.log(`Successfully downloaded forge server to ${chalk.magenta('server/installer.jar')}`)
  await downloadFile('http://files.minecraftforge.net/maven/net/minecraftforge/forge/1.10.2-12.18.3.2254/forge-1.10.2-12.18.3.2254-installer.jar', 'server/install.jar')
})

gulp.task('prepareServer:test', async () => {
  if (await exists('server/eula.txt')) {
    throw new Error('npm test is disabled if there is an installed server')
  }
})

gulp.task('prepareServer:noCrash', async () => {
  if (await exists('server/crash-reports')) {
    throw new Error()
  }
})

export default null
