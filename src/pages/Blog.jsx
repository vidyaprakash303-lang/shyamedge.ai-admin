import React, { useEffect, useState } from "react";
import { axiosClient, API_BASE } from "../api/axiosClient";
import { toast } from "react-toastify";
import FileUploadField from "../components/FileUploadField";

export default function Blog(){
  const [items,setItems] = useState([]);
  const [form,setForm] = useState({ title:"", slug:"", excerpt:"", contentHtml:"", coverUrl:"", published:true });

  async function load(){ const {data}=await axiosClient.get("/blog"); setItems(data||[]); }
  useEffect(()=>{ load(); },[]);

  async function create(){
    try{
      await axiosClient.post("/blog", form);
      toast.success("Created");
      setForm({ title:"", slug:"", excerpt:"", contentHtml:"", coverUrl:"", published:true });
      load();
    }catch(e){
      toast.error(e?.response?.data?.message || "Create failed");
    }
  }
  async function del(id){ await axiosClient.delete(`/blog/${id}`); toast.success("Deleted"); load(); }

  return (
    <div className="page">
      <div className="card">
        <h2 style={{marginTop:0}}>Blog (CRUD)</h2>

        <div className="grid2">
          <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder="Title"/>
          <input value={form.slug} onChange={(e)=>setForm({...form,slug:e.target.value})} placeholder="Slug (unique)"/>
        </div>
        <textarea value={form.excerpt} onChange={(e)=>setForm({...form,excerpt:e.target.value})} placeholder="Excerpt"/>
        <textarea value={form.contentHtml} onChange={(e)=>setForm({...form,contentHtml:e.target.value})} placeholder="Content HTML (paste)"/>
        <label className="muted"><input type="checkbox" checked={form.published} onChange={(e)=>setForm({...form,published:e.target.checked})}/> Published</label>

        <FileUploadField
          label="Cover Upload"
          value={form.coverUrl}
          onChange={(url)=>setForm({...form, coverUrl: `${API_BASE}${url}`})}
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
                <b>{it.title}</b> <span className="pill">{it.published ? "Published" : "Draft"}</span>
                <div className="muted">{it.slug}</div>
              </div>
              <button className="btn" onClick={()=>del(it._id)}>Delete</button>
            </div>
            {it.coverUrl && <img src={it.coverUrl} alt="" style={{width:"100%",borderRadius:14, marginTop:10, border:"1px solid var(--stroke)"}}/>}
            <p className="muted">{it.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
