var kata_dakuten_zen = "゛";
var kata_dakuten_han = "ﾞ";
var kata_zen =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォッャュョヮヰヱー";
var kata_han = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｯｬｭｮﾜｲｴｰ";
var daku_kata_zen = [
  "ガ",
  "ギ",
  "グ",
  "ゲ",
  "ゴ",
  "ザ",
  "ジ",
  "ズ",
  "ゼ",
  "ゾ",
  "ダ",
  "ヂ",
  "ヅ",
  "デ",
  "ド",
  "バ",
  "ビ",
  "ブ",
  "ベ",
  "ボ",
  "パ",
  "ピ",
  "プ",
  "ペ",
  "ポ",
  "ヴ",
];
var daku_kata_han = [
  "ｶﾞ",
  "ｷﾞ",
  "ｸﾞ",
  "ｹﾞ",
  "ｺﾞ",
  "ｻﾞ",
  "ｼﾞ",
  "ｽﾞ",
  "ｾﾞ",
  "ｿﾞ",
  "ﾀﾞ",
  "ﾁﾞ",
  "ﾂﾞ",
  "ﾃﾞ",
  "ﾄﾞ",
  "ﾊﾞ",
  "ﾋﾞ",
  "ﾌﾞ",
  "ﾍﾞ",
  "ﾎﾞ",
  "ﾊﾟ",
  "ﾋﾟ",
  "ﾌﾟ",
  "ﾍﾟ",
  "ﾎﾟ",
  "ｳﾞ",
];

function isPresent(val) {
  return val !== null && val !== undefined;
}

function toArray(val) {
  var result = [];

  if (isPresent(val)) {
    if (Array.isArray(val)) {
      result = result.concat(val);
    } else {
      result.push(val);
    }
  }

  return result;
}

function Pipeline(middlewares) {
  var stack = toArray(middlewares);

  var push = function (middlewares) {
    stack = stack.concat(toArray(middlewares));
  };

  var execute = function (context) {
    var prevIndex = -1;

    function runner(index) {
      if (index === prevIndex) {
        throw new Error("next() called multiple times");
      }

      prevIndex = index;

      var middleware = stack[index];

      if (middleware) {
        return middleware(context, function () {
          return runner(index + 1);
        });
      }
    }

    return runner(0);
  };

  return { push: push, execute: execute };
}

var pipeline = new Pipeline([
  // kata_dakuten_zen -> kata_dakuten_han
  function (ctx, next) {
    var value = ctx.value;

    if (value == kata_dakuten_zen) {
      return kata_dakuten_han;
    }

    return next();
  },
  // kata_zen -> kata_han
  function (ctx, next) {
    var value = ctx.value;
    var kanaIndex = kata_zen.indexOf(value);

    if (kanaIndex !== -1) {
      return kata_han[kanaIndex];
    }

    return next();
  },
  // daku_kata_zen -> daku_kata_han
  function (ctx, next) {
    var value = ctx.value;
    var kanaIndex = daku_kata_zen.findIndex(function (v) {
      return v == value;
    });

    if (kanaIndex !== -1) {
      return daku_kata_han[kanaIndex];
    }

    return next();
  },
  // NOP
  function (ctx, next) {
    return ctx.value;
  },
]);

function convertZenKanaToHanKana(val) {
  var result = val;
  if (result) {
    var array = [];
    for (var i = 0; i < result.length; i++) {
      var character = pipeline.execute({ value: result[i] });

      array.push(character);
    }

    result = array.join("");
  }

  return result;
}

module.exports = {
  convertZenKanaToHanKana: convertZenKanaToHanKana,
};
