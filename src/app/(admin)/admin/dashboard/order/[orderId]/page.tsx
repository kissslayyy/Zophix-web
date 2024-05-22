
"use client"

import axios from "axios"
import { useEffect, useState } from "react"

export default  function Page({ params }: { params: { orderId: string } }) {
const [response,setResponse] = useState()
const data =()=> axios.get(`/api/get-orders/?=${params.orderId}`).then((res)=>{
    setResponse(res.data.data)
}).catch((error)=>{
    console.log(error)
})
useEffect(()=>{
    data()
},[])
console.log(response,"zz")
    return <div>My Nam: {params.orderId}</div>
  }