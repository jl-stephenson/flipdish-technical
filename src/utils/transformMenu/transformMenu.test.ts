import { describe, expect, it } from "vitest";
import { transformMenu } from "./transformMenu";
import menuData from "../../__mocks__/menuData.json";

describe("transform menu", () => {
  it("returns a menu object with properties MenuId & MenuSections", () => {
    const transformedMenu = transformMenu(menuData);
    expect(Object.keys(transformedMenu)).toHaveLength(2);
    expect(transformedMenu).toHaveProperty("MenuId");
    expect(transformedMenu).toHaveProperty("MenuSections");
  });

});
