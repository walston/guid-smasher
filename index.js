const hex = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
const regex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;

module.exports = function Smasher(prefix) {
  prefix = prefix || "";

  return {
    smash: function squash(guid) {
      if (!regex.test(guid)) {
        throw Error("Not a GUID");
      }

      return guid
        .replace(/\-/g, "")
        .split("")
        .reduce((acc, char) => {
          let bits = parseInt(char, 16).toString(2);
          while (bits.length < 4) bits = "0" + bits;
          return acc + bits;
        }, "")
        .split(/(.{6})/g)
        .filter(v => v)
        .map(bits => hex[parseInt(bits, 2)])
        .join("");
    },
    unsmash: function unsmash(cypher) {
      const guid = cypher
        .split("")
        .reduce((acc, char, i, array) => {
          let bits = hex.indexOf(char).toString(2);
          if (i < array.length) while (bits.length < 6) bits = "0" + bits;
          return acc + bits;
        }, "")
        .split(/(.{4})/g)
        .filter(v => v)
        .map(bits => parseInt(bits, 2).toString(16))
        .reduce((acc, char, i) => {
          const dashes = [8, 12, 16, 20];
          if (dashes.includes(i)) return acc + "-" + char;
          else return acc + char;
        });

      return guid;
    }
  };
};
