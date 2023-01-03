import Api from '../api/Api';

const lookupUrl = `${process.env.GATEWAY_URL}/lookup`;

const sendAcknowledgement = (res) => {
  res.send({
    message: {
      ack: {
        status: 'ACK',
      },
    },
  });
};

const sendErrorWithAuthorization = (res) => {
  res.status(401).send('Error');
};

const getPublicKey = async (typeValue) => {
  const request = JSON.stringify({
    type: typeValue,
  });

  const response = await Api.doPost(lookupUrl, request);
  const responseJson = await response.json();
  return responseJson[0].signing_public_key;
};

export default {
  sendErrorWithAuthorization,
  sendAcknowledgement,
  getPublicKey,
};
