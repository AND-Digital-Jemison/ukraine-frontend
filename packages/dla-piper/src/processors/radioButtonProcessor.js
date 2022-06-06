import { RadioButtonGroup } from "../components/common/form";

const radioButtonProcessor = {
  name: "RadioButton",
  priority: 1,
  test: ({ node }) => {
    return (
      node.component === "span" &&
      node.props.className.split(" ").includes("wpcf7-checkbox")
    );
  },
  processor: ({ node }) => {
    const label = node?.children[1]?.children[0]?.children[0]?.props?.name;
    const options = node?.children?.map(x => x?.children[0]?.children[0]?.props?.value);

    return {
      props: { label, options },
      component: RadioButtonGroup,
    };
  },
};

export default radioButtonProcessor;
