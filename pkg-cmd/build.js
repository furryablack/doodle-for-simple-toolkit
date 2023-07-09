const { Distribution } = require('../pkg-builder/distribution');
const { Builder } = require('../pkg-builder/builder');
const { PackageSource } = require('../pkg-builder/package-source.js');
const GENERIC_PKG = require('../package.json');

const COPY_FILES = ['README.md', 'LICENSE']; 

async function main() {  
  const package = PackageSource.create({
    version: GENERIC_PKG.version,
    name: GENERIC_PKG.name,
    repositoryOwner: 'REPOSITORY OWNER',
    keywords: GENERIC_PKG.keywords,
    description: GENERIC_PKG.description,
    author: 'OWNER NAME <owner.email>',
    license: 'MIT',
  });

  const [errors, isOk] = PackageSource.validate(package);

  if (!isOk) { 
    throw new Error(errors.join('\n'))
  } else {
    const distribution = await Distribution.create('./dist');
    
    const entries = await Distribution.getEntries({ 
      pkgSrc: 'pkg-src', 
      pkgMarker: 'index.ts',
    });

    const builder = Builder.create(entries);    
    package.exports = builder.getExports();  
    await distribution.write('index.js', builder.getCommonJs());
    await distribution.write('index.mjs', builder.getMjs()); 
    await distribution.write('index.d.ts', builder.getTypings());
    await distribution.write('package.json', PackageSource.stringify(package));
    await distribution.copyList('./', COPY_FILES);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
