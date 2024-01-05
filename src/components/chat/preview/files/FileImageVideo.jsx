export default function FileImageVideo({ url, type }) {
  return (
    <div className="cursor-pointer">
      {type === 'IMAGE' ? (
        <img src={url} alt=""></img>
      ) : (
        <video src={url} controls></video>
      )}
    </div>
  );
}
