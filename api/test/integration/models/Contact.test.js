describe('Model:Contact', () => {
  let contact;

  before(async () => {

  });

  it('#create', async () => {
    contact = await Contact.createOne({
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
});
