import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { clearToken } from "../utils/auth";
import { toggleTheme } from "../utils/theme";

export default function Layout({ children }){
  const nav = useNavigate();
  return (
    <>
      <div className="topbar">
        <div className="container topbarInner">
          <div>
            <div style={{fontWeight:800}}>Shyamedge Admin</div>
            <div className="muted" style={{fontSize:12}}>Dashboard • Content Control</div>
          </div>
          <div className="row">
            <button className="btn" onClick={()=>toggleTheme()}>Theme</button>
            <button className="btn" onClick={()=>{ clearToken(); nav("/login"); }}>Logout</button>
          </div>
        </div>
      </div>

      <div className="container sidebarWrap">
        <aside className="sidebar card">
          <NavLink className={({isActive})=>"navItem"+(isActive?" active":"")} to="/">Overview</NavLink>
          <NavLink className={({isActive})=>"navItem"+(isActive?" active":"")} to="/content">Content</NavLink>
          <NavLink className={({isActive})=>"navItem"+(isActive?" active":"")} to="/portfolio">Portfolio</NavLink>
          <NavLink className={({isActive})=>"navItem"+(isActive?" active":"")} to="/testimonials">Testimonials</NavLink>
          <NavLink className={({isActive})=>"navItem"+(isActive?" active":"")} to="/blog">Blog</NavLink>
          <NavLink className={({isActive})=>"navItem"+(isActive?" active":"")} to="/collab">Collab</NavLink>
        </aside>

        <main>{children}</main>
      </div>
    </>
  );
}
