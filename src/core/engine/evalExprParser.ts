import { Parser } from "expr-eval";

const betterParser = new Parser({
  operators: {
    logical: true,
  },
});

export default betterParser;
