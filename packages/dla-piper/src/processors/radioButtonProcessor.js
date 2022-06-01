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
      console.log('node', node)
    const content = node.children[0].children[0];
    console.log('content', content)

    return {
      props: { 
          label: "Some label",
          options: ['test1', 'test2']
       },
      component: RadioButtonGroup,
    };
  },
};

export default radioButtonProcessor;
