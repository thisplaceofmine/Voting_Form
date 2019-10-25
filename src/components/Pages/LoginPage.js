import React, { useState } from 'react';

const LoginPage = () => {
    const [loginInfo, setLoginInfo] = useState(["", ""])


    const updateField = e => {
        
        let temp = [...loginInfo]
     
        console.log(temp)

        setLoginInfo(temp)
        
    }

    const TEMPButton =()=>{
        console.log(loginInfo)
    }

    const onSubmithandler = e => {
        e.preventDefault();

    }
    

    return (
        <div className="ui middle aligned center aligned grid">
            <div className="column" >
                <h2 className="ui teal header">Login to your account</h2>
                <form className="ui large form" onSubmit={onSubmithandler}>
                    <div className="ui stacked segment">
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon" />
                                <input
                                    type="text"
                                    id="0"
                                    placeholder="E-mail address"
                                    value={loginInfo[0]}
                                    onChange={updateField}

                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon" />
                                <input
                                    type="password"
                                    id="1"
                                    placeholder="Password"
                                    value={loginInfo[1]}
                                    onChange={updateField}
                                />
                            </div>
                        </div>
                        <div className="ui fluid large teal submit button">Login</div>
                    </div>
                    <button className="ui primary button"
                        type="button"
                        onClick={TEMPButton}
                    >Run me</button>
                    <div className="ui error message"></div>

                </form>
            </div>
        </div>
    );
}

export default LoginPage;