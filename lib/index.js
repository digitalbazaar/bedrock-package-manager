/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const _get = require('lodash.get');
const assert = require('assert-plus');
const bedrock = require('bedrock');
const {promisify} = require('util');
const exec = promisify(require('child_process').exec);
const path = require('path');
const {util: {BedrockError}} = bedrock;

const bedrockPackages = {};

bedrock.events.on('bedrock.init', async () => {
  let stdout;
  try {
    ({stdout} = await exec('npm ls --parseable --silent'));
  } catch(e) {
    // npm may return non-zero exit code for a variety of unimportant reasons
    // which causes child-process.exec to throw. Ignore this behavior.
    ({stdout} = e);
  }
  const packages = stdout.split('\n');
  // remove the element corresponding to the last newline
  packages.pop();

  for(const p of packages) {
    const packageJson = require(path.join(p, 'package.json'));
    if(!_get(packageJson, 'bedrock.meta.type')) {
      continue;
    }
    const {bedrock: {meta}} = packageJson;
    if(!(meta.type in bedrockPackages)) {
      bedrockPackages[meta.type] = {};
    }
    bedrockPackages[meta.type][packageJson.name] = meta;
  }
});

exports.find = ({plugin}) => {
  assert.string(plugin, 'options.plugin');

  const meta = _get(bedrockPackages, plugin);
  if(!meta) {
    throw new BedrockError('Plugin not found.', 'NotFoundError', {
      httpStatusCode: 404,
      plugin,
      public: true
    });
  }
  const [packageName] = plugin.split('.').slice(-1);
  return {api: require(packageName), meta};
};
