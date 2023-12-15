import { useDispatch, useSelector } from 'react-redux';
import { open_create_conversation } from '../../../features/chatSlice';
import { Capitalize } from '../../../utils/string';
export default function Contact({ contact, setSearchResults }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const values = { reciver_id: contact._id, token };
  const openConversation = async () => {
    await dispatch(open_create_conversation(values));
    setSearchResults([]);
  };
  return (
    <li
      onClick={() => openConversation()}
      className="list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      <div className="flex items-center gap-x-3 py-[10px]">
        <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
          <img
            src={contact.picture}
            className="w-full h-full object-cover"
          ></img>
        </div>
        {/*conv name and message */}
        <div className="w-full flex flex-col">
          <h1 className="font-bold flex items-center gap-x-2">
            {Capitalize(contact.name)}
          </h1>
          <div>
            <div className="flex items-center gap-x-1 dark:text-dark_text_2">
              <div className="flex-1 items-center gap-x-1 ">
                <p>{contact.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}
