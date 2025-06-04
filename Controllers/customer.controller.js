const { poolPromise } = require('../Config/mydb');

exports.getAllCustomers = async (req, res) => {
  try {
    const [rows] = await poolPromise.query('SELECT * FROM customer_list');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching customers' });
  }
};