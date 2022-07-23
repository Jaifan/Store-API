const notfound = (req,res) => {
    res.status(500).send('Route is not exist!');
}

module.exports = notfound;