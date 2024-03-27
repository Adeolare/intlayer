/**
 * Custom config base for projects using prettier.
 * @see https://github.com/aypineau/sayaup/tree/main/packages/eslint-config-bases
 */

module.exports = {
  extends: ['prettier'],
  rules: {
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
};
