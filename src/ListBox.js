import React from "react";

import { useListState } from "react-stately";
import {
  useListBox,
  useOption,
  useListBoxSection,
  useSeparator,
  useFocusRing,
  mergeProps,
} from "react-aria";

export function ListBox(props) {
  let state = useListState(props);
  let ref = React.useRef();
  let { listBoxProps, labelProps } = useListBox(props, state, ref);

  return (
    <>
      <div {...labelProps}>{props.label}</div>
      <ul
        {...listBoxProps}
        ref={ref}
        style={{
          padding: 0,
          margin: "5px 0",
          listStyle: "none",
          border: "1px solid gray",
          maxWidth: 250,
        }}
      >
        {[...state.collection].map((item) => (
          <ListBoxSection key={item.key} section={item} state={state} />
        ))}
      </ul>
    </>
  );
}

function ListBoxSection({ section, state }) {
  let { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  let { separatorProps } = useSeparator({
    elementType: "li",
  });

  // If the section is not the first, add a separator element.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li
          {...separatorProps}
          style={{
            borderTop: "1px solid gray",
            margin: "2px 5px",
          }}
        />
      )}
      <li {...itemProps}>
        {section.rendered && (
          <span
            {...headingProps}
            style={{
              fontWeight: "bold",
              fontSize: "1.1em",
              padding: "2px 5px",
            }}
          >
            {section.rendered}
          </span>
        )}
        <ul
          {...groupProps}
          style={{
            padding: 0,
            listStyle: "none",
          }}
        >
          {[...section.childNodes].map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}

function Option({ item, state }) {
  // Get props for the option element
  let ref = React.useRef();
  let isDisabled = state.disabledKeys.has(item.key);
  let isSelected = state.selectionManager.isSelected(item.key);
  let { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      isSelected,
    },
    state,
    ref
  );

  // Determine whether we should show a keyboard
  // focus ring for accessibility
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      style={{
        background: isSelected ? "blueviolet" : "transparent",
        color: isSelected ? "white" : null,
        padding: "2px 5px",
        outline: isFocusVisible ? "2px solid orange" : "none",
      }}
    >
      {item.rendered}
    </li>
  );
}