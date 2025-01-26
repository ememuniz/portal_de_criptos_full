var express = require('express');
var router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_TOKEN;
const authMiddleware = require('../middlewares/auth');

router.post('/register', async (req, res) => {
  const { name, password, email, telephone } = req.body;
  const user = new User({ name, password, email, telephone });
  try {
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ e: 'Error registering new user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ e: 'Incorrect email or password' });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (!same) {
          res.status(401).json({ e: 'Incorrect email or password' });
        } else {
          const token = jwt.sign({ email }, secret, { expiresIn: '30d' });
          res.status(200).json({ user: user, token: token });
        }
      });
    }
  } catch (e) {
    res.status(500).json({ e: 'Internal error, please try again' });
  }
});

router.get("/validate", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Token válido!" });
});

router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout realizado com sucesso!" });
});

router.put('/update', authMiddleware, async (req, res) => {
  const { email } = req;
  const { field, value } = req.body;

  try {
    if(!["name","email","telephone"].includes(field)){
      return res.status(400).json({ message: 'O campo informado não pode ser alterado' });
    }

    const updateUser = await User.findOneAndUpdate(
      { email },
      { [field]: value },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Dados atualizados com sucesso' , user: updateUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar os dados', error});
  }
});

router.put('/update/password', authMiddleware, async (req, res) => {
  const { email } = req;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'As senhas devem ser iguais' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    user.password = password;
    await user.save();

    res.status(200).json({message: 'Senha atualizada com sucesso'});
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a senha', error});
  }
});

/*router.put('/update', authMiddleware, async (req, res) => {
  const { email } = req;
  const { field, value } = req.body;

  try {
    if (field === '_id' || field === '__v'){
      return res.status(400).json({ message: 'O campo _id ou __v nao pode ser alterado' });
    }
    const updateUser = await User.findOneAndUpdate(
      { email },
      { [field]: value },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Dados atualizados com sucesso' , user: updateUser });  

  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar os dados', error});
  }
});*/

router.delete('/delete', authMiddleware, async (req, res) => {
  const { email } = req;

  try {
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuário nao encontrado' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso' });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o usuário', error});
  }
})

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.email }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário nao encontrado' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Erro ao obter os dados do usuário:", error);
    res.status(500).json({e: 'Erro interno do servidor'});
  }
});

module.exports = router;
