import { InputField, Step, DropDownList } from '../components/common/form';
import { Box } from '@mui/material';
 
const radioButtonProcessor = {
  name: "WhoAreYou",
  priority: 1,
  test: ({ node }) => {
    return (
      node.props.className.split(" ").includes("who-are-you")
    );
  },
  processor: ({ node }) => {
    const firstNameLabel = node?.children[0]?.children[0].content;
    
    return {
      props: { label: firstNameLabel },
      component: InputField,
    };
  },
};

export default radioButtonProcessor;
