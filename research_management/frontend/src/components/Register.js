import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/Register.css';
import DEFAULT_BACKEND_URL from '../config.js'

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [degree, setDegree] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(''); 
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post(`${DEFAULT_BACKEND_URL}/api/register/`, {
        username: username,
        password: password,
        // first_name: firstName,
        // last_name: lastName,
        // birth_date: birthDate,
        // gender: gender,
        // degree: degree,
        // phone: phone,
        // email: email,  
        // address: address
      });
      setMessage('Đăng ký thành công');
    } catch (error) {
      setMessage('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Đăng ký tài khoản</h2>
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <div className="row">
          <div className="col-md-6">
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Họ"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Tên"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <input
          className="form-control mb-3"
          type="date"
          placeholder="Ngày sinh"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <select
          className="form-control mb-3"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Chọn Giới tính</option>
          <option value="M">Nam</option>
          <option value="F">Nữ</option>
        </select>
        <select
          className="form-control mb-3"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        >
          <option value="">Chọn Học vị/ Học hàm</option>
          <option value="M">Cử nhân, kỹ sư</option>
          <option value="M">Thạc sĩ</option>
          <option value="F">Tiến sĩ</option>
          <option value="O">Phó giáo sư</option>
          <option value="O">Giáo sư</option>
        </select>
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"  // Sử dụng input email
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />        
        <textarea
          className="form-control mb-3"
          placeholder="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        /> */}
        <button
          className="btn btn-primary btn-block"
          onClick={handleRegister}
        >
          Đăng ký
        </button>
        {message && <p className="message mt-3">{message}</p>}
      </div>
    </div>
  );
}

export default Register;
