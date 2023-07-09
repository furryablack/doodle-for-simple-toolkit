module.exports = {
  presets: [
    '@babel/preset-typescript',

    [
      '@babel/preset-env',

      {
        modules: process.env.ESMODULES === 'true' ? false : 'cjs',

        targets: {
          node: 'current',
          esmodules: process.env.ESMODULES === 'true',
        },
      },
    ],
  ],
};
