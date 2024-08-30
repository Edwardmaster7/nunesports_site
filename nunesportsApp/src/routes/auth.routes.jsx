import { Routes, Route } from "react-router-dom";

import SignIn from "../src/pages/SignIn";
import SignUp from "../src/pages/SignUp";
import ForgotPassword from "../src/pages/ForgotPassword";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      {/* <Route path="*" element={<SignIn />} /> */}
    </Routes>
  );
}
