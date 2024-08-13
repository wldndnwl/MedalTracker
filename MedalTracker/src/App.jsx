import React, { useState } from "react";
import "./App.css";

function App() {
  // 목록 저장
  const [countries, setCountries] = useState([]);
  // 국가 이름 저장
  const [name, setName] = useState("");
  // 메달 수 저장
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [bronze, setBronze] = useState("");

  // 국가 추가 함수
  function handleAdd() {
    // 만약 다 입력 되지 않는 다면 종료
    if (!name || !gold || !silver || !bronze) return;
    // 같은 국가가 있는 찾음 | 소문자 변환
    const existingCountry = countries.find(function (country) {
      return country.name.toLowerCase() === name.toLowerCase();
    });
    // 같은 이름의 국가가 있다면 경고창 띄움.
    if (existingCountry) {
      alert("이미 있는 국가");
      return;
    }

    // newCountry 객체
    const newCountry = {
      name: name,
      gold: parseInt(gold),
      silver: parseInt(silver),
      bronze: parseInt(bronze),
    };
    //
    setCountries(function (prevCountries) {
      return [...prevCountries, newCountry];
    });
    // 초기화
    setName("");
    setGold("");
    setSilver("");
    setBronze("");
  }

  // 국가 업데이트 함수
  function handleUpdate() {
    if (!name || !gold || !silver || !bronze) return;

    const existingCountry = countries.find(function (country) {
      return country.name.toLowerCase() === name.toLowerCase();
    });

    if (!existingCountry) {
      alert("없는 국가");
      return;
    }

    setCountries(function (prevCountries) {
      return prevCountries.map(function (country) {
        return country.name.toLowerCase() === name.toLowerCase()
          ? {
              ...country,
              gold: parseInt(gold),
              silver: parseInt(silver),
              bronze: parseInt(bronze),
            }
          : country;
      });
    });

    setName("");
    setGold("");
    setSilver("");
    setBronze("");
  }

  // 국가 삭제 함수
  // countryName과 같은 이름의 국가 삭제
  function handleDelete(countryName) {
    setCountries(function (prevCountries) {
      return prevCountries.filter(function (country) {
        return country.name !== countryName;
      });
    });
  }

  // 금메달, 은메달, 동메달 순으로 내림차순 정렬 (sort 사용)
  const sortedCountries = countries.sort(function (a, b) {
    if (b.gold !== a.gold) return b.gold - a.gold;
    if (b.silver !== a.silver) return b.silver - a.silver;
    return b.bronze - a.bronze;
  });

  return (
    <div className="App">
      <div className="container">
        <h1>2024 파리 올림픽</h1>
        <form className="input-group">
          <div className="input-container">
            <label>국가명</label>
            <input
              type="text"
              placeholder="국가 입력"
              value={name}
              onChange={function (e) {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label>금메달</label>
            <input
              type="number"
              placeholder="0"
              value={gold}
              onChange={function (e) {
                setGold(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label>은메달</label>
            <input
              type="number"
              placeholder="0"
              value={silver}
              onChange={function (e) {
                setSilver(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label>동메달</label>
            <input
              type="number"
              placeholder="0"
              value={bronze}
              onChange={function (e) {
                setBronze(e.target.value);
              }}
            />
          </div>
        </form>

        <button onClick={handleAdd}>국가 추가</button>
        <button onClick={handleUpdate}>업데이트</button>

        <ul className="medal-list">
          {sortedCountries.map(function (country, index) {
            return (
              <li key={index} className="medal-item">
                ꒰{country.name}꒱ ꒰Gold: {country.gold}꒱, ꒰Silver:{" "}
                {country.silver}꒱, ꒰Bronze: {country.bronze}꒱
                <button
                  className="delete-button"
                  onClick={function () {
                    handleDelete(country.name);
                  }}
                >
                  삭제
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
