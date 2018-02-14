
module.exports = function(chai, request) {
  return new Promise((resolve, reject) => {
    describe('API Auth Login /auth/login', function () {
      this.timeout(5000);
    
      it('Returns JWT Token', () => request
          .post('/api/auth/login')
          .send({ email: 'organizer@tournkey.ca', password: 'password' })
          .then((res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.json;
            chai.expect(res.body).to.be.an('object');
            resolve(res.body.token);
          })
        );
    });
  })
}



