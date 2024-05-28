import { useState } from 'react';
import Box from '@mui/material/Box';
import { WFContextProvider } from './WFContext.jsx';
import WFHeader from './WFHeader.jsx';
import WFEditor from './WFEditor.jsx';
import WFNodesSelection from './WFNodesSelection.jsx';

export default function WorkflowEditor({
  title,
  value = [],
  options = [],
  loading = false,
  height = '500px',
  initFull = false,
  onSave,
  onEditName,
  onBack,
}) {
  const [isFull, setIsFull] = useState(initFull);

  return (
    <WFContextProvider
      dataset={value}
      options={options}
      loading={loading}
      onSave={onSave}
    >
      <Box
        display="flex"
        flexDirection="column"
        position="relative"
        overflow="hidden"
        bgcolor="var(--bg-500)"
        sx={[
          isFull && {
            position: 'fixed',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
        ]}
      >
        <WFHeader
          title={title}
          isFull={isFull}
          setIsFull={setIsFull}
          onBack={onBack}
          onEditName={onEditName}
        />
        <WFEditor
          isFull={isFull}
          height={height}
        />
        <WFNodesSelection />
      </Box>
    </WFContextProvider>
  );
}
