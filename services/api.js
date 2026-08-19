import { MOCK_SUBJECTS } from "../utils/mockData";
import useAppStore from "../utils/useAppStore";

export function getSubjects(){
      const setSubjects=useAppStore((state)=>state.setSubjects)
    
     setSubjects(MOCK_SUBJECTS) 
   
}