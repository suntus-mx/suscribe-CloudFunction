const functions = require('@google-cloud/functions-framework');
const connection = require('./database.js');
const testConnection = require('./helpers.js');
const saveProspect = require('./database.helpers.js');

functions.http('suscribe', async (req, res) => {
    
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

            res.status(200).json({
                message: 'Prospect saved successfully',
                data: prospectSaved,
            });

        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
            
        }
    };
    
});
