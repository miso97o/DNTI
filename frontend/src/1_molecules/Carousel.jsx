export default function Carousel({ cardList }) {
  return (
    <div className="w=[350px] h-[250px] overflow-hidden bg-orange-400">
      <div className="flex flex-row">
        {cardList &&
          cardList.map((card) => {
            return <img alt="hello" />;
          })}
      </div>
    </div>
  );
}
