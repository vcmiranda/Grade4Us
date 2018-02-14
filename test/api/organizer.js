module.exports = function(chai, request, token) {
  describe('API Organizer /api/organizer/', function () {
    this.timeout(5000);
  
    it('GET /api/organizer/id/tournament', () => request
        .get('/api/organizer/1/tournament/')
        .set('Authorization', token)
        .then((res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res).to.be.json;
          chai.expect(res.body).to.be.an('array');
        })
      );

  it('GET /api/organizer/id/tournament/id/', () => request
    .get('/api/organizer/1/tournament/1/')
    .set('Authorization', token)
    .then((res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res).to.be.json;
      chai.expect(res.body).to.be.an('object');
    }));
  
  it('GET /api/organizer/id/tournament/id/?detail=true', () => request
    .get('/api/organizer/1/tournament/1/?detail=true')
    .set('Authorization', token)
    .then((res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res).to.be.json;
      chai.expect(res.body).to.be.an('object');
      chai.expect(res.body.tournament).to.be.an('object');
      chai.expect(res.body.divisions).to.be.an('array');
      chai.expect(res.body.pools).to.be.an('array');
      chai.expect(res.body.teamslots).to.be.an('array');
      chai.expect(res.body.registrations).to.be.an('array');
      chai.expect(res.body.matches).to.be.an('array');
    }));
  
  it('POST /api/organizer/id/tournament/', () => request
    .post('/api/organizer/1/tournament/')
    .set('Authorization', token)
    .send({
      'tournament_name': 'Chai Test Tournament',
      'sport_id': 1,
      'organizer_id': 1,
    })
    .then((res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res).to.be.json;
      chai.expect(res.body).to.be.an('object');
         
      // it('PATCH /api/organizer/id/tournament/id/', () => request
      //   .patch(`/api/organizer/1/tournament/${res.body.tournament_id}/`)
      //   .set('Authorization', token)
      //   .send({
      //     'tournament_name': 'Updated to Chai Test Tournament',
      //   })
      //   .then((res) => {
      //     chai.expect(res).to.have.status(200);
      //   }));
    
      // it('DELETE /api/organizer/id/tournament/id/', () => request
      //   .delete(`/api/organizer/1/tournament/${res.body.tournament_id}/`)
      //   .set('Authorization', token)
      //   .then((res) => {
      //     chai.expect(res).to.have.status(200);
      //     done();
      //   }));
    }));
  });
}