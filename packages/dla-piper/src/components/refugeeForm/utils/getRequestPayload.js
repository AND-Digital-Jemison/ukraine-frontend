import { optionsFamily, optionsVisaType } from '../../refugeeFormSteps';

export const getRequestPayload = (sessionStorage) => {
  const whoAreYou = JSON.parse(sessionStorage.getItem('au_who_are_you'));
  const travel = JSON.parse(sessionStorage.getItem('au_travel_step'));
  const visa = JSON.parse(sessionStorage.getItem('au_visa_step'));
  const visaTypes = optionsVisaType.map(({ value }) =>
    value === visa.visa_type ? { [value]: 'yes' } : { [value]: 'no' }
  );
  const familyInUk = JSON.parse(sessionStorage.getItem('au_family_in_uk'));
  const summary = JSON.parse(sessionStorage.getItem('au_summary'));
  const additionalRisks = JSON.parse(sessionStorage.getItem('au_additional'));
  
  return {
    client: {
      ...whoAreYou,
    },
    info: {
      // travel step
      traveling_with: travel.traveling_with,
      family_members: travel.family_members.map((m) => m.relation).join(', '),
      // visa step
      have_visa: visa.have_visa,
      ...Object.assign({}, ...visaTypes),
      // family step
      family_member_in_uk:
        familyInUk.family_member_in_uk === optionsFamily[0] ? 'no' : 'yes',
      best_describes_uk_family_member:
        familyInUk.best_describes_uk_family_member,
      uk_family_first_name: familyInUk.uk_family_first_name,
      uk_family_last_name: familyInUk.uk_family_last_name,
      uk_family_last_name: familyInUk.uk_family_last_name,
      uk_family_email: familyInUk?.uk_family_email ?? '', // TODO: do we need to collect this?
      uk_family_phone: familyInUk?.uk_family_phone ?? '', // TODO: do we need to collect this?
      uk_family_relation_to_you: familyInUk.uk_family_relation_to_you,
      // Summary step
      summarise_help_needed: summary.summarise_help_needed,
      // additional step
      additional_risks: additionalRisks.additional_risks,
    },
  };
};
