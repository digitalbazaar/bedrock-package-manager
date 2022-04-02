/*!
 * Copyright (c) 2019-2022 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import * as brPackageManager from '@bedrock/package-manager';

bedrock.events.on('bedrock.init', () => {
  brPackageManager.register({
    alias: 'mockPackage',
    meta: {
      optional: 'meta values',
    },
    packageName: '@bedrock/package-manager-mock-package',
    type: 'bedrock-mock-plugin',
  });
});

export const mockValue = 42;
