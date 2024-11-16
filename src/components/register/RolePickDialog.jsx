import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import React from "react";

const options = [
  "User",
  "Hotel Owner",
  "Admin"
];

export default function RolePickDialog({ onClose, value: valueProp, open, ...other }){
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

 return( <Dialog
    sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
    maxWidth="xs"
    TransitionProps={{ onEntering: handleEntering }}
    onClose={() => onClose(value)}
    open={open}

    {...other}
  >
    <DialogTitle>Role selection</DialogTitle>
    <DialogContent dividers>
      <RadioGroup
        ref={radioGroupRef}
        aria-label="role"
        name="role"
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <FormControlLabel
            value={option}
            key={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleOk}>Ok</Button>
    </DialogActions>
  </Dialog>
);
}