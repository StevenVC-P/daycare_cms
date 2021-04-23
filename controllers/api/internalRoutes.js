const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Parent, Child, ParentChild, Billing, User} = require('../../models');



// Get All Families Parents and Children RENDER DASHBOARD
router.get('/', withAuth,  async (req, res) => {
    
    try {
        const familyData = await Child.findAll({
            include: [
                {
                    model: Parent,
                    attributes: ['firstName', 'lastName'],
                    as: 'parents'
                }, 
                
            ],
        });
        //REMOVE AFTER HANDLEBAR PAGE IS CREATED
       // console.log(familyData);
        //res.status(200).json(familyData)

        const family = familyData.map((fam) => fam.get({plain: true}));
        console.log(family)
        res.render('dashboard', {
            family,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/families', withAuth, async (req, res) => {
    try {
        res.render('families', {
           
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Get Family by ID
router.get('/:id', withAuth, async (req, res) => {
    try {
        const familyData = await Child.findByPk( req.params.id, {
            include: [
                {
                    model: Parent,
                    attributes: ['firstName', 'lastName'],
                    as: 'parents'
                }, 
            ],
        });
        //REMOVE AFTER HANDLEBAR PAGE IS CREATED
        console.log(familyData);
        res.status(200).json(familyData)
        // const family = familyData.get({plain: true});

        // res.render('families', {
        //     ...family,
        //     logged_in: req.session.logged_in
        // });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Add Child
router.post('/child', withAuth,  async (req, res) => {
    console.log(req.body);
    try {
        const newChild = await Child.create(req.body);

        res.status(200).json(newChild);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update Child
router.put('/child/:id', withAuth, async (req, res) => {
    try {
        const childData = await Child.update( req.body, {
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json(childData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete Child
router.delete('/child/:id', withAuth, async (req, res) => {
    try {
        const childData = await Child.destroy({
            where: {
                id: req.params.id,
            },
        });
        
        if (!childData) {
            res.status(400).json({ message: 'No Child found with this id'});
            return;
        }

        res.status(200).json(childData);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Add Parent
router.post('/parent', withAuth, async (req, res) => {
    try {
        const newParent = await Parent.create({
            // match to form input fields
            ...req.body,
        });
        res.status(200).json(newParent);
    } catch (err) {
        res.status(400).json(err);
    }
});


// Update Parent
router.put('/parent/:id', withAuth, async (req, res) => {
    try {
        const parentData = await Parent.update( req.body, {
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json(parentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete Parent
router.delete('/parent/:id', withAuth, async (req, res) => {
    try {
        const parentData = await Parent.destroy({
            where: {
                id: req.params.id,
            },
        });
        
        if (!parentData) {
            res.status(400).json({ message: 'No Parent found with this id'});
            return;
        }

        res.status(200).json(parentData);
    } catch (err) {
        res.status(500).json(err);
    }
});








module.exports = router;