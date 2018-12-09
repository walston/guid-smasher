const test = require("ava");
const uuid = require("uuid").v4;

const Smasher = require("./index");

test("Works as a 2-way cypher", t => {
  let guids = new Array(256).fill("").map(() => uuid());
  t.plan(guids.length);
  const { smash, unsmash } = Smasher();

  for (const guid of guids) {
    const cypher = smash(guid);
    t.is(unsmash(cypher), guid);
  }
});
