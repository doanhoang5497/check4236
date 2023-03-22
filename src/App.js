import { useState } from "react";
import ReactLoading from 'react-loading';
import axios from 'axios';
function App() {
  const [input, setInput] = useState('')
  const [inputten, setInputten] = useState('')
  const [hiden, setHiden] = useState(true)
  const [hident, setHident] = useState(true)
  const [ketqua, setKetqua] = useState({})
  const [vt, setVt] = useState(0)
  const handleClick = () => {
    setHiden(false)
    console.log('-----running-----');
    let send =''
    input.slice(0, 1) === '0' ? send = input.slice(1, input.length).replace(/[^a-zA-Z0-9]/g, "") : send = input.replace(/[^a-zA-Z0-9]/g, "");
    axios.get(`https://script.google.com/macros/s/AKfycbyxaSF6Dv5KNMqHIiKO9o5d6zIMGyELsChzXUVQ2WcCT50Vuc5RK7fdu2rcgFaX2OIO/exec?input=${send}`)
      .then(res => {
        setKetqua(res.data)
        setVt(res.data.vt)
        console.log(res.data);
        setHiden(true)
      })
      .catch(error => console.log(error));

  }
  const handleComment = () => {
    let date = new Date().toLocaleString()
    let comm = `${inputten} lv ${date}`
    axios.get(`https://script.google.com/macros/s/AKfycbwKzi3YxtNtjqDdG575ojghjgBb1JO5jQ98UeR19JMcTvwswjP0wMOt57YNaOorNU1q/exec?name=${comm}&vt=${vt}`)
      .then(res => {
        console.log(res.data);
        setHident(false)
        handleClick()
      })
      .catch(error => console.log(error));
  }
  return <div className=" p-8">
    <h1 className="mt-0 mb-2 text-5xl font-medium leading-tight text-primary text-center">CHECK SỐ KHO 4236</h1>
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
      className="mb-4 bg-green-500 w-full font-medium text-white px-4 py-3 rounded-lg shadow-lg hover:bg-green-400" 
      onClick={handleClick}
    >Check số </button>
    <div className="flex">
    <h1 className={hiden?"hiden":"mt-0 mr-2 text-2xl font-medium leading-tight text-primary text-center"}>Đang tìm  </h1>
    <ReactLoading className={hiden?"hiden":""} height={20} type={'bubbles'} color={'#333'}  />
    </div>
    <div className="mt-10 w-full">
      <h1 className="mt-0 mb-2 text-2xl font-medium leading-tight text-primary text-center">Kết quả check: {input}</h1>
      <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3 rounded-l-lg">
                      Số chấm
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Số gốc
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Giá bán
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Cột
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Tình trạng
                  </th>
                  <th scope="col" className="px-6 py-3">
                      4G/3G
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-r-lg">
                      Comment
                  </th>
              </tr>
          </thead>
          <tbody>
              { ketqua.giaban===null?"Không tồn tại":ketqua.giaban===""?"Đã bán": <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {ketqua.socham===""?"Không có":ketqua.socham}
                  </th>
                  <td className="px-6 py-4">
                  {ketqua.chinso===""?"Không có":ketqua.chinso}
                  </td>
                  <td className="px-6 py-4">
                  {ketqua.giaban===""?"Không có":ketqua.giaban}
                  </td>
                  <td className="px-6 py-4">
                  {ketqua.cot===""?"Không có":ketqua.cot}
                  </td>
                  <td className="px-6 py-4">
                  {ketqua.tinhtrang===""?"Không có":ketqua.tinhtrang}
                  </td>
                  <td className="px-6 py-4">
                  {ketqua.loaisim===""?"3G":ketqua.loaisim}
                  </td>
                  <td className="px-6 py-4">
                  {ketqua.comment===""?"Không có":ketqua.comment}
                  </td>
              </tr>               
              }
          </tbody>
      </table>
      </div>
      {ketqua.giaban == null ? "" : ketqua.giaban === "" ? "" :<div>
          <div className="border border-gray-400 rounded-lg flex mb-4 mt-16 shadow-lg ">
          <input
            className="flex-auto p-4 block rounded-lg font-medium outline-none border border-transparent focus:border-green-500 focus:text-green-500" 
            type="text"
            id="input"
            name="input"
            placeholder="Nhập tên bạn để comment lên file"
            onChange={e=>setInputten(e.target.value)}
            value={inputten}
          />
        </div>
        <button
          className="mb-4 bg-sky-500 w-full font-medium text-white px-4 py-3 rounded-lg shadow-lg hover:bg-green-400" 
          onClick={handleComment}
        >Comment</button>
<h1 className={hident?"hiden":"mt-0 mr-2 text-2xl font-medium leading-tight text-primary text-center"}>Comment thành công!   </h1>
        </div>
      }
    </div>
</div>;
}

export default App;
