import React, { useEffect, useState } from "react";
import { axiosClient } from "../api/axiosClient";
import { toast } from "react-toastify";

const KEYS = [
  { key: "home.hero.line1", label: "Home Hero Line 1" },
  { key: "home.hero.line2", label: "Home Hero Line 2" },
];

export default function ContentEditor(){
  const [data,setData] = useState({});
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    (async()=>{
      try{
        const res = await axiosClient.get("/content");
        setData(res.data || {});
      }finally{
        setLoading(false);
      }
    })();
  },[]);

  async function save(key){
    try{
      await axiosClient.post("/content", { key, value: data[key] || "" });
      toast.success("Saved");
    }catch(e){
      toast.error(e?.response?.data?.message || "Save failed");
    }
  }

  if (loading) return <div className="page"><div className="card">Loading...</div></div>;

  return (
    <div className="page">
      <div className="card">
        <h2 style={{marginTop:0}}>Content Editor</h2>
        <p className="muted">Edit homepage hero lines and key text values.</p>

        {KEYS.map(k=>(
          <div key={k.key} className="card" style={{marginTop:12}}>
            <div style={{fontWeight:800, marginBottom:8}}>{k.label}</div>
            <input
              value={data[k.key] || ""}
              onChange={(e)=>setData({...data, [k.key]: e.target.value})}
              placeholder={k.key}
            />
            <div style={{marginTop:10}}>
              <button className="btn" onClick={()=>save(k.key)}>Save</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
