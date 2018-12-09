const CODE = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
const regex = /^(?:.*::)?[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;

/**
 * @return {{ smash: (guid: string) => string, unsmash: (cypher: string) => string }}
 */
module.exports = function Smasher() {
  return {
    smash: function smash(guid) {
      if (!regex.test(guid)) {
        throw Error("Not a GUID");
      }

      // Strip "-" and pad with 0x1111 for even division of cypher
      guid = guid.replace(/-/g, "") + "f";

      let remainder = "";
      let cypher = "";
      for (const char of guid.split("")) {
        let bits = parseInt(char, 16).toString(2);
        while (bits.length < 4) bits = "0" + bits;
        remainder += bits;

        while (remainder.length >= 6) {
          cypher += CODE[parseInt(remainder.slice(0, 6), 2)];
          remainder = remainder.slice(6);
        }
      }

      return cypher;
    },
    unsmash: function unsmash(cypher) {
      let hex = "";
      let remainder = "";
      for (const char of cypher.split("")) {
        // convert 6-bit char to 6 bits;
        let bits = CODE.indexOf(char).toString(2);
        while (bits.length < 6) bits = "0" + bits;
        remainder += bits;

        // convert 4-bit chunks into hexadecimal
        while (remainder.length >= 4) {
          hex += parseInt(remainder.slice(0, 4), 2).toString(16);
          remainder = remainder.slice(4);
        }
      }

      return (
        `${hex.slice(0, 8)}` +
        `-${hex.slice(8, 12)}` +
        `-${hex.slice(12, 16)}` +
        `-${hex.slice(16, 20)}` +
        `-${hex.slice(20, 32)}`
      );
    }
  };
};
