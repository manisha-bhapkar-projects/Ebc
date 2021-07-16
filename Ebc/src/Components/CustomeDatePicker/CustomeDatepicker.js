import React from "react";
import PropTypes from "prop-types";
import DatePicker from 'react-datepicker';
import moment from "moment";


const CustomeDatepicker = ({ input }) => {

    const onChange = event => {
      const pickedDate = event.path.to.value;
      input.onChange(pickedDate);
    }
  
    return (
      <div>
        <DatePicker
          dateFormat="YYYY-MM-DD"
          selected={input.value ? moment(input.value) : null}
          onChange={ onChange }
        />
      </div>
    );
  }
  
//   CustomeDatepicker.propTypes = {
//     input: PropTypes.shape().isRequired,
//     meta: PropTypes.shape().isRequired
//   };
  
  export default CustomeDatepicker;