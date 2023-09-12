import { Data, exp, Expression } from ".";

describe("type", () => {
  test("boolean", () => {
    expect(exp(["boolean", 1])).toBe(true);
    expect(exp(["boolean", 0])).toBe(false);
    expect(exp(["boolean", "a"])).toBe(true);
    expect(exp(["boolean", ""])).toBe(false);
    expect(exp(["boolean", true])).toBe(true);
    expect(exp(["boolean", false])).toBe(false);
  });

  test("string", () => {
    expect(exp(["string", 1])).toBe("1");
    expect(exp(["string", 1.5])).toBe("1.5");
    expect(exp(["string", true])).toBe("true");
  });
});

describe("math", () => {
  test("+", () => {
    expect(exp(["+", 1, 2])).toBe(3);
  });

  test("-", () => {
    expect(exp(["-", 3, 1])).toBe(2);
  });

  test("*", () => {
    expect(exp(["*", 3, 5])).toBe(15);
  });

  test("/", () => {
    expect(exp(["/", 15, 3])).toBe(5);
  });

  test("%", () => {
    expect(exp(["%", 15, 3])).toBe(0);
    expect(exp(["%", 15, 2])).toBe(1);
    expect(exp(["%", 2, 3])).toBe(2);
  });

  test("^", () => {
    expect(exp(["^", 2, 3])).toBe(8);
  });

  test("sqrt", () => {
    expect(exp(["sqrt", 9])).toBe(3);
  });

  test("abs", () => {
    expect(exp(["abs", -5])).toBe(5);
  });

  test("sin", () => {
    expect(exp(["sin", Math.PI / 2])).toBe(1);
  });

  test("cos", () => {
    expect(exp(["cos", 0])).toBe(1);
  });

  test("tan", () => {
    expect(exp(["tan", 0])).toBe(0);
  });

  test("log", () => {
    expect(exp(["log", 1])).toBe(0);
    expect(exp(["log", 30])).toBe(Math.log(30));
  });

  test("floor", () => {
    expect(exp(["floor", 1.5])).toBe(1);
    expect(exp(["floor", -1.5])).toBe(-2);
  });

  test("ceil", () => {
    expect(exp(["ceil", 1.5])).toBe(2);
    expect(exp(["ceil", -1.5])).toBe(-1);
  });

  test("round", () => {
    expect(exp(["round", 1.6])).toBe(2);
    expect(exp(["round", 1.4])).toBe(1);
  });

  test("min", () => {
    expect(exp(["min", 1, 2])).toBe(1);
    expect(exp(["min", 4, 2, 3])).toBe(2);
  });

  test("max", () => {
    expect(exp(["max", 1, 2])).toBe(2);
    expect(exp(["max", 4, 2, 3])).toBe(4);
  });
});

