import CInput from '@/components/CInput.jsx';
import CFormControl from '@/components/CFormControl.jsx';

export default function OptionText({
  field,
  onParentChange,
}) {
  return (
    <>
      <CFormControl label="Placeholder">
        <CInput
          name="placeholder"
          label="Placeholder text"
          value={field.placeholder || ''}
          onChange={onParentChange}
        />
      </CFormControl>
    </>
  );
}
