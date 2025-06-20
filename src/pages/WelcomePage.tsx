import { useState, useEffect } from "react";


const WelcomePage = () => {
  const [username, setUsername] = useState<string | null>(null);
 
    
   useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    
    if (storedUsername) {
      setUsername(storedUsername);
    }
    document.title="Parvathy Hospital | Welcome Page"
    
  }, []);

  return (
    <>
      <div className="mt-24">
        <h1>Welcome, {username}</h1>
        
      </div>
    </>
  );
};

export default WelcomePage;
