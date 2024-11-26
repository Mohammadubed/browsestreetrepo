import React, { useState, useEffect, useRef } from 'react'
import PasswordInterface from './ComponentInterface/PasswordInterface'

function Password(props) {
    const [warn, setWarn] = useState(false)
    const prevTriggerRef = useRef(props.trigger);

    const verifyPassword = (password) => {

        const passwordRegex = /^.{8,}$/;
        return passwordRegex.test(password);
    };

    const verifyReenteredPassword = (password, reenteredPassword) => {

        return password === reenteredPassword;
    };

    const verify = () => {
        if (props.password == null) {
            if (verifyPassword(props.value)) {

                setWarn(false)
                props.check(true)
            } else {
                setWarn(true)
                props.check(false)
            }
        } else {
            if (verifyReenteredPassword(props.password,props.value)) {

                setWarn(false)
                props.check(true)
            } else {
                setWarn(true)
                props.check(false)
            }
        }
    }
    useEffect(() => {

        if (prevTriggerRef.current !== props.trigger) {
            verify(); // Call verify only if the trigger value changes
            prevTriggerRef.current = props.trigger; // Update the ref with the new trigger value
        }
    }, [props.trigger]);

    return (
        <div>
            <h6 color='red' style={{ margin: '0%', color: 'red', visibility: warn ? 'visible' : 'hidden' }}>{props.massage}</h6>
            <PasswordInterface value={props.value} style={{ marginTop: '2%' }} setvalue={(value) => { props.onChange(value); }} />
        </div>
    )
}
export default Password
