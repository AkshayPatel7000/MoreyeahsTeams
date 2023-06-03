import moment from "moment";

import { APICONSTANTS } from "../../shared/constants";
import CommonIns from "./commonInterceptor";

export default class EmployeeService{
   
    static async getEmployeesList(){
       const res=await CommonIns.get(APICONSTANTS.getEmoEmployees)
       console.log("ress=>>>>",res)
    }
}