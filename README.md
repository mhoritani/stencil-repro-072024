## Stencil Hydrate Reproduction

This reproduction aims to showcase an issue when hydrating a document containing Stencil components along with `<link>` tags in the document header using `hydrateDocument()`.
Specifically, it demonstrates how the generated inline `<style>` tags are placed at the top of the file, potentially pushing other, more critical elements further down.

### Problem Statement

When the document is hydrated, the inline <style> tags created for the Stencil components are placed at the top of the `<head>` section.
This placement can delay the loading of `<link>` tags, such as those with a `rel="preconnect"` value, which are crucial for performance optimization.
Ideally, the placement of these styles should be configurable to avoid such issues.


### Sample input:

```Html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="preconnect" href="https://some-url.com" />
    </head>
    <body>
        <my-component></my-component>
    </body>
</html>
```

### Generates:

```Html
<!doctype html>
<html lang="en" data-stencil-build="vuogzrh7" class="hydrated">
    <head>
        <meta charset="UTF-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style sty-id="sc-my-component">
            /*!@:host*/
            .sc-my-component-h {
                display: inline-block;
                border: 1px solid red;
                padding: 5px;
            }
        </style>
        <link rel="preconnect" href="https://some-url.com" />
    </head>
    <body>
        <my-component class="sc-my-component-h hydrated" s-id="1"
            ><!--r.1-->
            <div class="sc-my-component" c-id="1.0.0.0">
                <!--t.1.1.1.0-->My Component
            </div></my-component
        >
    </body>
</html>

```

### Proposed Solution
To resolve this issue, the hydration process should allow configuration to control the placement of the generated inline `<style>` tags.
This way, more critical elements like `<link>` tags for preconnection can maintain their optimal loading sequence.


## Install

### Build Stencil Library
```bash
cd stencil-lib
npm i
npm run build
```

### Hydrate Document
```bash
cd ../hydration-example
npm i
npm run hydrate
```

The generated output will located inside `index.output.html`
