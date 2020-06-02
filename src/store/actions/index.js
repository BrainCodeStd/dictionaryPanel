import * as API from "../../api/api";
export const getAllCategories = () => {  
    return (dispatch) => {
        try {
            let response = API.getAllCategories;
            return response
        } catch (err) {
            return err
        }
    };
}
export const remove_question = (data) => {  
    return (dispatch) => {
        try {
            let response = API.removeQuiz(data);
            return response
        } catch (err) {
            return err
        }
    };
}
