import React from "react";
import { useState } from "react";
import styles from "./District.module.css";
import {Multiselect} from "multiselect-react-dropdown"
import ReactSelect from "react-select";

function District() {
  const gulist = [
    {label: "강남구", value: "1"},
    {label: "강동구", value: "2"},
    {label: "강북구", value: "3"},
    {label: "강서구", value: "4"},
    {label: "관악구", value: "5"},
    {label: "광진구", value: "6"},
    {label: "구로구", value: "7"},

    {gu: "금천구"},
    {gu: "노원구"},
    {gu: "도봉구"},
    {gu: "동대문구"},
    {gu: "동작구"},
    {gu: "마포구"},
    {gu: "서대문구"},
    {gu: "서초구"},
    {gu: "성동구"},
    {gu: "성북구"},
    {gu: "송파구"},
    {gu: "양천구"},
    {gu: "영등포구"},
    {gu: "용산구"},
    {gu: "은평구"},
    {gu: "종로구"},
    {gu: "중구"},
    {gu: "중랑구"},
  ];
  const [select, setSelect] = useState();

  const handleChange = event => {
    // setSelect(event.target.value);
    console.log(select," selected:")
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p>관심 있는 지역(구)을 선택해주세요.</p>
        <ReactSelect options={gulist} value={gulist.value} placeholder="지역(구)를 선택해주세요" onChange={handleChange} isMulti>
          {/* {gulist.map((item) => {
            return <options value={item}>{item}</options>;
          })} */}
        </ReactSelect>
      </div>
    </div>
  );
}
export default District
