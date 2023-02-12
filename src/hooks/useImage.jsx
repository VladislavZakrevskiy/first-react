import axios from "axios";
import { Buffer } from "buffer";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";

export const useImage = () => {
    const {username } = useContext(AuthContext)
    const [screenShot, setScreenshot] = useState(undefined)
    const url = 'http://localhost:5000/api/images/'

    useEffect(() => {
        async function fetchData() {
            const response = await axios.put(url,{
                username: username
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType:'arraybuffer'
            })
            let base64ImageString = Buffer.from(await response.data, 'binary').toString('base64')
            setScreenshot("data:image/png;base64," + base64ImageString)
            console.log(screenShot)
        }
        fetchData();
    }, [])

    return screenShot
}

