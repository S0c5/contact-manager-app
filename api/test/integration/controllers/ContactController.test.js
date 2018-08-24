import path from 'path';

describe('Endpoints:Contact', () => {
  let contact = {
    name: 'david barinas',
    phone: '+573123488123',
    email: 'd@barinas.com',
  };

  describe('#Create - POST /contacts', () => {
    it('when i send invalid information it should return a 400 with a list of errors', () => {
      return request
        .post('/contacts')
        .send({
          name: 'a',
          phone: 'no_valid_phone_asdjasklda',
          email: 'invalid_email'
        })
        .expect(400)
        .then(res => res.body)
        .then(body => {
          body.error.code.should.equal(400);
          body.error.message.should.be.equal('validation failed');
          body.error.details.length.should.be.above(0);
        });
    });

    it('When I send a valid information it should create the contact and return the contact created', () => {
      return request
        .post('/contacts')
        .send(contact)
        .expect(200)
        .then(res => res.body)
        .then(body => {
          body.name.should.be.equal(contact.name);
          body.email.should.be.equal(contact.email);
          body.phone.should.be.equal(contact.phone);
          body.profileImage.should.be.equal(null);
          contact = body;
        });
    });
  });

  describe('#UploadImage - PUT /contacts/:id/image', () => {
    it('when I try to upload a invalid format type it should thows an exception', () => {
      return request
        .put(`/contacts/${contact.id}`)
        .attach('image', path.resolve(`${__dirname}/../../fixtures/non-image.txt`))
        .expect(400)
        .then(res => res.body)
        .then(body => {
          body.error.code.should.equal(400);
          body.error.message.should.equal('invalid format');
        });
    });

    it('when I upload a valid image it should upload it to s3 and patch and retrieve me the contact', () => {
      return request
        .put(`/contacts/${contact.id}`)
        .attach('image', path.resolve(`${__dirname}/../../fixtures/avatar.jpg`))
        .expect(200)
        .then(res => res.body)
        .then(body => {
          body.name.should.be.equal(contact.name);
          body.email.should.be.equal(contact.email);
          body.phone.should.be.equal(contact.phone);
          body.profileImage.should.match(/http/);
        });
    });
  });

  describe('#Read - GET /contacts/:id ', () => {
    it('when I try to read a contact that doesnt exists it should return 400 error code', () => {
      return request
        .get('/contacts/batman')
        .expect(400);
    });

    it('I can retrieve a contact info with by the id', () => {
      return request
        .get(`/contacts/${contact.id}`)
        .expect(200)
        .then(res => res.body)
        .then(body => {
          body.name.should.be.equal(contact.name);
          body.email.should.be.equal(contact.email);
          body.phone.should.be.equal(contact.phone);
          body.profileImage.should.match(/http/);
        });
    });
  });

  describe('#list - GET /contacts', () => {
    it('I can filter the contacts passing a query in a url', () => {
      return request
        .get(`/contacts?name=${contact.name}`)
        .expect(200)
        .then(res => res.body)
        .then(body => {
          body.length.should.be.above(0);
          body[0].name.should.be.equal(contact.name);
          body[0].email.should.be.equal(contact.email);
          body[0].phone.should.be.equal(contact.phone);
          body[0].profileImage.should.match(/http/);
        });
    });

    it('I should return an empty Array if I try to query a contact that doesnt exist', () => {
      return request
        .get(`/contacts?name=is batman nananana`)
        .expect(200)
        .then(res => res.body)
        .then(body => {
          body.length.should.be.equal(0);
        });
    });
  });
});
