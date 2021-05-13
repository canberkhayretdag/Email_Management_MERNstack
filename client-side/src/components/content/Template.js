import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../../styles/email-templates.css'

import DeleteButton from '@material-ui/icons/Delete'
import AddButton from '@material-ui/icons/Add'
import EditButton from '@material-ui/icons/Edit'

const Template = () => {

    const SERVER_URL = 'http://localhost:3030'

    const [templates, setTemplates] = useState([])
    const [formSubject, setFormSubject] = useState()
    const [formContent, setFormContent] = useState()
    const [formName, setFormName] = useState()
    const [detailedTemplate, setDetailedTemplate] = useState()

    const clearForm = async () => {
        setFormSubject('')
        setFormContent('')
        setFormName('')
    }

    const handleFormName = (e) => {
        setFormName(e.target.value)
    }

    const handleFormSubject = (e) => {
        setFormSubject(e.target.value)
    }

    const handleFormContent = (e) => {
        setFormContent(e.target.value)
    }

    const addTemplate = async () => {
        const res = await axios.post(SERVER_URL + `/api/template/new`, {
            name: formName,
            subject: formSubject,
            content: formContent
        })
        clearForm()
        fetchTemplates()
    }

    const fetchTemplates = async () => {
        const res = await axios(SERVER_URL + `/api/template/getTemplates`)
        setTemplates(res.data)
    }

    const getTemplate = async (_id) => {
        templates.map(t => 
            {if (_id == t._id){
                setDetailedTemplate(t)
                return
           }}
        )
    }

    const deleteTemplate = async (template_id) => {
        if (detailedTemplate._id == template_id) {
            setDetailedTemplate()
        }
        const res = await axios.post(SERVER_URL + `/api/template/` + template_id + `/delete`)
        fetchTemplates()       
    }

    useEffect(() => {
        fetchTemplates()
    }, [])

    return (
        <div>
            <div className="email__templates">
                <div className="email__templates__titles">
                {
                    templates && templates.map(t => (
                        <><h3 onClick={() => getTemplate(t._id)}># { t.name } <span><DeleteButton onClick={() => deleteTemplate(t._id)} className="cursor__pointer email__list__icons" /></span></h3></>
                    ))
                }
                </div>
                <div className="email__templates__items">

            
            {   detailedTemplate && 
                    <><h3># { detailedTemplate.name }</h3>
                                    <hr />
                                    <h4>Subject: { detailedTemplate.subject }</h4>
                                    <p>{ detailedTemplate.content }</p>
                    </>
            }
            </div>
            </div>
            <hr />
            <div className="template__form">
                <h2>Add a new Template</h2>
                <input onChange={ handleFormName } value={formName} type="text" placeholder="name" />
                <br /><br />
                <input onChange={ handleFormSubject } value={formSubject} type="text" placeholder="subject" />
                <br /><br />
                <textarea onChange={ handleFormContent } placeholder="Content of mail" value={formContent} rows={10} cols={70}></textarea>
                <br />
                <button onClick={ addTemplate } className="cursor-pointer" type="submit">Save</button>
            </div>
        </div>
        
    )
}

export default Template
