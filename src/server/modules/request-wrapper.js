module.exports = function wrapPromise(promise) {
  return promise.then(result => ({ result })).catch(error => ({ error }));
};
