import {GET_CONTACT_INFO, GET_GENERAL_INFO, UPDATE_GENERAL_INFO} from "../actions/types";

const initialState = {
  general_info: {"id": "", "about_me_list": "", "greeting_video": "", "psychological_consultation_description": "", "whatsapp_number": "", "instagram_alias": "", "main_page_numbers_form_text": ""},
  contact_info: {"whatsapp_number": "", "whatsapp_link": "", "instagram_alias": "", "instagram_link": ""}
};

export default function (state= initialState, action) {
  switch (action.type) {
    case GET_GENERAL_INFO:
      return {
        ...state,
        general_info: action.payload,
      };
    case UPDATE_GENERAL_INFO:
      return {
        ...state,
        general_info: action.payload,
      };
    case GET_CONTACT_INFO:
      return {
        ...state,
        contact_info: action.payload,
      };
    default:
      return state;
  }
}