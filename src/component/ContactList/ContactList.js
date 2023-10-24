import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactList } from "../../store/slice/contactSlice";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

export default function ContactList() {
  const dispatch = useDispatch();
  const [contactIdToDelete, setContactIdToDelete] = useState(null);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const { contact_list, isLoading,searchData } = useSelector((state) => state.app);
  const navigate = useNavigate();

   // console.log("ID Alert",id)
   useEffect(() => {
    dispatch(getContactList());
  }, []);



  
  // This is an example of a confirm action that gets executed after the user confirms the deletion.
  const handleConfirmDelete = () => {
    // Perform additional actions here, such as updating the UI or displaying a success message.
    console.log('Contact with ID deleted successfully.',contactIdToDelete);

  };

  // Function to open the modal for deleting a contact
  const openDeleteModal = (contactId) => {
    setContactIdToDelete(contactId);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setContactIdToDelete(null);
  };

 

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
            {contact_list.filter((user)=>{
              if(searchData.length ===0){
                return user;
              }
              else {
                return user.name.toLowerCase().includes(searchData);
              }
            })?.map((item, index) => (
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
                    <button type="button" className="bg-red-600 text-white rounded-sm p-2 " onClick={()=>openDeleteModal(item.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {/* <h1>Deafult--------------------></h1>
              {contact_list?.map((item, index) => (
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
                    <button type="button" className="bg-red-600 text-white rounded-sm p-2 " onClick={()=>openDeleteModal(item.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
          <Modal open={isModalOpen} onClose={closeDeleteModal} userId={contactIdToDelete} confirmAction={handleConfirmDelete} />
          
        </div>
      </div>
    </>
  );
}
