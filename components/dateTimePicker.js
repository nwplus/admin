import DatePicker from 'react-datepicker';
import { InputField } from './input';

export const DateTimePicker = ({ selected, onChange }) => {
  return (
    <DatePicker
      customInput={<InputField />}
      selected={selected}
      onChange={onChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeCaption="Time"
      dateFormat="yyyy-MM-dd h:mm aa"
    />
  );
};

export default DateTimePicker;
