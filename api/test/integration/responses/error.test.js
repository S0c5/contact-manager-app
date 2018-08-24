import responseError from '../../../api/responses/error';

describe('Response:error', () => {
  let WrappedResponse;
  let data = {};
  let res = {
    status: (n) => {
      data.status = n;
      return res;
    },
    json: (r) => {
      data.response = r;
    }
  };
  before(() => {
    WrappedResponse = responseError.bind({
      res
    });
  });

  it('it should return unknow error if no code is passed', () => {
    WrappedResponse({ code: null });
    data.response.error.code.should.be.equal('E_UNKNOW_ERROR');
    data.status.should.be.equal(500);
  });
});
