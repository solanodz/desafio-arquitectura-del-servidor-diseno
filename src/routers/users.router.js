import { Router } from 'express';
import UserController from '../controllers/users.controller.js';
import passport from 'passport';

const router = Router();

router.get('/users', async (req, res, next) => {
    try {
        const users = await UserController.get(req.query)
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/users/:uid', async (req, res, next) => {
    try {
        const { params: { uid } } = req;
        const user = await UserController.getById(uid)
        if (!user) {
            return res.status(401).json({ message: `No se encontro el usuario con ID ${uid}` });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), (req, res) => {
    res.redirect('/sessions/login')
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
    const { email } = req.user; // Utilizando req.user después de autenticar

    // Consultando la base de datos para obtener el usuario
    const user = await UserModel.findOne({ email });

    // Almacenando el rol en req.session.user
    req.session.user = { email, role: user.role };

    if (user.role === 'usuario') {
        res.redirect('/products');
    } else if (user.role === 'admin') {
        console.log('Inicio de sesión exitoso. Redirigiendo a /profile');
        return res.redirect('/profile');
    } else {
        // Otro caso, puedes manejarlo según tus necesidades
        res.status(403).json({ message: 'Acceso no autorizado.' });
    }
});


router.put('/users/:uid', async (req, res, next) => {
    try {
        const { body, params: { uid } } = req;
        await UserController.updateById(uid, body)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.delete('/users/:uid', async (req, res, next) => {
    try {
        const { params: { uid } } = req;
        await UserController.deleteById(uid)
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

export default router;