import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useNavigate } from "react-router-dom";

function ensureLoggedIn(Component) {
  return function EnsureLoggedIn(props) {
    const navigate = useNavigate();
    const [content, setContent] = useState(null);

    useEffect(async () => {
      // if (res.ok) {
      //   navigate("/");
      //   return;
      // }
      // setContent(<Component {...props} />);
    }, []);

    return content;
  };
}

export default ensureLoggedIn;
