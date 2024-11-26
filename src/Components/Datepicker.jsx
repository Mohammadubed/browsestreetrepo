import React, { useState, useEffect, useRef } from 'react'
import DatePick from './ComponentInterface/DatePick'

function Datepicker(props) {
    const [warn, setWarn] = useState(false);
    const prevTriggerRef = useRef(props.trigger);

    const isAgeGreaterThanOrEqual15 = (dob) => {
        if(dob===null){return false}
        const today = new Date(); // Get today's date
        const birthDate = new Date(dob); // Convert dob string or value to Date object
        let age = today.getFullYear() - birthDate.getFullYear(); // Calculate the year difference
        const monthDifference = today.getMonth() - birthDate.getMonth();

        // Adjust age if the birth month hasn't occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age >= 15; // Return true if age is greater than or equal to 15, otherwise false
    };

    const verify = () => {
        
        if (isAgeGreaterThanOrEqual15(props.value)) {
            setWarn(false); // No warning if validation passes
            props.check(true);  // Call props.check with true if validation passes
        } else {
            setWarn(true);       // Show warning if validation fails
            props.check(false);  // Call props.check with false if validation fails
        }
    };

    // Trigger the verify function when props.trigger changes
    React.useEffect(() => {
        if (prevTriggerRef.current !== props.trigger) {
            verify(); // Call verify only if the trigger value changes
            prevTriggerRef.current = props.trigger; // Update the ref with the new trigger value
        }
    }, [props.trigger]);

    return (
        <div>
            <h6 color='red' style={{ margin: '0%', color: 'red', visibility: warn ? 'visible' : 'hidden' }}>User Supposed To Be 15+</h6>
            <DatePick  value={props.value} onChange={(value) => props.onChange(value)} />
        </div>
    )
}

export default Datepicker
