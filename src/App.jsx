import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Overview from "./pages/Overview";
import Login from "./pages/Login";
import ContentEditor from "./pages/ContentEditor";
import Portfolio from "./pages/Portfolio";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";
import Collab from "./pages/Collab";

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={
        <ProtectedRoute>
          <Layout><Overview/></Layout>
        </ProtectedRoute>
      }/>

      <Route path="/content" element={
        <ProtectedRoute>
          <Layout><ContentEditor/></Layout>
        </ProtectedRoute>
      }/>

      <Route path="/portfolio" element={
        <ProtectedRoute>
          <Layout><Portfolio/></Layout>
        </ProtectedRoute>
      }/>

      <Route path="/testimonials" element={
        <ProtectedRoute>
          <Layout><Testimonials/></Layout>
        </ProtectedRoute>
      }/>

      <Route path="/blog" element={
        <ProtectedRoute>
          <Layout><Blog/></Layout>
        </ProtectedRoute>
      }/>

      <Route path="/collab" element={
        <ProtectedRoute>
          <Layout><Collab/></Layout>
        </ProtectedRoute>
      }/>

      <Route path="*" element={<Login/>} />
    </Routes>
  );
}
