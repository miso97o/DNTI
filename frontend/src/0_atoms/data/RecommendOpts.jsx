import RentLogo from "../Icon/RentLogo.png";
import TrafficLogo from "../Icon/BusLogo.png";
import RestaurantLogo from "../Icon/RestaurantLogo.png";
import CultureLogo from "../Icon/CultureLogo.png";
import SafetyLogo from "..//Icon/SafetyLogo.png";
import EnvironmentLogo from "../Icon/ParkLogo.png";
import styles from "./RecommendOpts.module.css";

export const options = [
  {
    value: "rent",
    label: 
    <p className={styles.labelTxt}>전월세</p>,
    image:
    <img src={RentLogo} alt="RentLogo" className={styles.RentLogo}/>,
    key: "1",
    checked : false

  },
  {
    value: "traffic",
    label: 
    <p className={styles.labelTxt}>교통</p>,
    image:
    <img src={TrafficLogo} alt="TrafficLogo" className={styles.TrafficLogo}/>,
    key: "2",
    checked : false
  },
  {
    value: "restaurant",
    label: 
    <p className={styles.labelTxt}>식생활</p>,
    image:
    <img src={RestaurantLogo} alt="RestaurantLogo" className={styles.RestaurantLogo}/>,
    key: "3",
    checked : false
  },
  {
    value: "culture",
    label: 
    <p className={styles.labelTxt}>문화</p>,
    image:
    <img src={CultureLogo} alt="CultureLogo" className={styles.CultureLogo}/>,
    key: "4",
    checked : false
  },
  {
    value: "safety",
    label: 
    <p className={styles.labelTxt}>안전</p>,
    image:
    <img src={SafetyLogo} alt="SafetyLogo" className={styles.SafetyLogo}/>,
    key: "5",
    checked : false
  },
  {
    value: "environment",
    label: 
    <p className={styles.labelTxt}>환경</p>,
    image:
    <img src={EnvironmentLogo} alt="EnvironmentLogo" className={styles.EnvironmentLogo}/>,
    key: "6",
    checked : false
  },
];