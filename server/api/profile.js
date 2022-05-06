const express = require('express')
const router = express.Router()
const mongoose  = require('mongoose')
const passport  = require('passport')

const Profile = require('../models/Profile')
const User = require('../models/Users')

const validateProfileInput = require('../custom_validator/profile')
const validateExperienceInput = require('../custom_validator/experience')
const validateEducationInput = require('../custom_validator/education')


router.get('/test', (req, res) => {
    res.send('profile test')
})

router.get('/',passport.authenticate('jwt',{session: false}),(req,res) => {
    const errors = {};

    Profile.findOne({user: req.user.id })
    .populate('user', ['name','avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'No profile found, create profile for the user.'
            return res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

//get all profiles
router.get('/all',(req,res) => {
    const errors = {};

    Profile.find()
    .populate('user', ['name'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile'
            return res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json({profile: 'There is no profile'}))
})


//get rout by handle
router.get('/handle/:id',(req, res) => {
    const errors = {}

    Profile.findOne({ handle: req.params.id })
    .populate('user', ['name'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors)
        }

        res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})



//get router by id
router.get('/user/:user_id',(req, res) => {
    const errors = {}

    Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors)
        }

        res.json(profile)
    })
    .catch(err => res.status(404).json({profile: 'there is no profile for this user'}))
})


//create user profile
router.post('/',passport.authenticate('jwt', {session: false}),(req,res) => {

    const { errors, isValid } = validateProfileInput(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    const profileFields = {}
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle
    if(req.body.company) profileFields.company = req.body.company
    if(req.body.website) profileFields.website = req.body.website
    if(req.body.location) profileFields.location = req.body.location
    if(req.body.bio) profileFields.bio = req.body.bio
    if(req.body.status) profileFields.status = req.body.status
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername
    
    // skills split with ,
    if(typeof req.body.skills !=='undefined'){
        profileFields.skills = req.body.skills.split(',')
    }

    //social 
    profileFields.social = {}
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        if(profile){
            Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, {new: true})
            .then(profile => res.json(profile))
        } else {
            Profile.findOne({handle: profileFields.handle}).then(profile => {
                if(profile){
                    errors.handle = "that handle already exists";
                    res.status(400).json(errors)
                }

                new Profile(profileFields).save().then(profile => res.json(profile))
            })
        }
    })

})

router.post('/experience',passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    Profile.findOne({ user: req.user.id})
    .then(profile => {
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }

        profile.experience.unshift(newExp)

        profile.save().then(profile => res.json(profile))
    })
})


router.post('/education',passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    Profile.findOne({ user: req.user.id})
    .then(profile => {
        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }

        profile.education.unshift(newEdu)

        profile.save().then(profile => res.json(profile))
    })
})


//delete request experience
router.delete('/experience/:exp_id',passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOne({ user: req.user.id})
    .then(profile => {
        //get remove index
        const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1)

        profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json(err))
})


//delete request education
router.delete('/education/:education_id',passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOne({ user: req.user.id})
    .then(profile => {
        //get remove index
        const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.education_id);

        profile.education.splice(removeIndex, 1)

        profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json(err))
})



//delete profile
router.delete('/',passport.authenticate('jwt', {session: false}), (req, res) => {

    Profile.findOneAndRemove({user: req.user.id})
    .then(() => {
        User.findOneAndRemove({ _id: req.user.id})
        .then(() => res.json({ success: true }))
    })
})
module.exports = router