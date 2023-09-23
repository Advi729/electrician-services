const asyncHandler = require('express-async-handler');
const electricianHelpers = require('../helpers/electrician-helper');

// Electrician sign up
const electricianSignUp = asyncHandler(async(req, res) => {
    try {
        const electrician = await electricianHelpers.addElectrician(req.body);
        if (electrician) {
            res.json({status: true});
            console.log(electrician, 'electriciansrrsignup');
            // res.json(electrician);
        }
    } catch (error) {
        console.error(error);
    }
});

// Electrician log in 
const electricianLogIn = asyncHandler(async(req, res) => {
    try {
        const electrician = await electricianHelpers.findElectrician(req.body);
        if (electrician) {
            res.json({status: true, electrician});
        }
    } catch (error) {
        console.error('error in login controller: ', error);
    }
});

// list of all approved electricians in user side
const electriciansListUser = asyncHandler(async (req, res) => {
    try {
        const electricians = await electricianHelpers.findAllElectricians();
        if(electricians) {
            const approvedElectricians = electricians.filter(electrician => electrician.isApproved === true);
            res.json({approvedElectricians});
        }
    } catch (error) {
        console.error('error in electrslist ctrlller: ', error);
    }
});

// list of all electricians in admin side
const electriciansList = asyncHandler(async (req, res) => {
    try {
        const electricians = await electricianHelpers.findAllElectricians();
        if(electricians) {
            res.json({electricians});
        }
    } catch (error) {
        console.error('error in eleclist ctrlller: ', error);
    }
});

// delete an electrician 
const deleteElectrician = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const deletedElectrician = await electricianHelpers.deleteTheElectrician(id);
        if (deletedElectrician) {
            res.json('electrician deleted.');
        }
    } catch (error) {
        console.error('error in deletesuer controler: ', error);
    }
});

// Approve an electrician
const approveElectrician = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const approvedElectrician = await electricianHelpers.approveTheElectrician(id);
        if(approvedElectrician) {
            res.json('electrician approved.');
        }
    } catch (error) {
        console.error('error in approve controller');
    }
});

// Disapprove an electrician
const disapproveElectrician = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const disapprovedElectrician = await electricianHelpers.disapproveTheElectrician(id);
        if(disapprovedElectrician) {
            res.json('electrician disapproved.');
        }
    } catch (error) {
        console.error('error in disapprove controller');
    }
});

// details of single electrician
const electricianDetails = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const electrician = await electricianHelpers.singleElectrician(id);
        // console.log('in electricianctrl:', electrician);
        if(electrician) {
            res.json({electrician});
        }
    } catch (error) {
        console.error('error in electdetails ctrlller: ', error);
    }
});

// upload certificate of electrician
const electricianCertificate = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        // Access the uploaded file using req.file
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }

      const savedToDb = await electricianHelpers.uploadCertificateToDb(req.file, id);
     if (savedToDb) {
      res.status(200).json({ message: 'File uploaded successfully.', filename: req.file.filename});
     }
    } catch (error) {
        console.error('error in elecCertificate', error);
    }
})

// upload certificate of electrician
const electricianProfilePhoto = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        // Access the uploaded file using req.file
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }

      const savedToDb = await electricianHelpers.uploadProfilePhotoToDb(req.file, id);
     if (savedToDb) {
      res.status(200).json({ message: 'File uploaded successfully.', filename: req.file.filename});
     }
    } catch (error) {
        console.error('error in elecCertificate', error);
    }
})

module.exports = { 
    electricianLogIn, 
    electricianSignUp, 
    electriciansList, 
    electriciansListUser, 
    deleteElectrician, 
    approveElectrician,
    disapproveElectrician,
    electricianDetails,
    electricianCertificate,
    electricianProfilePhoto
};