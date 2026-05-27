import { useState } from "react"
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const {signUp, login} = useAuth();
    
    const {register, handleSubmit, formState:{errors}} = useForm();

    function onSubmit(data) {
        let result;
        if (isSignUp){
            result = signUp(data.email, data.password);
        } else {
            result = login(data.email, data.password);
        }  

        if (result.success){            
            setError(null);
            navigate("/");
        } else {
            setError(result.error);
        }
    }
    return <div className="page">
        <div className="container">
            <div className="auth-container">
                <h1 className="page-title">
                    {isSignUp ? "Sign Up" : "Login"}
                </h1>
                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input 
                            className="form-input"
                            type="email"
                            id="email"
                            {...register('email', {required:"Email is required"})}
                        />
                        {errors.email && (<span className="form-error">{errors.email.message}</span>)}
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            className="form-input"
                            type="password"
                            id="password"
                            {...register('password', {
                                required:"Password is required",
                                minLength: {
                                    value:6,
                                    message:"Password must be at least 6 characters"
                                },
                                maxLength: {
                                    value:12,
                                    message:"Password must be less than 12 characters"
                                }
                            })}
                        />
                        {errors.password && (<span className="form-error">{errors.password.message}</span>)}
                    </div>
                    <button type="submit" className="btn btn-primary btn-large">
                        {isSignUp ? "Sign Up" : "Login"}
                    </button>
                </form>

                <div className="auth-switch">
                    {
                        isSignUp ? (
                            <p>Already have an account? <span className="auth-link" onClick={() => setIsSignUp(false)}>Login</span></p>
                        ) : (
                            <p>Don't have an account? <span className="auth-link" onClick={() => setIsSignUp(true)}>Sign Up</span></p>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
}

