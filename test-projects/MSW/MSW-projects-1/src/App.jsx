import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:5173/api/users")
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUsers(data)
      })
  }, [])
  return <div> 
    {users.map((user) => (
      <div key={user.id}>{user.name}</div>
    ))}
  </div>;
}

export default App
