import {createContext} from 'react'

interface AdminContextData {
    isAdmin: boolean;
    toggleUserMode: () => void;
}

export const initalAdminContextData: AdminContextData = {
    isAdmin: false,
    toggleUserMode: () => {
        //to overide eslint rule
    }
}
const AdminContext = createContext(initalAdminContextData)

 
export default AdminContext;