import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchStart,getTodos } from "../redux/todoReducer";
import List from "../components/List"

import React from 'react'

const Home = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchStart())
        dispatch(getTodos())
    },[dispatch])
  return (
    <div>
      <List />
    </div>
  )
}

export default Home
