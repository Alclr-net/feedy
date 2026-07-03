"use client"
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
export function useMessages(user:any){
    return useQuery({
        queryKey:["msg"],
        queryFn:async()=>{
            const res = await axios.get(`api/messages/${user?._id}`)
            if(!res.data.success)return [];
          
            return res.data.data[0].messagesData??[]

        },
        refetchOnWindowFocus: true,
        staleTime: 5 * 60 * 1000,
        retry: false,
        enabled:!!user?._id

    })
}
