export default function AuthInput({
  name,
  type,
  placeholder,
  register,
  error,
}) {
  return (
    <div className=" dark:text-dark_text_1 ">
      <label className="text-sm font-bold tracking-wide">{placeholder}</label>
      <input
        className="w-full dark:bg-dark_bg_3 text-base p-2  rounded-lg outline-none"
        type={type}
        placeholder={placeholder}
        {...register(name)}
      ></input>
      {error && <p className="text-red-400 max-h-1">{error}</p>}
    </div>
  );
}
