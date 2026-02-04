import React, { useEffect, useState } from "react";
import { axiosClient, API_BASE } from "../api/axiosClient";
import { toast } from "react-toastify";
import FileUploadField from "../components/FileUploadField";

export default function Testimonials(){
  const [items,setItems] = useState([]);
  const [form,setForm] = useState({ name:"", role:"", message:"", avatarUrl:"", rating:5 });

  async function load(){ const {data}=await axiosClient.get("/testimonials"); setItems(data||[]); }
  useEffect(()=>{ load(); },[]);

  async function create(){
    try{
      await axiosClient.post("/testimonials", form);
      toast.success("Created");
      setForm({ name:"", role:"", message:"", avatarUrl:"", rating:5 });
      load();
    }catch(e){
      toast.error(e?.response?.data?.message || "Create failed");
    }
  }
  async function del(id){ await axiosClient.delete(`/testimonials/${id}`); toast.success("Deleted"); load(); }

  return (
    <div className="page">
      <div className="card">
        <h2 style={{marginTop:0}}>Testimonials (CRUD)</h2>

        <div className="grid2">
          <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Name"/>
          <input value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})} placeholder="Role / Company"/>
        </div>
        <textarea value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} placeholder="Message"/>
        <input type="number" min="1" max="5" value={form.rating} onChange={(e)=>setForm({...form,rating:Number(e.target.value)})} />

        <FileUploadField
          label="Avatar Upload"
          value={form.avatarUrl}
          onChange={(url)=>setForm({...form, avatarUrl: `${API_BASE}${url}`})}
        />

        <div style={{marginTop:12}}>
          <button className="btn" onClick={create}>Create</button>
        </div>
      </div>

      <div className="list">
        {items.map(it=>(
          <div className="card" key={it._id}>
            <div className="rowBetween">
              <div>
                <b>{it.name}</b> <span className="pill">{it.rating}★</span>
                <div className="muted">{it.role}</div>
              </div>
              <button className="btn" onClick={()=>del(it._id)}>Delete</button>
            </div>
            {it.avatarUrl && <img src={it.avatarUrl} alt="" style={{width:"100%",borderRadius:14, marginTop:10, border:"1px solid var(--stroke)"}}/>}
            <p className="muted">{it.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
