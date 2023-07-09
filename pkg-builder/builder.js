/* eslint-disable import/no-extraneous-dependencies */
const { camelCase } = require('camel-case');
const { pascalCase } = require('pascal-case');

const { Builder } = module.exports = { Builder: {} };

const recase = (input = '') => (char => char.toUpperCase() === char)(input.charAt()) 
  ? pascalCase(input)
  : camelCase(input);

Builder.create = function create(entries = []) {
  return {
    getCommonJs() {
      const imports = entries.sort().map((entry) => {
        const camel = recase(entry);
        return `module.exports.${camel} = require('./${entry}').${camel};`;
      });
    
      return imports.join('\n') + '\n';
    },
  
    getMjs() {
      const imports = entries.sort().map((entry) => {
        const camel = recase(entry);
        return `export { ${camel} } from './${entry}/index.mjs'`;
      });
    
      return imports.join('\n') + '\n';
    },
  
    getTypings() {
      const types = entries
        .sort()
        .map((entry) => `export { ${recase(entry)} } from './${entry}';`);
    
      return types.join('\n') + '\n';
    },

    getExports() {
      const getExportsMap = () => {
        const object = {};

        entries.forEach((entry) => {
          object[`./${entry}`] = {
            require: `./${entry}/index.js`,
            import: `./${entry}/index.mjs`,
          };
        });
      
        return object;
      };

      return {
        '.': {
          require: './index.js',
          import: './index.mjs',
          default: './index.mjs',
        },
    
        ...getExportsMap(entries),
      };
    },
  };
};
