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
  name: name,
  path: name,
  what: args.what,
  whatBig: args.what.charAt(0).toUpperCase() + args.what.slice(1)
}

const nameParts =  data.name.split('-')
data.name = nameParts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")


const files = [];

if (args.what === "component" || args.what === "view") {
  files.push(
    {
      content: renderString(getFile(__dirname + '/../generate/component/component.component.ts'), data),
      filename: `${data.path}.${args.what}.ts`
    }
  );
  files.push(
    {
      content: renderString(getFile(__dirname + '/../generate/component/component.component.scss'), data),
      filename: `${data.path}.${args.what}.scss`
    }
  );
  files.push(
    {
      content: renderString(getFile( __dirname + '/../generate/component/component.component.vue'), data),
      filename: `${data.path}.${args.what}.vue`
    }
  );
  files.push(
    {
      content: renderString(getFile(__dirname + '/../generate/component/component.component.spec.ts'), data),
      filename: `${data.path}.${args.what}.test.ts`
    }
  );
}

if (args.what === "service") {
  files.push(
    {
      content: renderString(getFile(__dirname + '/../generate/service/service.service.ts'), data),
      filename: `${data.path}.${args.what}.ts`
    }
  );
  files.push(
    {
      content: renderString(getFile(__dirname + '/../generate/service/service.spec.ts'), data),
      filename: `${data.path}.test.ts`
    }
  );
}

if (args.what === "store") {
  files.push(
    {
      content: renderString(getFile(__dirname + '/../generate/store/index.ts'), data),
      filename: `index.ts`
    }
  );
  files.push(
    {
      content: renderString(getFile(__dirname + '/../generate/store/state.ts'), data),
      filename: `state.ts`
    }
  );
  files.push(
    {
      content: renderString(getFile(__dirname + '/../generate/store/actions.ts'), data),
      filename: `actions.ts`
    }
  );
  files.push(
    {
      content: renderString(getFile(__dirname + '/../generate/store/mutations.ts'), data),
      filename: `mutations.ts`
    }
  );
  files.push(
    {
      content: renderString(getFile(__dirname + '/../generate/store/getters.ts'), data),
      filename: `getters.ts`
    }
  );
  files.push(
    {
      content: renderString(getFile(__dirname + '/../generate/store/store.spec.ts'), data),
      filename: `store.test.ts`
    }
  );
}

if (args.what === "directive") {
  files.push(
    {
      content: renderString(getFile(__dirname + '/../generate/directive/directive.directive.ts'), data),
      filename: `${data.path}.directive.ts`
    }
  );
}

if (args.what === "filter") {
  files.push(
    {
      content: renderString(getFile(__dirname + '/../generate/filter/filter.filter.ts'), data),
      filename: `${data.path}.filter.ts`
    }
  );
  files.push(
    {
      content: renderString(getFile(__dirname + '/../generate/filter/filter.filter.spec.ts'), data),
      filename: `${data.path}.filter.spec.ts`
    }
  );
}

files.forEach(file => {
  fs.mkdirSync(args.path, { recursive: true })
  fs.writeFileSync(`${args.path}/${file.filename}`, file.content)
})

function getFile(path) {
  return fs.readFileSync(path, { encoding: "utf-8" })
}