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
  name: name.charAt(0).toUpperCase() + name.slice(1)
}

const files = [];

if (args.what === "component" || args.what === "view") {
  files.push(
    {
      content: renderString(getFile('./generate/component/component.component.html'), data),
      path: `${data.name}.${args.what}.html`
    }
  );
  files.push(
    {
      content: renderString(getFile('./generate/component/component.component.ts'), data),
      path: `${data.name}.${args.what}.ts`
    }
  );
  files.push(
    {
      content: renderString(getFile('./generate/component/component.component.scss'), data),
      path: `${data.name}.${args.what}.scss`
    }
  );
  files.push(
    {
      content: renderString(getFile('./generate/component/component.component.vue'), data),
      path: `${data.name}.${args.what}.vue`
    }
  );
  files.push(
    {
      content: renderString(getFile('./generate/component/component.component.test.ts'), data),
      path: `${data.name}.${args.what}.test.ts`
    }
  );
}

if (args.what === "service") {
  files.push(
    {
      content: renderString(getFile('./generate/service/service.service.ts'), data),
      path: `${data.name}.${args.what}.ts`
    }
  );
  files.push(
    {
      content: renderString(getFile('./generate/service/service.test.ts'), data),
      path: `${data.name}.test.ts`
    }
  );
}

files.forEach(file => {
  fs.mkdirSync(args.path, { recursive: true })
  fs.writeFileSync(`${args.path}/${file.path}`, file.content)
})

function getFile(path) {
  return fs.readFileSync(path, {encoding: "utf-8"})
}