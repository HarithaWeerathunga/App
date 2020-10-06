import React from 'react'
import { Button } from 'semantic-ui-react'



const proceedToGoogleDrive = (e)=> {
    e.preventDefault();
    window.location.href = "http://localhost:5000";
}


const NormalButton = () => (


    <div>
        <Button primary onClick={e => {
            proceedToGoogleDrive(e)
        }}>Proceed</Button>

    </div>
)

export default NormalButton
