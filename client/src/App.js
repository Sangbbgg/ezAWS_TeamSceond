// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Compornents/Main";
import Header from "./Compornents/Header";
import Footer from "./Compornents/Footer";
import CarbonFootprint from "./view/CarbonFootprint";
// 김민호(임시)-----------------
import LoginPage from "./Compornents/Logins/Login";
import Modify from "./Compornents/Logins/Modify";
import Regester from "./Compornents/Logins/Regester";
import RegesterPersonal from "./Compornents/Logins/RegesterPersonal";
import RegesterGroup from "./Compornents/Logins/RegisterGroup";
import RegesterCorporate from "./Compornents/Logins/RegisterCorporate";
// ---------------------------
// 이기현(임시) ------------------
import Cart from "./view/Cart"; // 이기현_장바구니 컴포넌트
import Ordersheet from "./view/Ordersheet"; // 이기현_오더시트 컴포넌트
import Shop from "./view/Shop"; // 이기현_오더시트 컴포넌트(테스트용)
//-------------------------

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* <Route exact path="/" element={<Main />}/>
          라우팅 View Page작성 구역*/}
          {/* Main Page */}
          <Route exact path="/" element={<Main />} />
          {/* 곽별이 */}
          {/* 김민규 */}
          {/* 김연진 */}
          {/* 김지수 */}
          {/* 상호형 */}
          <Route exact path="/carbonFootprint" element={<CarbonFootprint />} />
          {/* 이기현 */}
          <Route path="/cart" element={<Cart />} />
          {/* "/" 로컬 장바구니 페이지 라우팅 */}
          <Route path="/ordersheet" element={<Ordersheet />} />
          {/* "/" 주문서 작성 페이지 라우팅 */}
          {/* 이주호 */}
          {/* 김민호 */}
          <Route path="/Login" element={<LoginPage />}></Route>
          <Route path="/Modify" element={<Modify/>}></Route>
          <Route path="/Regester" element={<Regester />}></Route>
          <Route path="/Regester/personal" element={<RegesterPersonal/>}></Route>
          <Route path="/Regester/corporate" element={<RegesterCorporate/>}></Route>
          <Route path="/Regester/group" element={<RegesterGroup/>}></Route>
          {/* 전윤호 */}
          <Route path="/shop" element={<Shop />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
