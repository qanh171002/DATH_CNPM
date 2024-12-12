import { StatusCodes } from 'http-status-codes';
import { AuthModel } from '~/models/AuthModel';
import { OAuth2Client } from 'google-auth-library';
import { env } from '~/config/env';
import { getOne, insertSingleRow, insertSingleRowAndGetResult } from '~/database/query';
import { v4 as uuidv4 } from 'uuid';
import { generateAccessJWT } from '~/utilities/generateAccessToken';
import { CartModel } from '~/models/CartModel';

const createUser = async (req, res) => {
  try {
    const result = await AuthModel.createUser(req.body);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.BAD_GATEWAY).json({ status: false, error: err });
  }
};

const logout = async (req, res) => {
  try {
    const result = await AuthModel.logout(req, res);

    if (result) {
      return res.status(StatusCodes.OK).json({ message: 'Logged out' });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Fail to' });

  } catch (err) {
    return res.status(StatusCodes.BAD_GATEWAY).json({ status: false, error: err });
  };
};

const login = async (req, res) => {
  try {
    const result = await AuthModel.login(req.body, res);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.BAD_GATEWAY).json({ status: false, error: err });
  };
};

const verifyToken = async (token, client, clientID) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientID
  });

  const payload = ticket.getPayload();

  return payload;
};

const loginByGoogle = async (req, res) => {
  const { token } = req.body;
  const clientID = env.GG_CLIENT_ID;
  const clientSecret = env.GG_CLIENT_SECRET;

  const client = new OAuth2Client(clientID, clientSecret, 'postmessage');
  const payload = await verifyToken(token, client, clientID);

  const { email, name } = payload;
  let user = await getOne('users', 'email', email);

  if (user.length === 0) {
    const id = uuidv4();
    user = await insertSingleRowAndGetResult('users', { id: id, email: email, name: name, role: 'BUYER' });
    await insertSingleRow('buyers', { user_id: id });
    await CartModel.createCart(id);
  }

  let options = {
    maxAge: 180 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  };

  const loginToken = generateAccessJWT(user[0].id);

  res.cookie('SessionID', loginToken, options);

  return res.status(200).json({
    status: true,
    role: user[0].role,
    token: loginToken,
    message: 'You have successfully logged in.'
  });
};

export const AuthController = {
  createUser,
  login,
  logout,
  loginByGoogle
};
