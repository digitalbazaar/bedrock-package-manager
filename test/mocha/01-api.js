/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const brPackageManager = require('bedrock-package-manager');

describe('bedrock-package-manager', () => {
  describe('get API', () => {
    it('returns package information given packageName', async () => {
      // pluginName would typically be derived from the bedrock config or
      // from an HTTP route param
      const packageName = 'bedrock-package-manager-mock-package';
      const type = 'bedrock-mock-plugin';
      const result = brPackageManager.get({packageName, type});
      const mockResult = {
        alias: 'mockPackage',
        meta: {optional: 'meta values'},
        packageName,
        type
      };
      should.exist(result);
      result.should.eql(mockResult);
    });
    it('returns package information given alias', async () => {
      // pluginName would typically be derived from the bedrock config or
      // from an HTTP route param
      const alias = 'mockPackage';
      const packageName = 'bedrock-package-manager-mock-package';
      const type = 'bedrock-mock-plugin';
      const result = brPackageManager.get({alias, type});
      const mockResult = {
        alias: 'mockPackage',
        meta: {optional: 'meta values'},
        packageName,
        type
      };
      should.exist(result);
      result.should.eql(mockResult);
    });
    it('throws NotFoundError on unknown package', async () => {
      let error;
      let result;
      const packageName = 'bedrock-unknown-plugin';
      try {
        result = brPackageManager.get({
          packageName,
          type: 'bedrock-mock-plugin'
        });
      } catch(e) {
        error = e;
      }
      should.not.exist(result);
      should.exist(error);
      error.name.should.equal('NotFoundError');
    });
  }); // end get API

  describe('findType API', () => {
    it('should return mock package', async () => {
      const type = 'bedrock-mock-plugin';
      const result = brPackageManager.findType({type});
      result.should.be.an('array');
      result.should.have.length(1);
      result[0].packageName.should.equal(
        'bedrock-package-manager-mock-package');
    });
    it('should empty array on unknown type', async () => {
      const type = 'bedrock-unknown-type';
      const result = brPackageManager.findType({type});
      result.should.be.an('array');
      result.should.have.length(0);
    });
  }); // end getType API

  describe('register API', () => {
    it('throws DuplicateError on duplicate package', () => {
      let result;
      let error;
      try {
        // same as mock-package
        result = brPackageManager.register({
          packageName: 'bedrock-package-manager-mock-package',
          type: 'bedrock-mock-plugin',
        });
      } catch(e) {
        error = e;
      }
      should.not.exist(result);
      should.exist(error);
      error.name.should.equal('DuplicateError');
    });
  }); // end registerAPI
});
