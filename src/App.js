import React from "react";

import { Item, Section } from "react-stately";

import { ListBox } from "./ListBox";

function App() {
  const [selectedKeys, setSelectedKeys] = React.useState([]);

  return (
    <div>
      <ListBox
        label="Choose an option"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(selectedKeys) => {
          setSelectedKeys([...selectedKeys.values()]);
        }}
      >
        <Section title="Section 1">
          <Item key={1}>One</Item>
          <Item key={2}>Two</Item>
          <Item key={3}>Three</Item>
        </Section>
        <Section title="Section 2">
          <Item key={4}>One</Item>
          <Item key={5}>Two</Item>
          <Item key={6}>Three</Item>
        </Section>
      </ListBox>
      <pre>
        {JSON.stringify({ keys: selectedKeys }, null, 2)}
      </pre>
    </div>
  );
}

export default App;
