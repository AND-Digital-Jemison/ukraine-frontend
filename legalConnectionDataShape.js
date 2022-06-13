// Authored by legal connection 
//Create matter on app.legalconnection.co with custom data


var theData = {
  client: {
    firstname: 'John',													//First name
    lastname: 'Baker',													//Last name
    date_of_birth: '1975-10-22',    									//Date of Birth | format must be the same
    email: 'lsdkfjskd@gmail.com'										//Email address
  },
  info: {
    traveling_with: 'alone', 											//Who are you travelling with? | value must be 'alone' or 'with_family'  - case sensitive
    family_members: 'Son, Son, Daughter',								//Travelling with family member relationships - Seperated by comma | text value, family members relationships separated by comma

    have_visa: 'yes',													//Do you have any exisiting visas for the UK | value must be 'yes' or 'no' - case sensitive
    working_visa: 'yes',												//Visa type - Working visa? | value must be 'yes' or 'no'  - case sensitive
    study_visa: 'no',													//Visa type - Study visa? | value must be 'yes' or 'no'  - case sensitive
    settlement_indefinate_visa: 'yes',									//Visa type - Settlement / Indefinate leave to remain visa? | yes or no
    visitor_visa: 'no',													//Visa type - Visitor visa? | value must be 'yes' or 'no'  - case sensitive
    family_visa: 'yes',													//Visa type - Family visa? | value must be 'yes' or 'no'  - case sensitive
    refugee_visa: 'no',													//Visa type - Refugee visa? | value must be 'yes' or 'no'  - case sensitive
    discretionary_leave_visa: 'no',										//Visa type - Discretionary leave to remain visa? | value must be 'yes' or 'no'  - case sensitive
    permanent_living_visa: 'yes',										//Visa type - Permanent living visa? | value must be 'yes' or 'no'  - case sensitive	
    presettled_visa: 'yes',												//Visa type - Pre-settled status (EU) visa? | value must be 'yes' or 'no'  - case sensitive	
    british_citizenship_visa: 'no',										//Visa type - British citizenship? | value must be 'yes' or 'no'  - case sensitive	
    other_visa: 'no',													//Visa type - Other visa? | value must be 'yes' or 'no'  - case sensitive	

    family_member_in_uk: 'no',											//Do you have a family member in the UK? | value must be 'yes' or 'no'  - case sensitive
    best_describes_uk_family_member: 'british',							//Which of the following best describes your UK based family member?
    //options are: british, settled, refugee, pre-settled, none    

    uk_family_first_name: 'text value',									//UK family - First name | text value								
    uk_family_last_name: 'text value',									//UK family - Last name | text value
    uk_family_email: 'text value',										//UK family - Email | text value
    uk_family_phone: 'text value',										//UK family - Phone | text value

    uk_family_relation_to_you: 'mother',								//UK family - Relation to you |
    //options: mother, father, sibling, son, daughter, step-sibling, step_mother_step_father
    //grandparent, aunt_uncle, niece_nephew, cousin, father_mother_in_law, sister_brother_in_law
    //spouse_civil_partner_unmarried_partners

    why_do_you_need_legal_assistance: 'join_family_or_friends',			//Why do you need legal assistance? |
    //options: join_family_or_friends, dont_know_anyone, in_uk_without_visa,

    //in_uk_expiring_visa, home_office_question, home_office_delays
    additional_risks: 'text value'										//Additional Risks | text value
  }
};


$.ajax({	//Or javascript fetch function		
  method: "POST",
  url: "https://lc-travis24-legal-connection-d8.pantheonsite.io/dlapiper/ukraine/create",
  dataType: "json",
  data: theData
})
  .done(function (msg) {

  });




