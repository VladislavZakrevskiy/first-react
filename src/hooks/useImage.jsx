import axios from "axios";
import { Buffer } from "buffer";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";

export const useImage = (post_id) => {
    const username = localStorage.getItem('username')
    const [screenShot, setScreenshot] = useState(undefined)
    const url = 'http://localhost:5000/api/images/'

    useEffect(() => {
        let data = {
            username:username
        }
        if(post_id){
            console.log(post_id)
            data = {
                post_id:post_id
            }
        }

        async function fetchData() {
            const response = await axios.put(url,data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType:'arraybuffer'
            })
            let base64ImageString = Buffer.from(await response.data, 'binary').toString('base64')
            setScreenshot("data:image/png;base64," + base64ImageString)
        }
        fetchData();
    }, [])

    return screenShot
}

