import React, { useEffect, useState } from "react";
import { axiosClient, API_BASE } from "../api/axiosClient";
import { toast } from "react-toastify";
import FileUploadField from "../components/FileUploadField";

export default function Collab(){
  const [form,setForm] = useState({ headline:"", description:"", perks:[""], contactEmail:"", bannerUrl:"" });

  useEffect(()=>{
    (async()=>{
      const {data} = await axiosClient.get("/collab");
      if (data) setForm({
        headline: data.headline || "",
        description: data.description || "",
        perks: Array.isArray(data.perks) && data.perks.length ? data.perks : [""],
        contactEmail: data.contactEmail || "",
        bannerUrl: data.bannerUrl || ""
      });
    })();
  },[]);

  function setPerk(i, val){
    const next = [...form.perks];
    next[i]=val;
    setForm({...form, perks: next});
  }

  async function save(){
    try{
      await axiosClient.post("/collab", { ...form, perks: form.perks.filter(Boolean) });
      toast.success("Saved");
    }catch(e){
      toast.error(e?.response?.data?.message || "Save failed");
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h2 style={{marginTop:0}}>Collab Page</h2>

        <input value={form.headline} onChange={(e)=>setForm({...form,headline:e.target.value})} placeholder="Headline"/>
        <div style={{height:10}}/>
        <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} placeholder="Description"/>

        <div className="card" style={{marginTop:12}}>
          <b>Perks</b>
          {form.perks.map((p,i)=>(
            <div className="row" key={i} style={{marginTop:10}}>
              <input value={p} onChange={(e)=>setPerk(i,e.target.value)} placeholder={`Perk ${i+1}`} />
              <button className="btn" type="button" onClick={()=>setForm({...form, perks: form.perks.filter((_,idx)=>idx!==i)})}>Remove</button>
            </div>
          ))}
          <button className="btn" type="button" onClick={()=>setForm({...form, perks:[...form.perks,""]})} style={{marginTop:10}}>Add perk</button>
        </div>

        <div style={{height:10}}/>
        <input value={form.contactEmail} onChange={(e)=>setForm({...form,contactEmail:e.target.value})} placeholder="Contact email"/>

        <FileUploadField
          label="Banner Upload"
          value={form.bannerUrl}
          onChange={(url)=>setForm({...form, bannerUrl: `${API_BASE}${url}`})}
        />

        <div style={{marginTop:12}}>
          <button className="btn" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}
