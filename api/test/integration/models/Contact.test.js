describe('Model:Contact', () => {
  let contact;

  before(() => cleanDb());

  it('#create', async () => {
    contact = await Contact.createAndRetrieve({
      name: 'david barinas',
      phone: '+573123488123',
      email: 'd@barinas.com',
      profileImage: 'http://hello.com/supercat-image.jpg'
    });

    contact.name.should.be.equal('david barinas');
    contact.phone.should.be.equal('+573123488123');
    contact.email.should.be.equal('d@barinas.com');
    contact.profileImage.should.be.equal('http://hello.com/supercat-image.jpg');
  });

  it('#read', async () => {
    const _contact = await Contact.findById(contact.id);

    _contact.name.should.be.equal(contact.name);
    _contact.phone.should.be.equal(contact.phone);
    _contact.email.should.be.equal(contact.email);
    _contact.profileImage.should.be.equal(contact.profileImage);

  });

  it('#list', async () => {
    const _contacts = await Contact.find({});

    _contacts.length.should.be.equal(1);
    _contacts[0].name.should.be.equal(contact.name);
    _contacts[0].phone.should.be.equal(contact.phone);
    _contacts[0].email.should.be.equal(contact.email);
    _contacts[0].profileImage.should.be.equal(contact.profileImage);
  });

  describe('#findOneAndUpdate', async () => {
    it('should returns null if a contact isnt found', async () => {
      const _contact = await Contact.findOneAndUpdate({ id: 1000 }, { profileImage: 'custom_image' });
      should(_contact).be.equal(null);
    });

    it('it should update a contact if match with the query', async () => {
      const _contact = await Contact.findOneAndUpdate({ id: contact.id }, { profileImage: 'custom_image' });
      _contact.profileImage.should.be.equal('custom_image');
    });
  });
});
