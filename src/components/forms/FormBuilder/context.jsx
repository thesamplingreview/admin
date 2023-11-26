import { createContext, useState } from 'react';

const initialState = {
  fields: [],
};

const FormBuilderContext = createContext(initialState);

export default FormBuilderContext;

export const FormBuilderProvider = ({
  defaultFields,
  children,
}) => {
  const [fields, setFields] = useState(defaultFields, initialState.fields);

  return (
    <FormBuilderContext.Provider value={{
      fields,
      setFields,
    }}>
      {children}
    </FormBuilderContext.Provider>
  );
};
