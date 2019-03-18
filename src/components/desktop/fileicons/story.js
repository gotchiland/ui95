import { h } from "preact";
import { storiesOf } from "@storybook/react";
import FileIcons from "./index.js";

storiesOf("Components/Desktop/FileIcons", module)
  .add("icons", () => {
    const icons = ["(C:)", "My Documents", "Program Files", "Windows"].map(
      label => ({
        label
      })
    );
    return <FileIcons items={icons} onClick={e => console.log(e)} />;
  })
  .add("icons selected", () => {
    const icons = ["(C:)", "My Documents", "Program Files", "Windows"].map(
      label => ({
        label,
        selected: true
      })
    );
    return <FileIcons items={icons} onClick={e => console.log(e)} />;
  });
