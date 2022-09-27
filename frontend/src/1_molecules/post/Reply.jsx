export default function Reply({ nickname, datetime, contents }) {
  return (
    <div className="flex flex-col w-full m-3">
      <div className="flex flex-row w-full justify-between">
        <p>{nickname}</p>
        <p>{datetime}</p>
      </div>
      <div className="">{contents}</div>
    </div>
  );
}
