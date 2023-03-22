import { useState } from "react";
import axios from 'axios';
function App() {
  const [input, setInput] = useState('')
  const [ketqua,setKetqua] = useState({})
  const handleClick = () => {
    axios.get(`https://script.google.com/macros/s/AKfycbwlmk1Hvl6aDuP0K2fLBbWuI6gRT58AKJRvjXnBtFYfAJRFxRKkQvaHJVmKpcyLnJg/exec?input=${input}`)
      .then(res => {
        setKetqua(res.data)
        console.log(ketqua);
      })
      .catch(error => console.log(error));

  }
  return <div className="w-1/2 p-28">
    <h1 className="mt-0 mb-2 text-5xl font-medium leading-tight text-primary text-center">
CHECK SỐ KHO 4236
</h1>
    <div className="border border-gray-400 rounded-lg flex mb-4 shadow-lg ">
      <input
        className="flex-auto p-4 block rounded-lg font-medium outline-none border border-transparent focus:border-green-500 focus:text-green-500" 
        type="text"
        id="input"
        name="input"
        placeholder="Nhập số cần check..."
        onChange={e=>setInput(e.target.value)}
        value={input}
      />
    </div>
    <button
      className="bg-green-500 w-full font-medium text-white px-4 py-3 rounded-lg shadow-lg hover:bg-green-400" 
      onClick={handleClick}
    >Check số</button>
    <div className="mt-10">
      <h1 className="mt-0 mb-2 text-2xl font-medium leading-tight text-primary text-center">Kết quả</h1>
      <div className="container"></div>
    </div>
  </div>;
}

export default App;
