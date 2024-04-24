const mongoose = require('mongoose');

async function connect()
{
    try{
        await mongoose.connect('mongodb://localhost:27017/test_dev', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
        console.log("Success")
    }
    catch (error)
    {
        console.log("Fail")
    }
}
// mongoose.connect('mongodb://localhost:27017/ten-cua-csdl', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// mongoose.connection.on('connected', () => {
//     console.log('Kết nối với MongoDB thành công');
// });

// mongoose.connection.on('error', (err) => {
//     console.error('Lỗi kết nối với MongoDB: ', err);
// });

module.exports = {connect};

