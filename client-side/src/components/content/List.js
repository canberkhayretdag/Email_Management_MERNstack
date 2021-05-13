import React, { useState, useEffect } from 'react';
import '../../App.css'
import '../../styles/list.css'
import DeleteButton from '@material-ui/icons/Delete'
import AddButton from '@material-ui/icons/Add'
import EditButton from '@material-ui/icons/Edit'
import axios from 'axios'


const List = () => {

    const SERVER_URL = 'http://localhost:3030'

    const [lists, setLists] = useState([])
    const [detailedList, setDetailedList] = useState()
    const [addedMail, setAddedMail] = useState('')
    const [addedList, setAddedList] = useState('')

    const handleAddedEmail = (e) => {
        setAddedMail(e.target.value)
    }

    const handleAddedList = (e) => {
        setAddedList(e.target.value)
    }

    const addList = async () => {
        const res = await axios.post(SERVER_URL + `/api/list/new`, {
            name: addedList
        })
        setAddedList('')
        fetchLists()
    }

    const addMail = async () => {
        let list_id = detailedList._id
        const res = await axios.post(SERVER_URL + `/api/list/` + list_id + `/mails/new`,
        {
            email:addedMail
        })
        setAddedMail('')
        fetchList(list_id)
    }

    const deleteMail = async (email) => {
        let list_id = detailedList._id
        const res = await axios.post(SERVER_URL + `/api/list/` + list_id + `/mails/delete`,
        {
            email:email
        })
        fetchList(list_id)        
    }

    const deleteList = async (list_id) => {
        if (detailedList._id == list_id) {
            setDetailedList()
        }
        const res = await axios.post(SERVER_URL + `/api/list/` + list_id + `/delete`)
        fetchLists()
    }

    const fetchLists = async () => {
        const res = await axios(SERVER_URL + `/api/list/getLists`)
        setLists(res.data)
    }

    const fetchList = async (id) => {
        const res = await axios(SERVER_URL + `/api/list/` + id)
        setDetailedList(res.data)        
    }

    useEffect(() => {
        fetchLists()
    }, [])

    const getList = (_id) => {
        lists.map(l => 
            {if (_id == l._id){
                setDetailedList(l)
                return
           }}
        )
    }



    return (
        <div className="email__list">
            <div className="email__list__titles">
            <input value={addedList} onChange={ handleAddedList } className="email__list__input" placeholder="Add a new List" /><span onClick={addList}><AddButton className="lists-icons cursor__pointer" /></span>
                {
                    lists && lists.map(l => (
                        <><h3 onClick={() => getList(l._id)}># { l.name } <span><DeleteButton onClick={() => deleteList(l._id)} className="lists-icons cursor__pointer email__list__icons" /></span></h3></>
                    ))
                }
            </div>
            <div className="email__list__items">
                { detailedList && 
                <>
                <h3>{ detailedList.name }</h3>
                <hr />
                <input value={addedMail} onChange={ handleAddedEmail } className="email__list__input" placeholder="Add a new mail" /><span onClick={addMail}><AddButton className="lists-icons cursor__pointer" /></span>
                { detailedList && 
                detailedList.mails.map(m => (
                    <p>{ m } <span ><DeleteButton onClick={() => deleteMail(m)} className="cursor__pointer lists-icons email__list__icons" /></span></p>
                ))
                }
               </>
                }
            </div>
        </div>
    )
}

export default List
