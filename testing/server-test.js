var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chair.use(chaiHttp);

// describe('Users', function() {
//     // tests associated with Users
//     it('should add a single user on POST request for /newuser', function(done){
//         chai.request(server).post('/newuser').send({})
//             .end((err,res) => {
//                 done();
//             });
//     });
// });