import { useEffect } from "react";

const LogoSlider = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://tulospalvelu.leijonat.fi/serie/helpers/getStatGroup.php",
          {
            method: "POST",
            body: JSON.stringify({
              season: 2025,
              stgid: 9535,
            }),
          }
        ); // Fetch from your API route
        const result = await res.json();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return <div>LogoSlider</div>;
};

export default LogoSlider;
