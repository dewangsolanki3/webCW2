let express = require('express')
let router = express.Router()
let User = require('../models/Users.js')
let Profile = require('../models/Profile.js')
let passport  = require('passport')




router.get('/',passport.authenticate('jwt',{session: false}),(request,response) => {
    let errors_list = {}

    Profile.findOne({user: request.user.id })
    .populate('user', ['name','avatar'])
    .then(profile => {
        if(!profile){
            errors_list.noprofile = 'No profile found, create profile for the user.'
            return response.status(404).json(errors_list)
        }
        response.json(profile)
    })
    .catch(error => response.status(404).json(error))
})


router.get('/all',(request,response) => {
    let errors_list = {}

    Profile.find()
    .populate('user', ['name'])
    .then(profile => {
        if(!profile){
            errors_list.noprofile = 'There is no profile'
            return response.status(404).json(errors_list)
        }
        response.json(profile)
    })
    .catch(error => response.status(404).json({profile: 'There is no profile'}))
})



router.get('/handle/:id',(request, response) => {
    let errors = {}

    Profile.findOne({ handle: request.params.id })
    .populate('user', ['name'])
    .then(account => {
        if(!account){
            errors.noprofile = 'There is no profile for this user'
            response.status(404).json(errors)
        }

        response.json(account)
    })
    .catch(error => response.status(404).json(error))
})



router.get('/user/:user_id',(request, response) => {
    let errors = {}

    Profile.findOne({ user: request.params.user_id })
    .populate('user', ['name'])
    .then(account => {
        if(!account){
            errors.noprofile = 'There is no profile for this user';
            response.status(404).json(errors)
        }

        response.json(account)
    })
    .catch(error => response.status(404).json(error))
})



router.post('/', passport.authenticate('jwt', {session: false}), (request,response) => {

    let bioData = {}
    bioData.user = request.user.id
    if(request.body.githubusername) bioData.githubusername = request.body.githubusername
    if(request.body.website) bioData.website = request.body.website
    if(request.body.handle) bioData.handle = request.body.handle
    if(request.body.bio) bioData.bio = request.body.bio
    if(request.body.company) bioData.company = request.body.company
    if(request.body.status) bioData.status = request.body.status
    if(request.body.location) bioData.location = request.body.location
    

    if(typeof request.body.skills !=='undefined'){
        bioData.skills = request.body.skills.split(',')
    }


    bioData.social = {}
    if(request.body.facebook) bioData.social.facebook = request.body.facebook
    if(request.body.instagram) bioData.social.instagram = request.body.instagram
    if(request.body.linkedin) bioData.social.linkedin = request.body.linkedin
    if(request.body.twitter) bioData.social.twitter = request.body.twitter
    if(request.body.youtube) bioData.social.youtube = request.body.youtube


    Profile.findOne({ user: request.user.id })
    .then(account => {
        if(account){
            Profile.findOneAndUpdate({ user: request.user.id }, { $set: bioData }, {new: true})
            .then(account => response.json(account))
        } else {
            Profile.findOne({handle: bioData.handle}).then(account => {
                if(account){
                    errors.handle = "this handle is present inside already";
                    response.status(400).json(errors)
                }

                new Profile(bioData).save().then(account => response.json(account))
            })
        }
    })
})


router.post('/education', passport.authenticate('jwt', {session: false}), (request, response) => {
    Profile.findOne({ user: request.user.id})
    .then(account => {
        let education = {
            fieldofstudy: request.body.fieldofstudy,
            school: request.body.school,
            description: request.body.description,
            to: request.body.to,
            from: request.body.from,
            current: request.body.current,
            degree: request.body.degree
        }

        account.education.unshift(education)

        account.save().then(account => response.json(account))
    })
})



router.post('/experience',passport.authenticate('jwt', {session: false}), (request, response) => {
    Profile.findOne({ user: request.user.id})
    .then(account => {
        let experienceNew = {
            current: request.body.current,
            title: request.body.title,
            from: request.body.from,
            company: request.body.company,
            location: request.body.location,
            to: request.body.to,
            description: request.body.description
        }

        account.experience.unshift(experienceNew)

        account.save().then(account => response.json(account))
    })
})




router.delete('/',passport.authenticate('jwt', {session: false}), (request, response) => {

    Profile.findOneAndRemove({user: request.user.id})
    .then(() => {
        User.findOneAndRemove({ _id: request.user.id})
        .then(() => response.json({ success: true }))
    })
})



router.delete('/experience/:exp_id',passport.authenticate('jwt', {session: false}), (request, response) => {

    Profile.findOne({ user: request.user.id})
    .then(account => {

        let IndexDelete = account.experience
        .map(element => element.id)
        .indexOf(request.params.exp_id);

        account.experience.splice(IndexDelete, 1)

        account.save().then(account => response.json(account))
    })
    .catch(error => response.status(404).json(error))
})



router.delete('/education/:education_id',passport.authenticate('jwt', {session: false}), (request, response) => {

    Profile.findOne({ user: request.user.id})
    .then(account => {
        let IndexDelete = account.education
        .map(element => element.id)
        .indexOf(request.params.education_id);

        account.education.splice(IndexDelete, 1)

        account.save().then(account => response.json(account))
    })
    .catch(error => response.status(404).json(error))
})



module.exports = router