import React, { useState, useEffect } from "react";
// 내부 컴포넌트 분류---------------------------------------
import Consumption from "../Compornents/CarbonFootprints/Consumption";
import Result from "../Compornents/CarbonFootprints/Result";
import Practice from "../Compornents/CarbonFootprints/Practice";
// ---------------------------------------------------------

function CarbonFootprint() {
  // const userId = 104716; //개발용 user_id
  const userId = sessionStorage.getItem("userId");

  const currentDate = new Date().toISOString().slice(0, 10); // 현재 날짜를 'YYYY-MM-DD' 형식으로

  const [activeTab, setActiveTab] = useState("consumption"); // 탭 핸들링
  const [userData, setUserData] = useState(null);
  const [newResultData, setNewResultData] = useState(null);
  const [initialData, setInitialData] = useState(null); // 초기 데이터 상태 추가

  const [consumptionData, setConsumptionData] = useState({
    electricity: "",
    gas: "",
    water: "",
    transportation: "",
    radioOption: "0",
    waste: "",
    kg: "",
    l: "",
  });
<<<<<<< HEAD
  
  console.log("세션:",sessionStorage)
  // 계산 결과
  const [resultData, setResultData] = useState(null);
=======
>>>>>>> 86046dff2ff34caa666c7ed26a25c0d6e0da42cd

  const [resultData, setResultData] = useState("");

  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  // 사용자의 이번 달 데이터 존재 여부를 확인하고, 결과에 따라 탭을 설정
  useEffect(() => {
    const checkData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/carbonFootprint/check/${userId}/${currentDate}`);
        const data = await response.json();
        if (data.hasData) {
          setNewResultData(data.data);
          setActiveTab("result");
          console.log(data.data);
        } else {
          fetchInitialData();
          setActiveTab("consumption");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchInitialData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/carbonFootprint`);
        const data = await response.json();
        setInitialData(data); // 초기 데이터 상태 업데이트
        // console.log(data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    checkData();
    fetchInitialData();
  }, [userId, currentDate]);

  const handleTabChange = (tabName) => {
    // "결과보기" 또는 "생활속 실천방안" 탭으로 이동하려고 할 때
    if (tabName === "result" || tabName === "practice") {
      // 서버로부터 넘어온 userData가 있거나, 사용자가 데이터를 제출한 경우 (resultData가 존재)에만 탭 전환 허용
      if (!userData && !newResultData) {
        alert("제출하기 완료하신 후에 결과확인하실 수 있습니다.");
        return; // userData도 없고 resultData도 없으면 여기서 함수 종료
      }
    }

    // 위의 조건을 만족하지 않으면 탭 변경
    setActiveTab(tabName);
  };

  const handleResultSubmit = (newResultData, inputData) => {
    // 사용자가 데이터를 제출하면, 이를 userData에 반영하여 바로 "결과보기" 탭에서 사용할 수 있도록 합니다.
    // 이는 서버로부터 받은 userData가 있더라도, 사용자의 최신 제출을 반영하는 것을 우선합니다.
    setUserData({
      ...userData,
      ...newResultData,
    });
    setConsumptionData(inputData);
    setActiveTab("result");
  };

  const renderContent = () => {
    if (!initialData) {
      // 데이터가 로딩 중이거나 로딩에 실패했을 때 보여줄 UI
      return <div>Loading...</div>;
    }
    switch (activeTab) {
      case "consumption":
        return (
          <Consumption
            inputData={consumptionData}
            initialData={initialData.carbonFootprintData}
            onResultSubmit={handleResultSubmit}
          />
        );
      case "result":
        // 서버의 userData가 있으면 그 값을, 없으면 로컬의 resultData를 사용
        const dataToShow = userData || newResultData;
        return <Result initialData={initialData.calculationAdviceData} resultData={dataToShow} userId={userId} />;
      case "practice":
        return <Practice />;
      default:
        return (
          <Consumption
            inputData={consumptionData}
            initialData={initialData.carbonFootprintData}
            onResultSubmit={handleResultSubmit}
          />
        );
    }
  };

  return (
    <div>
      <ul>
        {!newResultData && <li onClick={() => handleTabChange("consumption")}>계산하기</li>}
        <li onClick={() => handleTabChange("result")}>결과보기</li>
        <li onClick={() => handleTabChange("practice")}>생활속 실천방안</li>
      </ul>

      <div>{renderContent()}</div>
    </div>
  );
}

export default CarbonFootprint;
