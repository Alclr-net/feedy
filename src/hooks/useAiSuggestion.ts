"use client"
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
export function useAisuggestion(mood:string){
    return useQuery({
        queryKey:["suggestion",mood],
        queryFn:async()=>{
            const res = await axios.post("/api/ai_suggestion",
                {mood})
            if(!res.data.success)return [];    
            console.log("suggested data", res.data.data.split(","))    
            return res.data.data.split(",")??[]

        },
        refetchOnWindowFocus:false,
        retry: false,

    })
}
