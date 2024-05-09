import { useRef, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FasIcon from '@/components/FasIcon.jsx';
import { useAction } from './hooks';
import nodesList from './nodes';

export default function WFNodeBlock({ node }) {
  const removeNode = useAction('removeNode');
  const updateConfig = useAction('updateNodeConfig');
  const elActions = useRef(null);
  const [openConfig, setOpenConfig] = useState(false);
  const [openActions, setOpenActions] = useState(false);

  const currNode = useMemo(() => {
    return nodesList[node.type] || null;
  }, [node]);

  const handleToggleOpen = () => {
    setOpenConfig((oldState) => !oldState);
  };

  const handleToggleActions = () => {
    setOpenActions((oldState) => !oldState);
  };

  const handleChange = (e) => {
    const newConfig = {
      ...node.config,
      [e.target.name]: e.target.value,
    };
    updateConfig(node.id, newConfig);
  };

  const handleDelete = () => {
    setOpenConfig(false);
    setOpenActions(false);
    removeNode(node);
  };

  if (!currNode) {
    return null;
  }
  return (
    <Box
      backgroundColor="#fff"
      border="1px solid var(--border-500)"
      borderRadius="8px"
      width="var(--wf-width)"
      fontSize="0.875rem"
      className="noselect"
      mx="auto"
      sx={{ boxShadow: 'var(--elevation-2)' }}
    >
      <Box
        display="flex"
        alignItems="center"
        p={2}
        className="clickable"
        onClick={handleToggleOpen}
      >
        <Box pl={1} pr={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor={`${currNode.color}28`}
            width="3em"
            height="3em"
            borderRadius="50%"
          >
            <FasIcon
              name={currNode.icon}
              fontSize="1.25em"
              color={currNode.color}
            />
          </Box>
        </Box>
        <Box flexGrow="1">
          <Typography variant="inherit" component="div" fontWeight="700">
            {currNode.name}
          </Typography>
          <Typography variant="caption" component="div" color="textSecondary">
            {currNode.desc}
          </Typography>
        </Box>
        <Box onClick={(e) => e.stopPropagation()}>
          <IconButton
            ref={elActions}
            sx={{ width: '1.25em' }}
            onClick={handleToggleActions}
          >
            <FasIcon
              name="fa-ellipsis-vertical"
              color="var(--color-300)"
              fontSize="1.25rem"
            />
          </IconButton>
          <BlockActions
            open={openActions}
            anchorEl={elActions.current}
            onClose={handleToggleActions}
            onDelete={handleDelete}
          />
        </Box>
      </Box>
      {openConfig && currNode.configComp && (
        <Box borderTop="1px solid var(--border-500)" p={2}>
          <currNode.configComp config={node.config || {}} onChange={handleChange} />
          <Box mt={2}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleToggleOpen}
            >
              Close
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

const BlockActions = ({
  open,
  anchorEl,
  onClose,
  onDelete,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      elevation={2}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          minWidth: '180px',
        },
      }}
    >
      <MenuItem
        sx={{ fontSize: '0.875rem' }}
        onClick={onDelete}
      >
        Delete this action?
      </MenuItem>
    </Menu>
  );
};
