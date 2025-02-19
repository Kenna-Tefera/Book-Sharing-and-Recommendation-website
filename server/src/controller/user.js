const express = require('express');
const app = express();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Group = require('../model/group');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const Signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const isUserExist = await User.findOne({ email: email });
    if (isUserExist) return res.status(400).json('user already exist');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ email, fullname, password: hashedPassword });
    if (!newUser) return res.status(400).json('failed to create new user');
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, 'book', { expiresIn: '30d' });
    res.status(200).json({ msg: 'registered', newUser, token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json('user not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json('email or password not correct');
    const token = jwt.sign({ id: user._id, email: user.email }, 'book', { expiresIn: '30d' });
    res.json({
      msg: 'loggedIn',
      token,
      user: {
        id: user._id,
        name: user.fullname,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('follower').populate('following').populate('group');
    if (!users) return res.status(400).json('failed to fetch');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('follower').populate('following').populate('group', 'name username');
    if (!user) return res.status(400).json('failed to fetch');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const UpdateProfile = async (req, res) => {
  try {
    const inputs = req.body;
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(400).json('user with this id not found');
    const updatedUser = await User.findByIdAndUpdate(userId, inputs, { new: true });
    if (!updatedUser) return res.status(400).json('failed to update user');
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const DeleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(400).json('user with this id not found');
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(400).json('failed to delete');
    res.status(200).json({ msg: 'this user deleted successfully', deletedUser });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json('email not found');
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    const link = `http://localhost:3000/reset/${token}`;
    const message = `<p> Please click this link to reset your password 
        <a href=${link}>${link}</a>
        </p>`;
    await sendEmail(user.email, 'Password Reset', message);
    res.status(201).json('please check your email to reset password');
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const requireResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('email not found');

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: { user: 'mihlet2@gmail.com', pass: 'zwbc wwyj otox jkvj' },
    });
    const mailOptions = {
      to: user.email,
      from: 'book recommendation app',
      subject: 'Password Reset',
      text: `Please click on the following link to reset your password: http://localhost:5173/reset/${token}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) return res.status(400).send(err);
      res.send('reset link sent');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).send('token invalid or expired');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).send('Password updated');
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const Follow = async (req, res) => {
  try {
    const { userId } = req.params;
    const newFollower = req.userId;
    const user = await User.findById(userId);
    const theFollower = await User.findById(newFollower);

    if (!user) return res.status(400).json('user to follow with this id not found');
    if (!theFollower) return res.status(400).json('this follower with this id not found');
    if (newFollower === userId) res.status(400).json('cant follow yourself');
    if (user.follower.includes(newFollower)) return res.status(400).json('User already follow');

    user.follower.push(newFollower);
    theFollower.following.push(userId);

    await user.save();
    await theFollower.save();

    res.status(200).json({ msg: 'followed', user, theFollower });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const UnFollow = async (req, res) => {
  try {
    const unfollowerId = req.userId;
    const userIdToUnfollow = req.params.userId;

    const unfollower = await User.findById(unfollowerId);
    const userToUnfollow = await User.findById(userIdToUnfollow);

    if (!unfollower) return res.status(400).json('unfollower with this id not found');
    if (!userToUnfollow) return res.status(400).json('this user with this id not found');

    if (userToUnfollow.follower.includes(unfollowerId)) {
      userToUnfollow.follower = userToUnfollow.follower.filter((e) => e.toString() !== unfollowerId);
      unfollower.following = unfollower.following.filter((e) => e.toString() !== userIdToUnfollow);

      await userToUnfollow.save();
      await unfollower.save();
      res.status(200).json(userToUnfollow);
    } else {
      res.status(400).json('the unfollower id not in list of followers');
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { Signup, Login, UpdateProfile, DeleteProfile, getAllUsers, getOneUser, requireResetPassword, resetPassword, Follow, UnFollow };

