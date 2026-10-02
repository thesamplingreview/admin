import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FasIcon from '@/components/FasIcon.jsx';
import { usePopup, useAction } from './hooks';
import nodesList from './nodes';

export default function WFNodesSelection() {
  const addNewNode = useAction('addNewNode');
  const [popup, setPopup] = usePopup();

  const [show, setShow] = useState(popup);
  const [selected, setSelected] = useState(null);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setPopup(false);
    }, 300);
  };

  const handleSelect = (node) => {
    setSelected(node || null);
  };

  const handleSubmit = () => {
    if (selected) {
      addNewNode(selected);
      handleClose();
    }
  };

  // apply fade-in animation
  useEffect(() => {
    if (popup) {
      setShow(popup);
    }
  }, [popup]);

  // reset selected
  useEffect(() => {
    if (!popup) {
      setSelected(null);
    }
  }, [popup]);

  if (!popup) {
    return null;
  }
  return (
    <>
      {/* overlay */}
      <Box
        position="absolute"
        zIndex="5"
        top="0"
        bottom="0"
        left="0"
        right="0"
        bgcolor="rgba(0,0,0,30%)"
        className={show ? '__in' : ''}
        sx={{
          opacity: 0,
          transition: 'opacity .3s',
          '&.__in': {
            opacity: 1,
          },
        }}
        onClick={handleClose}
      />

      {/* content */}
      <Paper
        elevation={3}
        square
        className={show ? '__in' : ''}
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          zIndex: 10,
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          transform: 'translateX(100%)',
          transition: 'transform .3s',
          '&.__in': {
            transform: 'translateX(0)',
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={2}
          px={3}
          borderBottom="1px solid var(--border-500)"
        >
          <Typography variant="h6">
            Select an Action
          </Typography>
          <IconButton onClick={handleClose}>
            <FasIcon fontSize="1rem" color="var(--color-300)" name="fa-times" />
          </IconButton>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="1rem"
          flexGrow="1"
          p={3}
          sx={{
            overflowY: 'auto',
          }}
        >
          {Object.values(nodesList).filter((node) => !node.hidden).map((node) => (
            <NodeItem
              key={node.key}
              node={node}
              selected={node.key === selected?.key}
              onSelect={handleSelect}
            />
          ))}
        </Box>
        <Box
          borderTop="1px solid var(--border-500)"
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!selected}
            sx={{
              borderRadius: 0,
              py: 2,
            }}
            onClick={handleSubmit}
          >
            Select
          </Button>
        </Box>
      </Paper>
    </>
  );
}

const NodeItem = ({ node, selected, onSelect }) => {
  const handleSelect = () => {
    onSelect(node);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      backgroundColor="#fff"
      border="1px solid var(--border-500)"
      borderRadius="8px"
      fontSize="0.875rem"
      className={`noselect clickable ${selected ? '__selected' : ''}`}
      p={2}
      sx={{
        boxShadow: 'var(--elevation-2)',
        transition: 'border .3s, background .3s',
        '&:hover': {
          bgcolor: '#716aca0f',
        },
        '&.__selected': {
          borderColor: 'var(--main-500)',
          bgcolor: '#716aca0f',
        },
      }}
      onClick={handleSelect}
    >
      <Box pl={1} pr={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor={`${node.color}28`}
          width="3em"
          height="3em"
          borderRadius="50%"
        >
          <FasIcon
            name={node.icon}
            fontSize="1.25em"
            color={node.color}
          />
        </Box>
      </Box>
      <Box flexGrow="1">
        <Typography variant="inherit" component="div" fontWeight="700">
          {node.name}
        </Typography>
        <Typography variant="caption" component="div" color="textSecondary">
          {node.desc}
        </Typography>
      </Box>
    </Box>
  );
};
