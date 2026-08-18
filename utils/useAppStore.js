import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoading } from "expo-font";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getSubjects } from "../services/api";

const useAppStore=create(
    persist(
     (set,get)=>({
    subjects:[],

    currentSubject:null,

    isLoading:false,

    error:null,

    setSubjects:(subjects)=>set({subjects}),

    setCurrentSubject:(subject)=>set({currentSubject:subject}),

    addSubject:(subject)=>set((state)=>({
        subjects:[subject,...state.subjects]
    })),
    updateSubject:(subject)=>((state)=>({
        subjects:state.subjects.map((s)=>{
            s._id===subject._id?subject:s
        }),
        currentSubject:state.currentSubject?._id===subject._id?subject:state.currentSubject
    })),
    deleteSubject:(subjectId)=>set((state)=>({
        subjects:state.subjects.filter((s)=>s._id!==subjectId),
        currentSubject:state.currentSubject?._id===subjectId?null:state.currentSubject
    })),

    
    setloading:(isLoading)=>set({isLoading}),

    setError:(error)=>set({error}),

    clearError:()=>set({error:null}),

    fetchSubjects: () => {
        try {
          set({ isLoading: true, error: null });
          const response = getSubjects();
         
          set({ subjects: response, isLoading: false });
          return response;
        } catch (error) {
          console.error('❌ Error loading subjects:', error);
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

}),
{
    name:'CS-Storage',
    storage:createJSONStorage(()=>AsyncStorage),
    partialize:(state)=>({
        subjects:state.subjects,
        currentSubject:state.currentSubject,
    }),
    merge:(persistedState,currentState)=>({
        ...currentState,
        ...persistedState,
        isLoading:false,
        error:null
    })
}
))
export const useSubjects=()=>useAppStore((state)=>state.subjects);
export const useCurrentSubject=()=>useAppStore((state)=>state.currentSubject)
export const useLoading=()=>useAppStore((state)=>state.isLoading)
export const useError=()=>useAppStore((state)=>state.error)



export default useAppStore;