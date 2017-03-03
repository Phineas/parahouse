var utils = {};

utils.encrypt = function (input, firstKey) {
  if (typeof firstKey === 'undefined') firstKey = 0xAB;
  var buf = new Buffer(input.length); // node v6: Buffer.alloc(input.length)

  var key = firstKey;
  for (var i = 0; i < input.length; i++) {
    buf[i] = input.charCodeAt(i) ^ key;
    key = buf[i];
  }
  return buf;
};

utils.encryptWithHeader = function (input, firstKey) {
  if (typeof firstKey === 'undefined') firstKey = 0xAB;
  var bufMsg = module.exports.encrypt(input, firstKey);
  var bufLength = new Buffer(4); // node v6: Buffer.alloc(4)
  bufLength.writeUInt32BE(input.length, 0);
  return Buffer.concat([bufLength, bufMsg], input.length + 4);
};

utils.decrypt = function (input, firstKey) {
  if (typeof firstKey === 'undefined') firstKey = 0x2B;
  var buf = new Buffer(input); // node v6: Buffer.from(input)
  var key = firstKey;
  var nextKey;
  for (var i = 0; i < buf.length; i++) {
    nextKey = buf[i];
    buf[i] = buf[i] ^ key;
    key = nextKey;
  }
  return buf;
};

module.exports = utils;
