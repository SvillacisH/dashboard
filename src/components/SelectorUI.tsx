import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';

interface SelectorUIProps {
  label: string;
  options: string[];
  onOptionSelect: (value: string) => void;
  disabled?: boolean;
  resetTrigger?: any;
}

export default function SelectorUI({
  label,
  options,
  onOptionSelect,
  disabled = false,
  resetTrigger
}: SelectorUIProps) {
  
  const [value, setValue] = useState("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const val = event.target.value;
    setValue(val);
    onOptionSelect(val);
  };

  
  useEffect(() => {
    setValue("");
  }, [resetTrigger]);

  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>

        <MenuItem disabled>
          <em>Seleccione {label.toLowerCase()}</em>
        </MenuItem>

        {options.map(opt => (
          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
