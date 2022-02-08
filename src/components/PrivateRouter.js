import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRouter = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return null;
    }

    setContent(children);
  }, [user]);

  return content;
};

export default PrivateRouter;
