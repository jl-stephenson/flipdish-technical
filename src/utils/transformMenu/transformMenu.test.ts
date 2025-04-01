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

  it("returns an array of sections objects with required properties", () => {
    const section = transformedMenu.MenuSections[0];
    expect(Object.keys(section)).toHaveLength(6);
    expect(section).toHaveProperty("MenuSectionId");
    expect(section).toHaveProperty("Name");
    expect(section).toHaveProperty("Description");
    expect(section).toHaveProperty("ImageName");
    expect(section).toHaveProperty("ImageUrl");
    expect(section).toHaveProperty("MenuItems");
  });
});
