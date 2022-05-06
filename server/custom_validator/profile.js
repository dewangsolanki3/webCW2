const Validator = require('validator')
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(value){
    let errors = {}

    value.handle = !isEmpty(value.handle) ? value.handle: '';
    value.status = !isEmpty(value.status) ? value.status: '';
    value.skills = !isEmpty(value.skills) ? value.skills: '';

    if(!Validator.isLength(value.handle, { min: 2, max: 40 })){
        errors.handle = 'Handle needs to be between 2 to 4 character';
    }

    if(Validator.isEmpty(value.handle)){
        errors.handle = 'Field is required';
    }

    if(Validator.isEmpty(value.status)){
        errors.status = 'Field is required';
    }

    if(Validator.isEmpty(value.skills)){
        errors.skills = 'Field is required';
    }

    if(!isEmpty(value.website)){
        if(!Validator.isURL(value.website)){
            errors.website = 'Not a valid URL'
        }
    }

    if(!isEmpty(value.youtube)){
        if(!Validator.isURL(value.youtube)){
            errors.youtube = 'Not a valid URL'
        }
    }
    
    if(!isEmpty(value.twitter)){
        if(!Validator.isURL(value.twitter)){
            errors.twitter = 'Not a valid URL'
        }
    }
    
    if(!isEmpty(value.facebook)){
        if(!Validator.isURL(value.facebook)){
            errors.facebook = 'Not a valid URL'
        }
    }
    
    if(!isEmpty(value.linkedin)){
        if(!Validator.isURL(value.linkedin)){
            errors.linkedin = 'Not a valid URL'
        }
    }
    
    if(!isEmpty(value.instagram)){
        if(!Validator.isURL(value.instagram)){
            errors.instagram = 'Not a valid URL'
        }
    }




    return {
        errors,
        isValid: isEmpty(errors)
    }
}