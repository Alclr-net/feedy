    "use client"
    import { useQuery } from "@tanstack/react-query";
    import axios from "axios";
    export function useUser() {
        return useQuery({
            queryKey: ["me"],
            queryFn: async () => {
                const res = await axios.get("/api/me"); 
            if(!res.data.success)return null;
                return res.data.user
            },
            // initialData: initialUser,
            refetchOnWindowFocus: true,
            staleTime: 5 * 60 * 1000,
            retry: false
        })
        
    }