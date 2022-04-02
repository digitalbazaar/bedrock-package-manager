# bedrock-package-manager

## Usage
A package should register itself using a Bedrock event handler.
```js
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
```

Use a registered package in an API.
```js
exports.getReports = async ({query = {}, storageApi}) => {
  // storageApi === 'mockPackage' would match the registration shown above
  const pkg = brPackageManager.get({
    alias: storageApi, type: 'bedrock-mock-plugin'
  });
  const storage = await import(pkg.packageName);
  return storage.find(query);
};
```

## API Reference
## Modules

<dl>
<dt><a href="#module_bedrock-package-manager">bedrock-package-manager</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#PackageInfo">PackageInfo</a> : <code>Object</code></dt>
<dd><p>Package information.</p>
</dd>
</dl>

<a name="module_bedrock-package-manager"></a>

## bedrock-package-manager

* [bedrock-package-manager](#module_bedrock-package-manager)
    * [.get(options)](#module_bedrock-package-manager.get) ⇒ [<code>PackageInfo</code>](#PackageInfo)
    * [.findType(options)](#module_bedrock-package-manager.findType) ⇒ [<code>Array.&lt;PackageInfo&gt;</code>](#PackageInfo)
    * [.register(options)](#module_bedrock-package-manager.register) ⇒ <code>undefined</code>

<a name="module_bedrock-package-manager.get"></a>

### bedrock-package-manager.get(options) ⇒ [<code>PackageInfo</code>](#PackageInfo)
Get package information. One of `alias` or `packageName` is required.

**Kind**: static method of [<code>bedrock-package-manager</code>](#module_bedrock-package-manager)
**Returns**: [<code>PackageInfo</code>](#PackageInfo) - The package information.
**Throws**:

- <code>BedrockError</code> Will throw a `NotFoundError` if the package is not
  found.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The options to use. |
| options.type | <code>string</code> | The package type. |
| [options.alias] | <code>string</code> | The package alias. |
| [options.packageName] | <code>string</code> | The package name. |

<a name="module_bedrock-package-manager.findType"></a>

### bedrock-package-manager.findType(options) ⇒ [<code>Array.&lt;PackageInfo&gt;</code>](#PackageInfo)
Find packages by type.

**Kind**: static method of [<code>bedrock-package-manager</code>](#module_bedrock-package-manager)
**Returns**: [<code>Array.&lt;PackageInfo&gt;</code>](#PackageInfo) - The package information.

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The options to use. |
| options.type | <code>string</code> | The package type to find. |

<a name="module_bedrock-package-manager.register"></a>

### bedrock-package-manager.register(options) ⇒ <code>undefined</code>
Register a package.

**Kind**: static method of [<code>bedrock-package-manager</code>](#module_bedrock-package-manager)
**Throws**:

- <code>BedrockError</code> Will throw a `DuplicateError` if the package is
  already registered.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | The options to use. |
| options.packageName | <code>string</code> |  | The NPM package name. |
| options.type | <code>string</code> |  | The package type. |
| [options.meta] | <code>Object</code> | <code>{}</code> | Domain specific meta data. |
| [options.alias] | <code>string</code> |  | The package alias. A short name for the   package (e.g. 'mongodb', 'redis'). |

<a name="PackageInfo"></a>

## PackageInfo : <code>Object</code>
Package information.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| alias | <code>string</code> | The package alias. A short name for the   package (e.g. 'mongodb', 'redis'). |
| packageName | <code>string</code> | The NPM package name. |
| type | <code>string</code> | The package type. |
| meta | <code>Object</code> | Domain specific meta data. |

