module.exports = function (content, map, meta) {
  this.callback(null, someSyncOperation(content), map, meta);
  return;
};
function someSyncOperation(content) {
  return content.replace(/console\.log\(.*\);?/g, "");
}
