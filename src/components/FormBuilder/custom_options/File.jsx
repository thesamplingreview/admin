import { useMemo } from 'react';
import CInput from '@/components/CInput.jsx';
import CSelect from '@/components/CSelect.jsx';
import CFormControl from '@/components/CFormControl.jsx';

export default function OptionFile({
  field,
  onChange,
}) {
  const acceptOptions = useMemo(() => ([
    { id: 'image', name: 'Images' },
    { id: 'pdf', name: 'PDF only' },
  ]), []);

  return (
    <>
      <CFormControl label="Allowed File">
        <CSelect
          options={acceptOptions}
          name="accept"
          label="Select type"
          placeholder="Default (all)"
          helperText="Allowing all are not recommended."
          value={field.config?.accept || ''}
          onChange={onChange}
        />
      </CFormControl>
      <CFormControl label="Max. File Size (Mb)" size={4}>
        <CInput
          type="number"
          name="max_size"
          label="Enter value"
          placeholder="Default 4Mb"
          min="1"
          value={field.config?.max_size || ''}
          onChange={onChange}
        />
      </CFormControl>
    </>
  );
}
