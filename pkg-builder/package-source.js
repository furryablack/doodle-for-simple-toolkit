const { PackageSource } = module.exports = { PackageSource: {} };

const PKG_DEFAULT_PARAMS = {
  version: '', 
  name: '', 
  description: '', 
  keywords: [],
  repositoryName: '',
  repositoryOwner: '',
  sideEffects: false,
  author: '',
  license: '',
};

PackageSource.readDefaultParams = function readDefaultParams() {
  return ({...PKG_DEFAULT_PARAMS, keywords: [...PKG_DEFAULT_PARAMS.keywords]}); 
}

PackageSource.create = function create(params = PackageSource.defaultParams) {
  const defaultParams = PackageSource.readDefaultParams();
  // eslint-disable-next-line no-param-reassign
  params = {...defaultParams, ...params}; 
  params.keywords = [...defaultParams.keywords, ...(params.keywords || [])];
  const keywords = params.keywords;
  const repositoryName = params.repositoryName || params.name;   
  const repositoryOwner = params.repositoryOwner || params.name; 
  const homepage = `https://github.com/${repositoryOwner}/${repositoryName}#readme`;

  const repository = {
    type: 'git',
    url: `git+https://github.com//${repositoryOwner}/${repositoryName}.git`,
  };

  const bugs = {
    url: `https://github.com//${repositoryOwner}/${repositoryName}/issues`,
  };
  

  return {
    name: params.name,
    version: params.version,
    description: params.description,
    sideEffects: Boolean(params.sideEffects),
    main: `${params.name}.cjs.js`,
    module: `${params.name}.mjs`,
    browser: `${params.name}.umd.js`,
    types: 'index.d.ts',
    author: params.author,
    license: params.license,  
    homepage,
    keywords,
    repository,
    bugs,
  };
};

PackageSource.stringify = function stringify(pkg = {}) {
  return JSON.stringify(pkg, null, 2);
}

PackageSource.validate = function validate(pkg = {}) {
  const errors = [];

  if (!pkg.name) errors.push('Package\'s name is required');
  if (!pkg.version) errors.push('Package\'s version is required');
  if (!pkg.author) errors.push('Package\'s author is required');
  if (!pkg.license) errors.push('Package\'s license is required');
  
  return [errors, errors.length === 0];
}