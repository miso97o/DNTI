import React from "react";
import { useState } from "react";
import styles from "./District.module.css";
import {Multiselect} from "multiselect-react-dropdown"
import Select from "react-select";
localStorage.setItem("guStorage", [])

function District() {
  const gulist = [
    {label: "강남구", value: "1"},
    {label: "강동구", value: "2"},
    {label: "강북구", value: "3"},
    {label: "강서구", value: "4"},
    {label: "관악구", value: "5"},
    {label: "광진구", value: "6"},
    {label: "구로구", value: "7"},
    {label: "금천구", value: "8"},
    {label: "노원구", value: "9"},
    {label: "도봉구", value: "10"},
    {label: "동대문구", value: "11"},
    {label: "동작구", value: "12"},
    {label: "마포구", value: "13"},
    {label: "서대문구", value: "14"},
    {label: "서초구", value: "15"},
    {label: "성동구", value: "16"},
    {label: "성북구", value: "17"},
    {label: "송파구", value: "18"},
    {label: "양천구", value: "19"},
    {label: "영등포구", value: "20"},
    {label: "용산구", value: "21"},
    {label: "은평구", value: "22"},
    {label: "종로구", value: "23"},
    {label: "중구", value: "24"},
    {label: "중랑구", value: "25"},
  ];
  const [select, setSelect] = useState();

  const handleChange = event => {
    setSelect(Array.isArray(event)?event.map(x=>x.label):[]);
    localStorage.setItem("guStorage", (Array.isArray(event)?event.map(x=>x.label):[]))
    console.log(select," selected:")
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* <p>관심 있는 지역(구)을 선택해주세요.</p> */}
        <Select options={gulist} placeholder="관심 있는 지역(구)를 선택해주세요" onChange={handleChange} isMulti>
          {/* {gulist.map((item) => {
            return <options value={item}>{item}</options>;
          })} */}
        </Select>
      </div>
    </div>
  );
}
export default District