describe("decision", () => {
  test("!", () => {
    expect(exp(["!", true])).toBe(false);
    expect(exp(["!", false])).toBe(true);
    expect(exp(["!", 1])).toBe(false);
    expect(exp(["!", 0])).toBe(true);
    expect(exp(["!", "a"])).toBe(false);
    expect(exp(["!", ""])).toBe(true);
  });

  test("==", () => {
    expect(exp(["==", 1, 1])).toBe(true);
    expect(exp(["==", 1, 2])).toBe(false);
    expect(exp(["==", 1, "1"])).toBe(false);
    expect(exp(["==", "a", "a"])).toBe(true);
    expect(exp(["==", true, true])).toBe(true);
    expect(exp(["==", false, false])).toBe(true);
    expect(exp(["==", true, false])).toBe(false);
  });

  test("!=", () => {
    expect(exp(["!=", 1, 1])).toBe(false);
    expect(exp(["!=", 1, 2])).toBe(true);
    expect(exp(["!=", 1, "1"])).toBe(true);
    expect(exp(["!=", "a", "a"])).toBe(false);
    expect(exp(["!=", true, true])).toBe(false);
    expect(exp(["!=", false, false])).toBe(false);
    expect(exp(["!=", true, false])).toBe(true);
  });

  test("<", () => {
    expect(exp(["<", 1, 2])).toBe(true);
    expect(exp(["<", 2, 1])).toBe(false);
    expect(exp(["<", 1, 1])).toBe(false);
    expect(exp(["<", "a", "b"])).toBe(true);
    expect(exp(["<", "b", "a"])).toBe(false);
    expect(exp(["<", "a", "a"])).toBe(false);
  });

  test("<=", () => {
    expect(exp(["<=", 1, 2])).toBe(true);
    expect(exp(["<=", 2, 1])).toBe(false);
    expect(exp(["<=", 1, 1])).toBe(true);
    expect(exp(["<=", "a", "b"])).toBe(true);
    expect(exp(["<=", "b", "a"])).toBe(false);
    expect(exp(["<=", "a", "a"])).toBe(true);
  });

  test(">", () => {
    expect(exp([">", 1, 2])).toBe(false);
    expect(exp([">", 2, 1])).toBe(true);
    expect(exp([">", 1, 1])).toBe(false);
    expect(exp([">", "a", "b"])).toBe(false);
    expect(exp([">", "b", "a"])).toBe(true);
    expect(exp([">", "a", "a"])).toBe(false);
  });

  test(">=", () => {
    expect(exp([">=", 1, 2])).toBe(false);
    expect(exp([">=", 2, 1])).toBe(true);
    expect(exp([">=", 1, 1])).toBe(true);
    expect(exp([">=", "a", "b"])).toBe(false);
    expect(exp([">=", "b", "a"])).toBe(true);
    expect(exp([">=", "a", "a"])).toBe(true);
  });

  test("all", () => {
    expect(exp(["all", 1, 2, 3, 4, 5])).toBe(true);
    expect(exp(["all", 1, 2, 3, 0, 4, 5])).toBe(false);
    expect(exp(["all", "a", "b", 1, "c", "d"])).toBe(true);
    expect(exp(["all", "a", "b", 1, "", "d"])).toBe(false);
    expect(exp(["all", "a", "b", 1, true, "d"])).toBe(true);
    expect(exp(["all", "a", "b", 1, false, "d"])).toBe(false);
  });

  test("any", () => {
    expect(exp(["any", 0, 0, 0, 0, 1, 0])).toBe(true);
    expect(exp(["any", 0, 0, 0, 0, 0, 0])).toBe(false);
    expect(exp(["any", "", "", 1, "", ""])).toBe(true);
    expect(exp(["any", "", "", "", "", ""])).toBe(false);
    expect(exp(["any", "", "", 1, true, ""])).toBe(true);
    expect(exp(["any", "", "", 0, false, ""])).toBe(false);
  });

  test("if", () => {
    expect(exp(["if", true, "success", "failure"])).toBe("success");
    expect(exp(["if", false, "success", "failure"])).toBe("failure");
    expect(exp(["if", 1, "success", "failure"])).toBe("success");
    expect(exp(["if", 0, "success", "failure"])).toBe("failure");
    expect(exp(["if", "a", "success", "failure"])).toBe("success");
    expect(exp(["if", "", "success", "failure"])).toBe("failure");
    expect(
      exp([
        "if",
        ["==", 5, 1],
        "equal to one",
        ["==", 2, 2],
        "equal to two",
        "failure",
      ])
    ).toBe("equal to two");
    expect(
      exp([
        "if",
        ["==", 5, 1],
        "equal to one",
        ["==", 3, 2],
        "equal to two",
        "failure",
      ])
    ).toBe("failure");
  });
});

describe("decision", () => {
  test("concat", () => {
    expect(exp(["concat", "Edward", " ", "Anthony"])).toBe("Edward Anthony");
    expect(exp(["concat", 1, "pm"])).toBe("1pm");
  });

  test("downcase", () => {
    expect(exp(["downcase", "PM"])).toBe("pm");
    expect(exp(["downcase", "pm"])).toBe("pm");
  });

  test("upcase", () => {
    expect(exp(["upcase", "pm"])).toBe("PM");
    expect(exp(["upcase", "PM"])).toBe("PM");
  });

  test("number-format", () => {
    expect(exp(["number-format", 3.1415926535, 1, 3])).toBe("3.142");
    expect(exp(["number-format", 3, 2, 5])).toBe("3.00");
  });
});

describe("nested", () => {
  test("convert liter/minute to US gallon/hour", () => {
    const literPerMinute = 5;

    expect(
      exp([
        "concat",
        ["*", ["*", literPerMinute, 0.2641722], 60],
        " ",
        "gallon/hour",
      ])
    ).toBe("79.25166 gallon/hour");
  });

  test("nested conditional", () => {
    const getExpression = (animal: string): Expression => [
      "if",
      ["==", animal, "cat"],
      "meow",
      ["==", animal, "dog"],
      "woof",
      "Wa-pa-pa-pa-pa-pa-pow!",
    ];

    expect(exp(getExpression("cat"))).toBe("meow");
    expect(exp(getExpression("dog"))).toBe("woof");
    expect(exp(getExpression("fox"))).toBe("Wa-pa-pa-pa-pa-pa-pow!");
  });

  test("wildcard", () => {
    const data: Data = {
      value: 5,
    };

    expect(
      exp(
        [
          "concat",
          ["number-format", ["*", ["*", "$value", 0.2641722], 60], 0, 1],
          " ",
          "gallon/hour",
        ],
        data
      )
    ).toBe("79.3 gallon/hour");

    const expression: Expression = [
      "if",
      ["==", "$animal", "cat"],
      "meow",
      ["==", "$animal", "dog"],
      "woof",
      "Wa-pa-pa-pa-pa-pa-pow!",
    ];

    expect(exp(expression, { animal: "cat" })).toBe("meow");
    expect(exp(expression, { animal: "dog" })).toBe("woof");
    expect(exp(expression, { animal: "fox" })).toBe("Wa-pa-pa-pa-pa-pa-pow!");
  });
});
