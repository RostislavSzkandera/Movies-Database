import React from "react";
import { Navigate } from "react-router-dom"
import { MyContext } from "../context/Context";

const PrivateLayouts = ( {children} )  => {
    const { user } = MyContext()

    if(!user) {
        return <Navigate to="/login" />

    } else {
        return children
    }
}

export default PrivateLayouts