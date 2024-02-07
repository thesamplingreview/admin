import { ReactSortable } from 'react-sortablejs';
import Box from '@mui/material/Box';
import FieldItem from './FieldItem.jsx';

export default function FieldsList({ fields, errors, onChange }) {
  const handleFieldChange = (index, newField) => {
    const newFields = [...fields];
    newFields[index] = newField;
    onChange(newFields);
  };

  const handleFieldRemove = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    onChange(newFields);
  };

  const handleFieldDuplicate = (index, field) => {
    const newFields = [...fields];
    // clone field
    const newField = {
      ...field,
      key: (new Date()).valueOf(),
      name: `${field.name} (copy)`,
      show: true,
    };
    delete newField.id;
    newFields.splice(index + 1, 0, newField);
    onChange(newFields);
  };

  return (
    <Box>
      <ReactSortable list={fields} setList={onChange} handle=".drag-handler">
        {fields.map((field, index) => (
          <FieldItem
            key={field.key}
            index={index + 1}
            field={field}
            allFields={fields}
            sx={{
              borderBottom: '1px solid var(--border-500)',
              transition: 'opacity .3s',
              '&.sortable-ghost': {
                opacity: 0.3,
              },
            }}
            error={errors?.[index]}
            onChange={(newVal) => handleFieldChange(index, newVal)}
            onRemove={() => handleFieldRemove(index)}
            onDuplicate={(val) => handleFieldDuplicate(index, val)}
          />
        ))}
      </ReactSortable>
    </Box>
  );
}
