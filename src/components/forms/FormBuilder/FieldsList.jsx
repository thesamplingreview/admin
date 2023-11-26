import Box from '@mui/material/Box';
import FieldItem from './FieldItem.jsx';

export default function FieldsList({ fields, onChange }) {
  const handleFieldChanged = (index, newField) => {
    const newFields = [...fields];
    newFields[index] = newField;
    onChange(newFields);
  };

  return (
    <Box>
      {fields.map((field, index) => (
        <FieldItem
          key={field.key}
          index={index + 1}
          field={field}
          onChange={(newVal) => handleFieldChanged(index, newVal)}
        />
      ))}
    </Box>
  );
}
