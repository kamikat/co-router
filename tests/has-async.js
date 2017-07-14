
try {
  eval('async function a () {}')
  module.exports = true;
} catch (e) {
  module.exports = false;
}
