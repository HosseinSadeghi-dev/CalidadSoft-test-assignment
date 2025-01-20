import { mount } from "cypress/react18";
import AnchorList from "./AnchorList";
import { useAnchorStore } from "@/store/anchors.store";

describe("AnchorList Component", () => {
  beforeEach(() => {
    if (window.Cypress) {
      // @ts-expect-error "store not exist on window"
      window.store = useAnchorStore;
    }
    mount(<AnchorList />);
  });

  it("should display anchors when available", () => {
    cy.window()
      .its("store")
      .then((store) => {
        store.setState({
          anchors: [
            { id: "1", title: "Anchor 1", anchor: "anchor-1" },
            { id: "2", title: "Anchor 2", anchor: "anchor-2" },
          ],
        });
      });

    cy.get("nav").should("exist");
    cy.get("b").contains("On this page:").should("be.visible");
    cy.get("ul").children().should("have.length", 2);
    cy.get("li").first().contains("Anchor 1").should("be.visible");
    cy.get("li").last().contains("Anchor 2").should("be.visible");
  });

  it("should not display anchors when none are available", () => {
    cy.window()
      .its("store")
      .then((store) => {
        store.setState({
          anchors: [],
        });
      });

    cy.get("nav").children().should("have.length", 0);
  });
});
