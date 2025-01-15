/// <reference types="cypress" />
import { mount } from "cypress/react18";
import { TOC } from "./MenuItems.type";
import { MenuItemsApi } from "./MenuItems.api";
import SidenavMenu from "./SidenavMenu";

describe("SidenavMenu Component with Search", () => {
  const mockTOC: TOC = {
    topLevelIds: ["1", "2"],
    entities: {
      pages: {
        "1": {
          id: "1",
          title: "Topic 1",
          parentId: "",
          level: 0,
          tabIndex: 0,
          pages: ["1-1", "1-2"],
        },
        "1-1": {
          id: "1-1",
          title: "Subtopic 1-1",
          parentId: "1",
          level: 1,
          tabIndex: 0,
        },
        "1-2": {
          id: "1-2",
          title: "Subtopic 1-2",
          parentId: "1",
          level: 1,
          tabIndex: 0,
        },
        "2": {
          id: "2",
          title: "Topic 2",
          parentId: "",
          level: 0,
          tabIndex: 0,
        },
      },
    },
  };

  beforeEach(() => {
    cy.stub(MenuItemsApi, "default").resolves(mockTOC);
  });

  it("displays skeleton loader while loading", () => {
    cy.stub(MenuItemsApi, "default" as keyof typeof MenuItemsApi).callsFake(
      () => new Promise(() => {})
    );
    mount(<SidenavMenu />);
    cy.get(".skeleton").should("have.length", 20);
  });

  it("renders the fetched menu items", () => {
    mount(<SidenavMenu />);
    cy.contains("Topic 1").should("exist");
    cy.contains("Topic 2").should("exist");
    cy.contains("Subtopic 1-1").should("not.exist");

    cy.contains("Topic 1").click();
    cy.contains("Subtopic 1-1").should("exist");
    cy.contains("Subtopic 1-2").should("exist");
  });

  it("displays an error message if the API fails", () => {
    cy.stub(MenuItemsApi, "default" as keyof typeof MenuItemsApi).rejects(
      new Error("API error")
    );
    mount(<SidenavMenu />);
    cy.contains("Failed to fetch menu items").should("exist");
  });

  it("handles empty menu data gracefully", () => {
    cy.stub(MenuItemsApi, "default" as keyof typeof MenuItemsApi).resolves({
      topLevelIds: [],
      entities: { pages: {} },
    });
    mount(<SidenavMenu />);
    cy.get("ul").should("exist");
    cy.get("li").should("not.exist");
  });

  it("filters menu items based on search input", () => {
    mount(<SidenavMenu />);
    cy.get("input").type("Subtopic 1-1");
    cy.contains("Subtopic 1-1").should("exist");
    cy.contains("Subtopic 1-2").should("not.exist");
    cy.contains("Topic 1").should("exist");
  });

  it("clears search input and resets menu items", () => {
    mount(<SidenavMenu />);
    cy.get("input").type("Subtopic 1-1");
    cy.contains("Subtopic 1-1").should("exist");
    cy.get("input").clear();
    cy.contains("Subtopic 1-2").should("exist");
  });
});
