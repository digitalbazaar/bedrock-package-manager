/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const brPackageManager = require('bedrock-package-manager');

describe('find API', () => {
  it('returns a plugin', async () => {
    // pluginName would typically be derived from the bedrock config or
    // from an HTTP route param
    const pluginName = 'bedrock-package-manager-mock-package';
    const result = brPackageManager.find({
      plugin: `bedrock-mock-plugin.${pluginName}`
    });
    const mockResult = {
      api: {mockValue: 42},
      meta: {type: 'bedrock-mock-plugin'},
    };
    should.exist(result);
    result.should.eql(mockResult);
  });
  it('throws NotFoundError on unknown plugin', async () => {
    let error;
    let result;
    const pluginName = 'bedrock-unknown-plugin';
    try {
      result = brPackageManager.find({
        plugin: `bedrock-mock-plugin.${pluginName}`
      });
    } catch(e) {
      error = e;
    }
    should.not.exist(result);
    should.exist(error);
    error.name.should.equal('NotFoundError');
  });
});
