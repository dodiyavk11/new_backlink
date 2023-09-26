const Models = require("../models")
const { unlinkAttachement } = require("../utils/deleteFile")

exports.createEmailTemplate = async (req, res) => {
    try {         
        const { email_title } = req.body
        const { email_type } = req.body
        const { email_content } = req.body
        const { header } = req.body
        const file = req.file ? req.file.filename : null;
        const emailData = { email_title, email_type, email_content,header,file}
        const templateAdded = await Models.email_format.create(emailData)
        res.status(200).send({ status: true, message: "Email templated added successfully", data: templateAdded });
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: "Email template cannot be added because an error has occurred", data: [],error: err.message })
    }
}

exports.removeTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const removeTemplate = await Models.email_format.destroy({ where: { id } })
    if (removeTemplate === 1) {
        res.status(200).send({ status: true, message: "Template successfully removed", data: removeTemplate })
    }    
    else
    {
        res.status(500).send({ status: true, message: "Something went to wrong Please try again", data: [] })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ status: false, message: "The template cannot be removed. an error has occurred", data: [],error: err.message })
  }
}

exports.templateList = async(req, res) => {
    try{
        const template = await Models.email_format.findAll();
        const templatelist = await template.map((val) => { return val.dataValues })
        res.status(200).send({ status: true, message: "Email template fetched successfully", data:template });
    } catch(err){
        console.log(err)
        res.status(500).send({ status: false, message: "Template not fetched Something went to wrong Please try again",data:[], error: err.message })
    }
}

exports.getTemplate = async(req, res) => {
    try
    { 
        const { id } = req.params; 
        const template = await Models.email_format.findOne({ where: { id:id }});
        if (template) {
            res.status(200).send({ status: true, message: "Fetched successfully", data: template });
        }
        else
        {
            res.status(500).send({ status: true, message: "Something went to wrong Please try again", data: [] })
        }        
    } 
    catch(err)
    {
        res.status(500).send({ status: false, message: "Template not fetched Something went to wrong Please try again",data:[], error: err.message })
    }
}

exports.editEmailTemplate = async (req, res) => {
    try {
        const { id } = req.params;        
        const file = req.file ? req.file.filename : null;
        const { email_title, email_type, email_content, header } = req.body;
        const editData = {
            email_title,
            email_type,
            email_content,
            header,
            file,
        };
        const getTemplate = await Models.email_format.findOne({ where: { id:id }});
        unlinkAttachement(getTemplate.dataValues.file)
        const update = await Models.email_format.update(editData, { where: { id } });
        res.status(200).send({ status: true, message: "Email Template updated successfully", data: update });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: "Something went wrong, Please try again", error: err.message });
    }
};
