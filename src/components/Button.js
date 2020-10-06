import React from 'react'
import { Button } from 'semantic-ui-react'


//method to proceed to the backend
const proceedToGoogleDrive = (e)=> {
    e.preventDefault();
    window.location.href = "http://localhost:5000";
}

//initialize the button
const NormalButton = () => (


    <div>
        <Button primary onClick={e => {
            proceedToGoogleDrive(e)
        }}>Proceed</Button>

    </div>
)

export default NormalButton
