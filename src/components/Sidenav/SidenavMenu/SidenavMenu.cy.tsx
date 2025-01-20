import { mount } from "cypress/react18";
import SidenavMenu from "./SidenavMenu";
import { TOC } from "@/types/Sidenav/MenuItems.type";

describe("SidenavMenu Component", () => {
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
    cy.intercept("GET", "/data/data.json", {
      statusCode: 200,
      body: mockTOC,
    }).as("getMenuItems");
    mount(<SidenavMenu />);
  });

  it("should render the search input", () => {
    cy.get('input[type="text"]').should("exist");
  });

  it("should display loading skeletons initially", () => {
    cy.get('[data-testid="skeleton"]').should("have.length", 20);
  });

  it("should fetch and display menu items", () => {
    cy.contains("Topic 1").should("exist");
    cy.contains("Topic 2").should("exist");
  });

  it("should filter menu items based on search input", () => {
    cy.get('input[type="text"]').type("Subtopic 1-1");
    cy.wait(500);
    cy.contains("Subtopic 1-1").should("exist");
    cy.contains("Subtopic 1-2").should("not.exist");
  });

  it("should display an error message if fetching fails", () => {
    cy.intercept("GET", "/data/data.json", {
      statusCode: 500,
      body: { message: "Internal Server Error" },
    }).as("getMenuItemsError");
    mount(<SidenavMenu />);
    cy.get(".text-red-500").should("contain", "Failed to fetch menu items");
  });
});
