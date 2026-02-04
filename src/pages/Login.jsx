import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient, API_BASE } from "../api/axiosClient";
import { setToken } from "../utils/auth";
import { toast } from "react-toastify";

export default function Login(){
  const nav = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  async function submit(e){
    e.preventDefault();
    try{
      setLoading(true);
      const { data } = await axiosClient.post("/auth/login", { email, password });
      if (!data?.token) throw new Error("No token");
      setToken(data.token);
      toast.success("Logged in");
      nav("/");
    }catch(err){
      toast.error(err?.response?.data?.message || "Login failed");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{minHeight:"100vh", display:"grid", placeItems:"center"}}>
      <div className="card" style={{width:"min(520px, 92vw)"}}>
        <h2 style={{marginTop:0}}>Admin Login</h2>
        <p className="muted">Use email + password. Social buttons redirect to backend OAuth endpoints.</p>

        <form onSubmit={submit} className="row" style={{flexDirection:"column", alignItems:"stretch", gap:10}}>
          <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <button className="btn" type="submit" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
        </form>

        <div style={{textAlign:"center", margin:"14px 0"}} className="muted">or continue with</div>
        <div className="grid2">
          <a className="btn" href={`${API_BASE}/api/auth/google`}>Google</a>
          <a className="btn" href={`${API_BASE}/api/auth/facebook`}>Facebook</a>
        </div>
        <div style={{marginTop:10}}>
          <a className="btn" style={{display:"block", textAlign:"center"}} href={`${API_BASE}/api/auth/apple`}>Apple</a>
        </div>

        <div className="muted" style={{fontSize:12, marginTop:14}}>
          Backend should run at <b>{API_BASE}</b>. Set <code>VITE_API_BASE</code> in <code>.env</code>.
        </div>
      </div>
    </div>
  );
}
