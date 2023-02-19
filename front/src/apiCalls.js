import axios from "axios";

export const loginCall = async (email,password,dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", {email:email,password:password});
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const login = async (email,password) => {
  // console.log(data)
  try{
    const res = await axios.post("/auth/login",{email:email,password:password});
    return res.data
  }catch(err){
    console.log(err);
    return "wrong password"
  }
  
}