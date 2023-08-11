import { useState } from "react";
import axios from "axios";
import { Alert, Button, Input } from "@material-tailwind/react";
function App() {
  const [inputname, setInputname] = useState("");
  const [inputsocheck, setInputsocheck] = useState("");
  const [show, setShow] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [ketqua, setKetqua] = useState({});
  const handleCheck = () => {
    setHidden(true);
    if (inputname === "" || inputsocheck === "") {
      setShow(true);
      setTimeout(function () {
        setShow(false);
        setHidden(false);
      }, 2000);
    } else {
      let socheck = "";

      let date = new Date().toLocaleString();
      let comm = `${inputname} lv ${date}`;

      inputsocheck.slice(0, 1) === "0"
        ? (socheck = inputsocheck
            .slice(1, inputsocheck.length)
            .replace(/[^a-zA-Z0-9]/g, ""))
        : (socheck = inputsocheck.replace(/[^a-zA-Z0-9]/g, ""));
      axios
        .get(
          `https://script.google.com/macros/s/AKfycbzsmFiiYhxecPjoQNf6_K5uE2yTcNV7ZIBdAyiKofKQlHYwxvZ91PSdtlk9MuHVkWzN/exec?inputsocheck=${socheck}&inputname=${comm}`
        )
        .then((res) => {
          setKetqua(res.data);

          if (res.data.giaban === "") {
            axios.get(
              `https://api.telegram.org/bot6178275628:AAHZ2OkJgzL1mYPH-aGYLOe-PVG0-_O2VlA/sendMessage?chat_id=-976512408&text=Số đã bán - ${inputsocheck} - ${inputname}`
            );
          } else {
            if (res.data.status === "notfound") {
              axios.get(
                `https://api.telegram.org/bot6178275628:AAHZ2OkJgzL1mYPH-aGYLOe-PVG0-_O2VlA/sendMessage?chat_id=-976512408&text=Số không thuộc kho 4236 - ${inputsocheck} - ${inputname}`
              );
            } else {
              axios.get(
                `https://api.telegram.org/bot6178275628:AAHZ2OkJgzL1mYPH-aGYLOe-PVG0-_O2VlA/sendMessage?chat_id=-976512408&text=${inputsocheck} - ${inputname} - số còn`
              );
            }
          }
          setHidden(false);
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className=" p-8 ">
      <div className="header flex flex-col gap-6">
        <h1 className="text-primary mt-0 mb-2 text-center text-5xl font-medium leading-tight">
          CHECK SỐ KHO 4236
        </h1>
        <div>Hồ sơ mọi người xin chuẩn giúp e có cả video ạ</div>
        <Alert
          show
          color="red"
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          Viettel hiện tại k đăng ký được gián tiếp mọi người check sim nguyên kít thì có thể nhờ cod sim gốc khách tự đăng ký hoặc nhờ gdh đến đktt trực tiếp
        </Alert>
        <Alert
          show={show}
          color="red"
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          Hãy nhập đủ tên bạn và số cần check để check. Nếu đang có lỗi xảy ra
          báo Đoàn kiểm tra cho!
        </Alert>
        <Input
          color="blue"
          label="Bạn tên gì?"
          input={inputname}
          onChange={(e) => {
            setInputname(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleCheck();
            }
          }}
        />
        <Input
          color="blue"
          label="Số bạn muốn check kho 4236?"
          input={inputsocheck}
          onChange={(e) => {
            setInputsocheck(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleCheck();
            }
          }}
        />

        <Button disabled={hidden ? true : false} onClick={handleCheck}>
          Check
        </Button>
      </div>
      <div className="content flex flex-col gap-6 mt-8">
        <h3 className="text-center">Kết quả check số</h3>
        {ketqua.status === "notfound" ? (
          "Không tìm thấy số trong kho 4236. Cần hỗ trợ liên hệ Đoàn"
        ) : ketqua.giaban === "" ? (
          "Số đã bán"
        ) : !ketqua.hasOwnProperty("socham") ? (
          ""
        ) : (
          <table className="text-left  divide-y divide-blue-200">
            <tbody></tbody>
            <tr className="divide-x divide-blue-200">
              <th>Số chấm:</th>
              <td>{ketqua.socham}</td>
            </tr>
            <tr className="divide-x divide-blue-200">
              <th>Số gốc:</th>
              <td>{ketqua.chinso}</td>
            </tr>
            <tr className="divide-x divide-blue-200">
              <th>Tình trạng:</th>
              <td>{ketqua.tinhtrang}</td>
            </tr>
            <tr className="divide-x divide-blue-200">
              <th>Loại phôi 3G/4G:</th>
              <td>{ketqua.loaisim}</td>
            </tr>
            <tr className="divide-x divide-blue-200">
              <th>Cột:</th>
              <td>{ketqua.cot}</td>
            </tr>
            <tr className="divide-x divide-blue-200">
              <th>Comment:</th>
              <td>{ketqua.comment}</td>
            </tr>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
