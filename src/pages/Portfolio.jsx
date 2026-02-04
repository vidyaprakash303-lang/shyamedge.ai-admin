import React, { useEffect, useState } from "react";
import { axiosClient, API_BASE } from "../api/axiosClient";
import { toast } from "react-toastify";
import FileUploadField from "../components/FileUploadField";

export default function Portfolio(){
  const [items,setItems] = useState([]);
  const [form,setForm] = useState({ title:"", category:"", description:"", mediaType:"image", mediaUrl:"" });

  async function load(){
    const {data} = await axiosClient.get("/portfolio");
    setItems(data || []);
  }
  useEffect(()=>{ load(); },[]);

  async function create(){
    try{
      await axiosClient.post("/portfolio", form);
      toast.success("Created");
      setForm({ title:"", category:"", description:"", mediaType:"image", mediaUrl:"" });
      load();
    }catch(e){
      toast.error(e?.response?.data?.message || "Create failed");
    }
  }
  async function del(id){
    await axiosClient.delete(`/portfolio/${id}`);
    toast.success("Deleted");
    load();
  }

  return (
    <div className="page">
      <div className="card">
        <h2 style={{marginTop:0}}>Portfolio (CRUD)</h2>

        <div className="grid2">
          <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder="Title"/>
          <input value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} placeholder="Category"/>
        </div>
        <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} placeholder="Description"/>

        <div className="grid2">
          <select value={form.mediaType} onChange={(e)=>setForm({...form,mediaType:e.target.value})} style={{padding:12,borderRadius:12, border:"1px solid var(--stroke)", background:"transparent", color:"var(--text)"}}>
            <option value="image">image</option>
            <option value="video">video</option>
          </select>

          <input value={form.mediaUrl} onChange={(e)=>setForm({...form,mediaUrl:e.target.value})} placeholder="Media URL (optional)"/>
        </div>

        <FileUploadField
          label="Upload Media (image/video)"
          value={form.mediaUrl}
          onChange={(url)=>setForm({...form, mediaUrl: `${API_BASE}${url}`})}
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
                <b>{it.title || "Untitled"}</b> <span className="pill">{it.category || "—"}</span>
                <div className="muted">{it.mediaType}</div>
              </div>
              <button className="btn" onClick={()=>del(it._id)}>Delete</button>
            </div>
            {it.mediaUrl && it.mediaType === "image" && (
              <img src={it.mediaUrl} alt="" style={{width:"100%",borderRadius:14,marginTop:10,border:"1px solid var(--stroke)"}}/>
            )}
            {it.mediaUrl && it.mediaType === "video" && (
              <video src={it.mediaUrl} controls style={{width:"100%",borderRadius:14,marginTop:10,border:"1px solid var(--stroke)"}}/>
            )}
            <p className="muted">{it.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
