import * as React from 'react';
import Box from '@mui/material/Box';
import { Slider, TextField } from '@mui/material';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 40,
    label: '40',
  },
  {
    value: 60,
    label: 'Show all',
  }
];

function valuetext(value) {
  return `Top ${value} projects`;
}

export default function DiscreteSliderMarks({value, onChange, usedValue}) {

  return (
      <div>
          <Box sx={{ width: 300 }}>
            <Slider
              key={value+Math.random()}
              aria-label="Show top projects"
              defaultValue={value}
              getAriaValueText={valuetext}
              step={5}
              min={0}
              max={60}
              onChange={onChange}
              valueLabelDisplay="auto"
              marks={marks}
            />
            <TextField
            error
            id="outlined-error"
            label="Error"
            value={usedValue}
          />
          </Box>
      </div>
  );
}
