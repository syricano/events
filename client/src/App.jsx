import { BrowserRouter as Router, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import CreateEvent from "./pages/CreatEvent";
import NotFound from "./pages/NotFound";


const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/notfound" element={<NotFound />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/create-event" element={<CreateEvent />} />
      </Route>
    </Routes>
  );
};

export default App;
