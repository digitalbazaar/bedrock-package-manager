/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const brPackageManager = require('bedrock-package-manager');

bedrock.events.on('bedrock.init', () => {
  brPackageManager.register({
    alias: 'mockPackage',
    meta: {
      optional: 'meta values',
    },
    packageName: 'bedrock-package-manager-mock-package',
    type: 'bedrock-mock-plugin',
  });
});

exports.mockValue = 42;
