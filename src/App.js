import { useState } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
function App() {
  const [input, setInput] = useState('');
  const [inputten, setInputten] = useState('');
  const [hiden, setHiden] = useState(true);
  const [hident, setHident] = useState(true);
  const [ketqua, setKetqua] = useState({});
  const [vt, setVt] = useState(0);
  const handleClick = () => {
    setHiden(false);
    console.log('-----running-----');
    let send = '';
    input.slice(0, 1) === '0'
      ? (send = input.slice(1, input.length).replace(/[^a-zA-Z0-9]/g, ''))
      : (send = input.replace(/[^a-zA-Z0-9]/g, ''));
    axios
      .get(
        `https://script.google.com/macros/s/AKfycbysZNsUe2xUsVXmBxP6wQ_J52Gbw_PhNRbYZkEcdhaWIyelbuqtqV1KO1ypbtOm-zvK/exec?input=${send}`,
      )
      .then((res) => {
        setKetqua(res.data);
        setVt(res.data.vt);
        console.log(res.data);
        setHiden(true);
      })
      .catch((error) => console.log(error));
  };
  const handleComment = () => {
    let date = new Date().toLocaleString();
    let comm = `${inputten} lv ${date}`;
    axios
      .get(
        `https://script.google.com/macros/s/AKfycbysZNsUe2xUsVXmBxP6wQ_J52Gbw_PhNRbYZkEcdhaWIyelbuqtqV1KO1ypbtOm-zvK/exec?name=${comm}&vt=${vt}`,
      )
      .then((res) => {
        console.log(res.data);
        setHident(false);
        handleClick();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className=" p-8">
      <h1 className="text-primary mt-0 mb-2 text-center text-5xl font-medium leading-tight">
        CHECK SỐ KHO 4236
      </h1>
      <div className="mb-4 flex rounded-lg border border-gray-400 shadow-lg ">
        <input
          className="block flex-auto rounded-lg border border-transparent p-4 font-medium outline-none focus:border-green-500 focus:text-green-500"
          type="text"
          id="input"
          name="input"
          placeholder="Nhập số cần check..."
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={e=>{if(e.key === 'Enter'){ handleClick() }}}
          value={input}
        />
      </div>
      <button
        className="mb-4 w-full rounded-lg bg-green-500 px-4 py-3 font-medium text-white shadow-lg hover:bg-green-400"
        onClick={handleClick}>
        Check số{' '}
      </button>
      <div className="flex">
        <h1
          className={
            hiden
              ? 'hiden'
              : 'text-primary mt-0 mr-2 text-center text-2xl font-medium leading-tight'
          }>
          Đang tìm{' '}
        </h1>
        <ReactLoading
          className={hiden ? 'hiden' : ''}
          height={20}
          type={'bubbles'}
          color={'#333'}
        />
      </div>
      <div className="mt-10 w-full">
        <h1 className="text-primary mt-0 mb-2 text-center text-2xl font-medium leading-tight">
          Kết quả check: {input}
        </h1>
        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="rounded-l-lg px-6 py-3">
                  Số chấm
                </th>
                <th scope="col" className="px-6 py-3">
                  Số gốc
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Giá bán
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Cột
                </th>
                <th scope="col" className="px-6 py-3">
                  Tình trạng
                </th>
                <th scope="col" className="px-6 py-3">
                  4G/3G
                </th>
                <th scope="col" className="rounded-r-lg px-6 py-3">
                  Comment
                </th>
              </tr>
            </thead>
            <tbody>
              {ketqua.giaban === null ? (
                'Không tồn tại'
              ) : ketqua.giaban === '' ? (
                'Đã bán'
              ) : (
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {ketqua.socham === '' ? 'Không có' : ketqua.socham}
                  </th>
                  <td className="px-6 py-4">
                    {ketqua.chinso === '' ? 'Không có' : ketqua.chinso}
                  </td>
                  {/* <td className="px-6 py-4">
                    {ketqua.giaban === '' ? 'Không có' : ketqua.giaban}
                  </td> */}
                  <td className="px-6 py-4">
                    {ketqua.cot === '' ? 'Không có' : ketqua.cot}
                  </td>
                  <td className="px-6 py-4">
                    {ketqua.tinhtrang === '' ? 'Không có' : ketqua.tinhtrang}
                  </td>
                  <td className="px-6 py-4">
                    {ketqua.loaisim === '' ? '' : ketqua.loaisim}
                  </td>
                  <td className="px-6 py-4">
                    {ketqua.comment === '' ? 'Không có' : ketqua.comment}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {ketqua.giaban == null ? (
          ''
        ) : ketqua.giaban === '' ? (
          ''
        ) : (
          <div>
            <div className="mb-4 mt-16 flex rounded-lg border border-gray-400 shadow-lg ">
              <input
                className="block flex-auto rounded-lg border border-transparent p-4 font-medium outline-none focus:border-green-500 focus:text-green-500"
                type="text"
                id="input"
                name="input"
                placeholder="Nhập tên bạn để comment lên file"
                    onChange={(e) => setInputten(e.target.value)}
                    onKeyPress={e=>{if(e.key === 'Enter'){ handleComment() }}}
                value={inputten}
                
              />
            </div>
            <button
              className="mb-4 w-full rounded-lg bg-sky-500 px-4 py-3 font-medium text-white shadow-lg hover:bg-green-400"
              onClick={handleComment}>
              Comment
            </button>
            <h1
              className={
                hident
                  ? 'hiden'
                  : 'text-primary mt-0 mr-2 text-center text-2xl font-medium leading-tight'
              }>
              Comment thành công!{' '}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
