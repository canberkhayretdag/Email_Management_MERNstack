import React, { useState, useEffect } from 'react'

import '../../styles/my-emails.css'
import axios from 'axios'
import DeleteButton from '@material-ui/icons/Delete'
import AddButton from '@material-ui/icons/Add'
import EditButton from '@material-ui/icons/Edit'

const Mails = () => {

    const SERVER_URL = 'http://localhost:3030'

    const [mails, setMails] = useState([])
    const [detailedMail, setDetailedMail] = useState()

    const [formName, setFormName] = useState()
    const [formEmail, setFormEmail] = useState()
    const [formHost, setFormHost] = useState()
    const [formPort, setFormPort] = useState()
    const [formPassword, setFormPassword] = useState()

    const clearForm = async () => {
        setFormName('')
        setFormEmail('')
        setFormHost('')
        setFormPort('')
        setFormPassword('')
    }

    const handleFormName = (e) => {
        setFormName(e.target.value)
    }

    const handleFormEmail = (e) => {
        setFormEmail(e.target.value)
    }

    const handleFormHost = (e) => {
        setFormHost(e.target.value)
    }

    const handleFormPort = (e) => {
        setFormPort(e.target.value)
    }

    const handleFormPassword = (e) => {
        setFormPassword(e.target.value)
    }
    

    const fetchMails = async () => {
        const res = await axios(SERVER_URL + `/api/mail/getMails`)
        setMails(res.data)
    }

    const deleteMail = async (mail_id) => {
        const res = await axios.post(SERVER_URL + `/api/mail/delete/` + mail_id)
        if (res) {
            fetchMails()
        }
        
    }

    const addMail = async () => {
        const res = await axios.post(SERVER_URL + `/api/mail/new`, {
            name: formName,
            email: formEmail,
            host: formHost,
            port: formPort,
            password: formPassword
        })
        clearForm()
        fetchMails()
    }

    const getMail = (_id) => {
        mails.map(m => 
            {if (_id == m._id){
                setDetailedMail(m)
                return
           }}
        )
    }

    useEffect(() => {
        fetchMails()
    }, [])


    return (
        <div>
            <div className="my__emails">
                <div className="my__emails__titles">
                    {  mails &&
                        mails.map(m => (
                            <h3 onClick={() => getMail(m._id) }># { m.name } <span ><DeleteButton onClick={() => deleteMail(m._id)} className="cursor-pointer email__list__icons" /></span></h3>
                        ))
                    }
                    </div>
                <div className="my__emails__items">
                    { detailedMail && 
                        <>
                            <h3># { detailedMail.name }</h3>
                            <hr />
                            <div>Email: { detailedMail.email }<span></span></div>
                            <div>Host: { detailedMail.host }<span></span></div>
                            <div>Port: { detailedMail.port }<span></span></div>                        
                        </>
                    }
                </div>
            </div>
            <hr />
            <div className="mymails__form">
                <h2>Add a new Mail</h2>
                <input onChange={ handleFormName } value={formName} type="text" placeholder="name" />
                <br /><br />
                <input onChange={ handleFormEmail } value={formEmail} type="text" placeholder="email" />
                <br /><br />
                <input onChange={ handleFormHost } value={formHost} type="text" placeholder="host" />
                <br /><br />
                <input onChange={ handleFormPort } value={formPort} type="text" placeholder="port" />
                <br /><br />
                <input onChange={ handleFormPassword } value={formPassword} type="text" placeholder="password" />
                <br /><br />
                
                <button onClick={ addMail } className="cursor-pointer" type="submit">Save</button>
            </div>
        </div>
    )
}

export default Mails
