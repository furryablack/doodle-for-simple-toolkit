/* eslint-disable import/no-extraneous-dependencies */
const globby = require('globby');
const { IO } = require('./io');

const { Distribution } = module.exports = { Distribution: {} };

Distribution.getEntries = async function getEntries(params = {}) {
  const found = await globby(`./${params.pkgSrc}/*/${params.pkgMarker}`);

  return found.map((name) => {
    return name
      .replace(`/${params.pkgMarker}`, '')
      .replace(`./${params.pkgSrc}/`, '');
  });
}

Distribution.create = async function create(dir = './') {
  const prepareList = (list = []) => {
    return list.filter(async file => {
      let ret = false;

      try {
        ret = await IO.existsSync(`./${file}`);
      } catch(error) { ret = false; }

      return ret;
    });
  }; 

  return {
    write: (path, content) => IO.writeFile(`${dir}/${path}`, content),

    copyList: (source, list, fn = (i) => i) => {
      return Promise.all(
        prepareList(list).map((file) => IO.copyFile(`${source}/${file}`, `${dir}/${fn(file)}`)),
      )
    },
  };
}

