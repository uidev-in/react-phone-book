import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const INIT_STATE = {
  contact_list: [],
  isLoading: false,
  error: null,
};

// For creating new contact -> AsynThunk is used for API

export const createContact = createAsyncThunk(
  "createContact",
  async (data,{isRejectedWithValue}) => {
    //we are fetching Api to POST the detail
    const response = await fetch(
      "https://653686dbbb226bb85dd244f8.mockapi.io/contacts",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);

// For reading All the contact list from API - AsyncThunk is used For API

export const getContactList = createAsyncThunk("getContactList", async (args,{isRejectedWithValue}) => {
    // here we will fetching the API
  const response = await fetch("https://653686dbbb226bb85dd244f8.mockapi.io/contacts");

  try{
    const result = await response.json();
    return result;
  }catch(error){

    return isRejectedWithValue(error);;
  }
});

// For updaing contact details of single user from API - AsyncThunk is used For API
export const updateContactDetails = createAsyncThunk("updateContactDetails", async (data,{isRejectedWithValue}) => {
  // here we will fetching the API
  const response = await fetch(
    `https://653686dbbb226bb85dd244f8.mockapi.io/contacts/${data.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

try{
  const result = await response.json();
  return result;
}catch(error){

  return isRejectedWithValue(error);;
}
});

// For Deleting contact details of single user from API - AsyncThunk is used For API
export const deleteContactDetails = createAsyncThunk("deleteContactDetails", async (id,{isRejectedWithValue}) => {
  // here we will fetching the API
  const response = await fetch(
    `https://653686dbbb226bb85dd244f8.mockapi.io/contacts/${id}`,
    {
      method: "DELETE",
      
    }
  );

try{
  const result = await response.json();
  return result;
}catch(error){

  return isRejectedWithValue(error);;
}
});

export const contactSlice = createSlice({
  name: "contactList",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contact_list.push(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getContactList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContactList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contact_list = action.payload;
      })
      .addCase(getContactList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }).addCase(updateContactDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContactDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contact_list = state.contact_list.map((details)=>details.id == action.payload.id ? action.payload : details)
      })
      .addCase(updateContactDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContactDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContactDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contact_list = state.contact_list.map((item)=>item.id !== action.payload.id)
        
      })
      .addCase(deleteContactDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      
  },
});

export default contactSlice.reducer;
