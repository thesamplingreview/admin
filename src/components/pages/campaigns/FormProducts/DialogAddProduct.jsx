import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useUpdated } from '@/helpers/hooks';
import { useFetch } from '@/contexts/hooks/auth';
import CLoader from '@/components/CLoader.jsx';
import CAvatar from '@/components/CAvatar.jsx';

export default function DialogAddProduct({
  open,
  selected = [],
  onClose,
  onSelect,
}) {
  const doFetch = useFetch();
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState([]);
  const [input, setInput] = useState('');

  const fetchProducts = useCallback(async () => {
    setInput('');
    setLoading(true);
    try {
      const { data } = await doFetch('/v1/admin/products?status=active');
      setDataset(data);
    } catch (err) {
      // ...
    }
    setLoading(false);
  }, [doFetch]);

  const handleAdd = () => {
    const product = dataset.find((d) => d.id === input);
    if (product) {
      onSelect({
        id: product.id,
        name: product.name,
        brand: product.brand,
        imageUrl: product.image_url,
      });
    }
  };

  useUpdated(() => {
    if (open) {
      fetchProducts();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      onClose={onClose}
    >
      <DialogTitle>
        Select Product
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        {loading && <CLoader py={6} />}
        {!loading && dataset.length > 0 && (
          <List sx={{ maxHeight: '380px' }}>
            {dataset.map((data) => (
              <ListItem
                key={data.id}
                selected={data.id === input}
                disablePadding
              >
                <ListItemButton
                  disabled={selected.includes(data.id)}
                  onClick={() => setInput(data.id)}
                >
                  <ListItemAvatar>
                    <CAvatar
                      name={data.name}
                      src={data.image_url}
                      variant="rounded"
                      sx={{ width: 48, height: 48 }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={data.name} secondary={data.brand} sx={{ ml: 1 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="text" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" disabled={!input} onClick={handleAdd}>
          Add Product
        </Button>
      </DialogActions>
    </Dialog>
  );
}
