import { recaseIt } from "./index";

describe("recaseIt", () => {
  it("recaseIt works as expected", () => {
    const WillBePascalCase = recaseIt('Will-Be pascal-case');
    expect(WillBePascalCase).toEqual('WillBePascalCase');
    
    const willBeCamelCase = recaseIt('will-Be camel-case');
    expect(willBeCamelCase).toEqual('willBeCamelCase');
  });
});