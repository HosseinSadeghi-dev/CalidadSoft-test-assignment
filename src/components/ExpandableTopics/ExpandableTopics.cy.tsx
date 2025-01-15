import { mount } from "cypress/react18";
import ExpandableTopics from "./ExpandableTopics";
import { TOCEntityTree } from "@/types/Sidenav/MenuItems.type";

describe("ExpandableTopics Component", () => {
  const mockTopics: TOCEntityTree[] = [
    {
      id: "1",
      title: "Topic 1",
      level: 0,
      parentId: "",
      tabIndex: 0,
      subEntities: [
        {
          id: "1-1",
          title: "Subtopic 1-1",
          level: 1,
          parentId: "1",
          tabIndex: 0,
        },
        {
          id: "1-2",
          title: "Subtopic 1-2",
          level: 1,
          parentId: "1",
          tabIndex: 0,
          subEntities: [
            {
              id: "1-2-1",
              title: "Subtopic 1-2-1",
              level: 2,
              parentId: "1-2",
              tabIndex: 0,
            },
          ],
        },
      ],
    },
    {
      id: "2",
      title: "Topic 2",
      level: 0,
      parentId: "",
      tabIndex: 0,
    },
  ];

  it("renders the topics correctly", () => {
    mount(<ExpandableTopics topics={mockTopics} />);

    cy.contains("Topic 1").should("exist");
    cy.contains("Topic 2").should("exist");
  });

  it("expands and collapses topics correctly", () => {
    mount(<ExpandableTopics topics={mockTopics} />);

    cy.contains("Subtopic 1-1").should("not.exist");
    cy.contains("Subtopic 1-2").should("not.exist");

    cy.contains("Topic 1").click();

    cy.contains("Subtopic 1-1").should("be.visible");
    cy.contains("Subtopic 1-2").should("be.visible");

    cy.contains("Topic 1").click();

    cy.contains("Subtopic 1-1").should("not.exist");
    cy.contains("Subtopic 1-2").should("not.exist");
  });

  it("handles nested topics correctly", () => {
    mount(<ExpandableTopics topics={mockTopics} />);

    cy.contains("Topic 1").click();

    cy.contains("Subtopic 1-2").click();

    cy.contains("Subtopic 1-2-1").should("be.visible");

    cy.contains("Subtopic 1-2").click();

    cy.contains("Subtopic 1-2-1").should("not.exist");
  });

  it("does not break when there are no topics", () => {
    mount(<ExpandableTopics topics={[]} />);

    cy.get("ul").should("exist");
    cy.get("li").should("not.exist");
  });
});
