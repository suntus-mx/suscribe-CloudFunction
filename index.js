const functions = require('@google-cloud/functions-framework');
const connection = require('./database.js');
const { saveProspect, getQuestionsbyUserType } = require('./database.helpers.js');

functions.http('subscribe', async (req, res) => {
    
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {

        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', ['authorization', 'content-type']);
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send({});
    
    } else {        
        try {
            const prospectSaved = await saveProspect(
                req.body
            );

            const questions = await getQuestionsbyUserType(
                req.body.userTypeId
            );

            res.status(200).json({
                message: 'Prospect saved successfully',
                data: {
                    linkToken: '',
                    prospect: prospectSaved,
                    questions: questions
                },
            });

        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
            
        }
    };
    
});
