import { useMemo } from 'react';
import CCheckboxes from '@/components/CCheckboxes.jsx';
import CFormControl from '@/components/CFormControl.jsx';

export default function OptionAddress({
  field,
  onChange,
}) {
  const fields = useMemo(() => {
    return [
      { id: 'address', name: 'Address' },
      { id: 'name', name: 'Full name' },
      { id: 'email', name: 'Email address' },
      { id: 'contact', name: 'Phone number' },
    ];
  }, []);

  return (
    <>
      <CFormControl label="Show Fields">
        <CCheckboxes
          name="config.fields"
          label="Select"
          options={fields}
          value={field['config.fields'] || []}
          col={{ xs: 12, md: 6, lg: 4 }}
          onChange={onChange}
        />
      </CFormControl>
    </>
  );
}
