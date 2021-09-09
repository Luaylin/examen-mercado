const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // console.log(__dirname)
    res.render("index")
})

router.post('/producto', (req, res) => {
    res.render("producto",{imagen: req.body.producto.img,
    titulo: req.body.producto.title,
    precio: req.body.producto.price,
    cantidad: Number(req.body.producto.unit)})
})

router.post('/notifications', (req, res) => {
    console.log("----------------------------------------------");
    console.log("----------------------------------------------");
    console.log("--------------------WEBHOOKS------------------");
    console.log("----------------------------------------------");
    console.log("----------------------------------------------");
    console.log(req.body);
    console.log("----------------------------------------------");
    console.log("----------------------------------------------");
    console.log("----------------------END---------------------");
    console.log("----------------------------------------------");
    console.log("----------------------------------------------");
})

router.get('/aprobado', (req, res) =>{
    res.render("aprobada",{idpago: req.query.payment_id,
    referex: req.query.external_reference,
    tipopago: req.query.payment_type
    });
})

router.get('/cancelado', (req, res) =>{
    res.render("rechazada",{idpago: req.query.payment_id,
        referex: req.query.external_reference,
        tipopago: req.query.payment_type
        });
})

router.get('/pendiente', (req, res) =>{
    res.render("incompleta",{idpago: req.query.payment_id,
        referex: req.query.external_reference,
        tipopago: req.query.payment_type
        });
})

module.exports = router;