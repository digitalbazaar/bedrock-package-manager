# bedrock-package-manager

# API Reference
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
    * [.register(options)](#module_bedrock-package-manager.register) ⇒ [<code>Array.&lt;PackageInfo&gt;</code>](#PackageInfo)

<a name="module_bedrock-package-manager.get"></a>

### bedrock-package-manager.get(options) ⇒ [<code>PackageInfo</code>](#PackageInfo)
Get package information.

**Kind**: static method of [<code>bedrock-package-manager</code>](#module_bedrock-package-manager)  
**Returns**: [<code>PackageInfo</code>](#PackageInfo) - The package information.  
**Throws**:

- <code>BedrockError</code> Will throw a NotFoundError if the package is not
  found.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The options to use. |
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

### bedrock-package-manager.register(options) ⇒ [<code>Array.&lt;PackageInfo&gt;</code>](#PackageInfo)
Register a package.

**Kind**: static method of [<code>bedrock-package-manager</code>](#module_bedrock-package-manager)  
**Returns**: [<code>Array.&lt;PackageInfo&gt;</code>](#PackageInfo) - The package information.  
**Throws**:

- <code>BedrockError</code> Will throw a DuplicateError if the package is already
  registered.


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

