const moveProps = require('postcss-move-props-to-bg-image-query');

module.exports = {
  processors: [
    require('postcss-strip-inline-comments')
  ],
  parser: require('postcss-scss'),
  plugins: [
    require('postcss-preset-env')({ stage: 0 }),
    require('tailwindcss'),
    require('autoprefixer')(),
    moveProps()
  ]
};
