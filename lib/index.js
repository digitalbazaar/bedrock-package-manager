/*!
 * Copyright (c) 2019-2022 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import assert from 'assert-plus';
import deepFreeze from 'deep-freeze';
const {util: {BedrockError}} = bedrock;

const packages = [];

/**
 * @module bedrock-package-manager
 */

/**
 * Get package information. One of `alias` or `packageName` is required.
 *
 * @param {object} options - The options to use.
 * @param {string} options.type - The package type.
 * @param {string} [options.alias] - The package alias.
 * @param {string} [options.packageName] - The package name.
 *
 * @returns {PackageInfo} The package information.
 *
 * @throws {BedrockError} Will throw a `NotFoundError` if the package is not
 *   found.
 */
export function get({alias, packageName, type}) {
  assert.optionalString(alias, 'options.alias');
  assert.optionalString(packageName, 'options.packageName');
  assert.string(type, 'options.type');

  let pkg;
  if(alias) {
    pkg = packages.find(p => (p.type === type && p.alias === alias));
  }
  if(packageName) {
    pkg = packages.find(p => (p.type === type &&
      p.packageName === packageName));
  }

  if(!pkg) {
    throw new BedrockError('Package not found.', 'NotFoundError', {
      alias,
      httpStatusCode: 404,
      packageName,
      public: true,
      type,
    });
  }
  return pkg;
}

/**
 * Find packages by type.
 *
 * @param {object} options - The options to use.
 * @param {string} options.type - The package type to find.
 *
 * @returns {PackageInfo[]} The package information.
 */
export function findType({type}) {
  assert.string(type, 'options.type');
  return packages.filter(p => p.type === type);
}

/**
 * Register a package.
 *
 * @param {object} options - The options to use.
 * @param {string} options.packageName - The NPM package name.
 * @param {string} options.type - The package type.
 * @param {object} [options.meta={}] - Domain specific meta data.
 * @param {string} [options.alias] - The package alias. A short name for the
 *   package (e.g. 'mongodb', 'redis').
 *
 * @returns {undefined}
 *
 * @throws {BedrockError} Will throw a `DuplicateError` if the package is
 *   already registered.
 */
export function register({alias, meta = {}, packageName, type}) {
  assert.optionalString(alias, 'options.alias');
  assert.string(packageName, 'options.name');
  assert.string(type, 'options.type');
  assert.object(meta, 'options.meta');

  if(packages.find(p => (p.packageName === packageName && p.type === type) ||
    (alias && p.alias === alias && p.type === type))) {
    throw new BedrockError('Duplicate package.', 'DuplicateError', {
      httpStatusCode: 409,
      packageName,
      public: true,
      type,
    });
  }

  const packageInfo = {alias, meta, packageName, type};
  // freeze the package information so that it cannot be altered after a call
  // to the `get` or `findType` APIs
  deepFreeze(packageInfo);
  packages.push(packageInfo);
}

/**
 * Package information.
 *
 * @typedef {object} PackageInfo
 * @property {string} alias - The package alias. A short name for the
 *   package (e.g. 'mongodb', 'redis').
 * @property {string} packageName - The NPM package name.
 * @property {string} type - The package type.
 * @property {object} meta - Domain specific meta data.
 */
