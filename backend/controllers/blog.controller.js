const Models = require("../models");
const Sequelize = require('sequelize');

exports.addBlog = async (req, res) => {
	try {
		const { title } = req.body;
		const { content } = req.body;
		const { status } = req.body;
		const user_id = req.userId;

		const addData = { title, content, author:user_id,status };
		const addBlog = await Models.Blogs.create(addData);

		res.status(200).send({ status: true, message: "Blog added successfully", data: addBlog });	
	} catch (err) {
		  console.error(err);
		  res.status(500).send({ status: false, message: "Something went wrong, Please try again.", data: [], error: err.message});
	}
}

exports.listBlog = async(req, res) => {
	try
	{
		const blogData = await Models.Blogs.findAll();
		res.status(200).send({ status: true, message: "Blog listed Success.", data: blogData })
	}
	catch(err){
		console.log(err)
		res.status(500).send({ status: false, "message": "Something went to wrong, Please try again", data: [], error: err.message })
	}
}

exports.getBlog = async(req, res) => {
	try
	{
		const { id } = req.params
		const getBlog = await Models.Blogs.findOne({ where:{ id:id }});
		if(getBlog)
		{
			res.status(200).send({ status:true, message: "Blog get Success.", data: getBlog });
		}		
		else
		{
			res.status(500).send({ status:false, message: "Blog not found", data: [] });
		}
	} catch
	{
		res.status(500).send({ status: false, "message": "Something went to wrong, Please try again", data: [], error: err.message })
	}
}

exports.updateBlog = async(req, res) => {
	try
	{
		const { id } = req.params;
		const { title } = req.body
		const { content } = req.body 
		const { status } = req.body 
		const updateData = { title,content,status }

		const update = await Models.Blogs.update(updateData, { where: { id:id }})
		if(update == 1)
		{
			res.status(200).send({ status: true, message: "Blog updated successfully.", data: update })
		}
		else
		{
			res.status(500).send({ status:false, message: "Blog not found or Something went to  wrong.", data:[] })
		}
	}
	catch(err)
	{
		console.log(err)
		res.status(500).send({ status:false, message: "Something went to wrong, Please try again.", data: [], error: err.message })
	}
}

exports.deleteBlog = async(req,res) => {
	try
	{
		const { id } = req.params;
		const deleteBlog = await Models.Blogs.destroy({ where:{ id:id }})
		if(deleteBlog)
		{
			res.status(200).send({ status: true, message: "Blod deleted successfully.", data: deleteBlog })
		}
		else
		{
			res.status(500).send({ status:false, message: "Blog not found or Something went to wrong, Please try again", data: [] })
		}
	}
	catch(err)
	{
		console.log(err)
		res.status(500).send({ status: false, message: "Something went to wrong, Please try again.", data: [], error:err.message })
	}
}