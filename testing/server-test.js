var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
const database = require('../database')
var should = chai.should();

chai.use(chaiHttp);

// running this test requires additional setup changes to various files
// including changing ports and relative file directories (ex. views->../views in express.js)
describe('Sign Up', (done) => {
    // tests associated with Users
    it('should add a single user on POST request for /newuser', function(done){
        chai.request(server).post('/newuser')
            .send({
                
                    uname: 'chaiTester@bgcengineering.ca',
                    pwd: 'Password123!'
                
            })
            .end((err,res) => {
                database.query("SELECT * FROM users WHERE email='chaiTester@bgcengineering.ca'", (errOutDB, dbRes) => {
                    dbRes.rows[0].email.should.equal('chaiTester@bgcengineering.ca');
                    dbRes.rows[0].role.should.equal('attendee');
                    // password will be hashed and should not equal Password123!
                });
                done();
            });
    });
});

describe('New Course', (done) => {
    it('should add a single course on POST request for /newcourse', function(done){
        chai.request(server).post('/newcourse')
            .send({
                
                    coursename: 'Leadership',
                    topic: 'Leading',
                    location: 'London',
                    startdate: '2020-10-11',
                    starttime: '17:00:00',
                    enddate: '2020-10-11',
                    endtime: '17:30:00',
                    capacity: 100,
                    description: 'A course about leading'

                
            })
            .end((err,res) => {
                database.query("SELECT * FROM courses WHERE course_name='Leadership'", (errOutDB, dbRes) => {
                    dbRes.rows[0].course_name.should.equal('Leadership');
                    dbRes.rows[0].topic.should.equal('Leading');
                    dbRes.rows[0].location.should.equal('London');
                    dbRes.rows[0].start_date.should.equal('2020-10-11 17:00:00');
                    dbRes.rows[0].end_date.should.equal('2020-10-11 17:30:00');
                    dbRes.rows[0].seat_capacity.should.equal(100);
                    dbRes.rows[0].description.should.equal('A course about leading');
                });
                done();
            });
    });
});