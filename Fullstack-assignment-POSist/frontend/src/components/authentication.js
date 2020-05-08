import React, { useState } from 'react';

const Login = () => {

    const [login, handleLogin] = useState(false);

    return(
        <div className="authentication">
            {login ? 
                <div className="login-page">
                    
                </div>
                :
                <div className="signup=page">
                
                </div>}

        </div>
    )
}

export default Login;