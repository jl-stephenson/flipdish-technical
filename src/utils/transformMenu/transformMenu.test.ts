import { describe, expect, it } from "vitest";
import { transformMenu } from "./transformMenu";
import menuData from "../../__mocks__/menuData.json";

describe("transform menu", () => {
  const transformedMenu = transformMenu(menuData);

  it("returns a menu object with properties MenuId & MenuSections", () => {
    expect(Object.keys(transformedMenu)).toHaveLength(2);
    expect(transformedMenu).toHaveProperty("MenuId");
    expect(transformedMenu).toHaveProperty("MenuSections");
  });

  it("returns a sections array with required properties", () => {
    const sections = transformedMenu.MenuSections;
    expect(Object.keys(sections)).toHaveLength(6);
    expect(sections).toHaveProperty("MenuSectionId");
    expect(sections).toHaveProperty("Name");
    expect(sections).toHaveProperty("Description");
    expect(sections).toHaveProperty("ImageName");
    expect(sections).toHaveProperty("ImageUrl");
    expect(sections).toHaveProperty("MenuItems");
  });
});
