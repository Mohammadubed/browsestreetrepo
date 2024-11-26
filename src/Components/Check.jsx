import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function Check({ value, setValue }) {
  const handleChange = (event) => {
    setValue(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'Checkbox demo' , }}
            sx={{
              '&.Mui-checked': {
                color: 'maroon',
              },
            }}
          />
        }
        label="Stay Login ?"
        labelPlacement="end"
      />
    </div>
  );
}
export default Check