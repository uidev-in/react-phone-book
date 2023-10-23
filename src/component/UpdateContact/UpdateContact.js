import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateContactDetails, getContactList } from "../../store/slice/contactSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateContact() {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate()

 // get id from url
  const {id} = useParams();
  const {contact_list} = useSelector((state)=>state.app);

  useEffect(()=>{
    if(id){
      dispatch(getContactList());
      const user = contact_list.filter((person)=>person.id == id)
      setCurrentUser(user[0])
      console.log("current user",currentUser);
    }
  },[]);


  
function updateUserDetails(event){
  setCurrentUser({...currentUser,[event.target.name]:event.target.value})
  console.log("pudate new value",currentUser)
}


function handleSubmit(event){
  event.preventDefault();
 dispatch(updateContactDetails(currentUser));
 navigate("/");
}
 


  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <form action="#" className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex justify-center py-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                width={160}
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="ex : Saanvi"
                name="name"
                onChange={updateUserDetails}
                value={currentUser?.name}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Mobile No.
              </label>
              <input
                type="text"
                id="phone"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="999xxxx123"
                name="phone"
                onChange={updateUserDetails}
                value={currentUser?.phone}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email Id.
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="saanvi@uidev.com"
                name="email"
                onChange={updateUserDetails}
                value={currentUser?.email}
              />
            </div>

            <button
              type="submit"
              className=" py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Save
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
