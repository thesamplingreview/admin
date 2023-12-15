import CInput from '@/components/CInput.jsx';
import CTextArea from '@/components/CTextArea.jsx';
import CFormControl from '@/components/CFormControl.jsx';

export default function OptionSelect({
  field,
  onChange,
}) {
  return (
    <>
      <CFormControl label="Select Options">
        <CTextArea
          name="options"
          label="Enter option"
          value={field.options || ''}
          onChange={onChange}
          helperText="Each line represent a single option"
        />
      </CFormControl>
      <CFormControl label="Max Selection">
        <CInput
          type="number"
          name="config.select_count"
          label="Enter number"
          placeholder="Default 1"
          min="1"
          helperText="Hint variable: %%total%%, %%count%%, %%left%%"
          value={field['config.select_count'] || ''}
          onChange={onChange}
        />
      </CFormControl>
    </>
  );
}
