const relations = [
  { label: 'Mother', value: 'mother' },
  { label: 'Father', value: 'father' },
  { label: 'Sibling', value: 'sibling' },
  { label: 'Son', value: 'son' },
  { label: 'Daughter', value: 'daughter' },
  { label: 'Step-Sibling', value: 'step_sibling' },
  { label: 'Step Mother/Step Father', value: 'step_mother_step_father' },
  { label: 'Step Son', value: 'step_son' },
  { label: 'Step Daughter', value: 'step_daughter' },
  { label: 'Grandparent', value: 'grandparent' },
  { label: 'Aunt/Uncle', value: 'aunt_uncle' },
  { label: 'Niece/Nephew', value: 'niece_nephew' },
  { label: 'Cousin', value: 'cousin' },
  { label: 'Father in-law/Mother in-law', value: 'farther_mother_in_law' },
  { label: 'Sister in-law/Brother in-law', value: 'sister_brother_in_law' },
  { label: 'Spouse/Civil Partner', value: 'spouse_civil_partner_unmarried_partners' },
];

export default relations;


// NOTE: need to speak to legal connection on this as the options are not consistent 
//  options: mother, father, sibling, son, daughter, step-sibling, step_mother_step_father
//  grandparent, aunt_uncle, niece_nephew, cousin, father_mother_in_law, sister_brother_in_law
//  spouse_civil_partner_unmarried_partners