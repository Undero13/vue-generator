#!/usr/bin/env node

const { renderString, renderTemplateFile } = require('template-file');
const fs = require('fs');
const args = require('yargs').argv;
const path = require('path');


if (!args.path) {
  throw Error("Path param is required!")
}

if (!args.what) {
  args.what = "component"
}

const name = path.parse(args.path).base;
const data = {
  name: name.charAt(0).toUpperCase() + name.slice(1),
  what:args.what
}

const files = [];

if (args.what === "component" || args.what === "view") {
  files.push(
    {
      content: renderString(getFile(__dirname + '/generate/component/component.component.html'), data),
      filename: `${data.name}.${args.what}.html`
    }
  );
  files.push(
    {
      content: renderString(getFile(__dirname + '/generate/component/component.component.ts'), data),
      filename: `${data.name}.${args.what}.ts`
    }
  );
  files.push(
    {
      content: renderString(getFile(__dirname + '/generate/component/component.component.scss'), data),
      filename: `${data.name}.${args.what}.scss`
    }
  );
  files.push(
    {
      content: renderString(getFile( __dirname + '/generate/component/component.component.vue'), data),
      filename: `${data.name}.${args.what}.vue`
    }
  );
  files.push(
    {
      content: renderString(getFile(__dirname + '/generate/component/component.component.test.ts'), data),
      filename: `${data.name}.${args.what}.test.ts`
    }
  );
}

if (args.what === "service") {
  files.push(
    {
      content: renderString(getFile(__dirname + '/generate/service/service.service.ts'), data),
      filename: `${data.name}.${args.what}.ts`
    }
  );
  files.push(
    {
      content: renderString(getFile(__dirname + '/generate/service/service.test.ts'), data),
      filename: `${data.name}.test.ts`
    }
  );
}

files.forEach(file => {
  fs.mkdirSync(args.path, { recursive: true })
  fs.writeFileSync(`${args.path}/${file.filename}`, file.content)
})

function getFile(path) {
  return fs.readFileSync(path, {encoding: "utf-8"})
}