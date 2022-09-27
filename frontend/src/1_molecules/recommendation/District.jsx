import React from "react";
import styles from "./District.module.css";
import {Multiselect} from "multiselect-react-dropdown"

function District() {
  const gulist = [
    {gu: "강남구"},
    {gu: "강동구"},
    {gu: "강북구"},
    {gu: "강서구"},
    {gu: "관악구"},
    {gu: "광진구"},
    {gu: "구로구"},
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
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p>관심 있는 지역(구)을 선택해주세요.</p>
        <Multiselect options={gulist} displayValue="gu" placeholder="지역(구)를 선택해주세요">
          {/* {gulist.map((item) => {
            return <options value={item}>{item}</options>;
          })} */}
        </Multiselect>
      </div>
    </div>
  );
}
export default District
