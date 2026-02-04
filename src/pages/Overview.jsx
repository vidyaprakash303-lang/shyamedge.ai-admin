import React from "react";

export default function Overview(){
  return (
    <div className="page">
      <div className="card">
        <h2 style={{marginTop:0}}>Overview</h2>
        <p className="muted">Use the left menu to edit content, manage portfolio, testimonials, blog and collab.</p>
        <div className="grid2" style={{marginTop:12}}>
          <div className="card">
            <b>Content</b>
            <div className="muted">Hero texts & key values</div>
          </div>
          <div className="card">
            <b>Uploads</b>
            <div className="muted">Upload images via backend</div>
          </div>
        </div>
      </div>
    </div>
  );
}
