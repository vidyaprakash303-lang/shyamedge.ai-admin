import React, { useRef, useState } from "react";
import { axiosClient } from "../api/axiosClient";
import { toast } from "react-toastify";

/**
 * Expects backend: POST /api/upload (multipart/form-data) -> { url: "/uploads/xxx.jpg" }
 */
export default function FileUploadField({ label="Upload", value, onChange }){
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  async function upload(file){
    try{
      setLoading(true);
      const fd = new FormData();
      fd.append("file", file);

      const { data } = await axiosClient.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (!data?.url) throw new Error("Upload failed");
      onChange?.(data.url);
      toast.success("Uploaded");
    }catch(e){
      toast.error(e?.response?.data?.message || e.message || "Upload failed");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{marginTop:12}}>
      <div className="rowBetween">
        <b>{label}</b>
        <button className="btn" type="button" onClick={()=>inputRef.current?.click()} disabled={loading}>
          {loading ? "Uploading..." : "Choose file"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        style={{display:"none"}}
        onChange={(e)=>{ const f = e.target.files?.[0]; if (f) upload(f); }}
      />

      {value ? (
        <div style={{marginTop:10}}>
          <div className="muted" style={{fontSize:12, marginBottom:8}}>Preview</div>
          <img src={value} alt="preview" style={{width:"100%", maxHeight:260, objectFit:"cover", borderRadius:14, border:"1px solid var(--stroke)"}}/>
        </div>
      ) : (
        <div className="muted" style={{fontSize:12, marginTop:10}}>No file selected.</div>
      )}
    </div>
  );
}
