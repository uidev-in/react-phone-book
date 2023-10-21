import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactList } from "../../store/slice/contactSlice";
import { useNavigate } from "react-router-dom";

export default function ContactList() {
  const dispatch = useDispatch();
  const { contact_list, isLoading } = useSelector((state) => state.app);
  const [currentId,setCurrentId] = useState("");
  const navigate = useNavigate();

  // console.log("ID Alert",id)

  useEffect(() => {
    dispatch(getContactList());
  }, []);


  
  //Delete Handler
  function handleDelete(id){
    console.log("Handler called",id)
    // setCurrentId(id);
  }


  if (isLoading) {
   return <h1>Loading....</h1>;
  }

  return (
    <>
      <div className="container mx-auto py-10">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {contact_list.map((item, index) => (
                <tr key={item.id} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.phone}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                    <button type="button" className="bg-black text-white rounded-sm p-2" onClick={()=>navigate(`/edit/${item.id}`)}>Edit</button> 
                    <button type="button" className="bg-red-600 text-white rounded-sm p-2" onClick={()=>handleDelete(item.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
