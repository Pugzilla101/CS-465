
const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const travel = async function(req, res) {
    try {
        const response = await fetch(tripsEndpoint, options);

        if (!response.ok) {
            throw new Error(`API returned status ${response.status}`);
        }

        const json = await response.json();

        let message = null;

        if (!(json instanceof Array)) {
            message = 'API lookup result is not an array';
        } else if (!json.length) {
            message = 'No trips exist in our database!';
        }

        res.render('travel', {
            title: 'Travlr Getaways',
            trips: json,
            message
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    travel
};
