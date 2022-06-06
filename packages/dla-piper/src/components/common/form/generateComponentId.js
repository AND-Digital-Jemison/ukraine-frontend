const generateComponentId = (label, componentType) =>
  `${label?.replace(/ /g, "-")}-${componentType}`;


export default generateComponentId;