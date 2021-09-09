// app.js
const express = require('express');
var body_parser = require('body-parser');
const mercadopago = require("mercadopago");
const app = express();

const port = process.env.PORT || 3000;

mercadopago.configure({
    access_token: "APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439",
    integrator_id: "dev_24c65fb163bf11ea96500242ac130004"
});

// motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/vistas');

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/assets"));
app.use(express.json());

//Rutas web
app.use('/', require('./router/RutasWeb'));

app.post("/create_preference", (req, res) => {    
    let preference = {
        "items": [
            {
                "id": "1234",
                "title": req.body.description,
                "currency_id": "PEN",
                "picture_url": req.body.pictureurl,
                "description": "Dispositivo móvil de Tienda e-commerce",
                "quantity": Number(req.body.quantity),
                "unit_price": Number(req.body.price)
            }
        ],
        "payer": {
            "name": "Lalo",
            "surname": "Landa",
            "email": "test_user_46542185@testuser.com",
            "phone": {
                "area_code": "11",
                "number": 22223333
            },
            "identification": {
                "type": "DNI",
                "number": "12345678"
            },
            "address": {
                "street_name": "Falsa",
                "street_number": 123,
                "zip_code": "1111"
            }
        },
        "back_urls": {
            "success": "https://examen-mercado.herokuapp.com/aprobado",
            "failure": "https://examen-mercado.herokuapp.com/cancelado",
            "pending": "https://examen-mercado.herokuapp.com/pendiente"
        },
        "auto_return": "approved",
        "payment_methods": {
            "excluded_payment_methods": [
                {
                    "id": "diners"
                }
            ],
            "excluded_payment_types": [
                {
                    "id": "atm"
                }
            ],
            "installments": 6
        },
        "notification_url": "https://webhook.site/860236b8-3934-46c4-9b59-b156ebb04ee7",
        "statement_descriptor": "MINEGOCIO",
        "external_reference": "jorgecm123321@gmail.com",
    };

    console.log(preference);

    mercadopago.preferences.create(preference)
        .then(function (response) {
            console.log("----------------------------------------------");
            console.log("----------------------------------------------");
            console.log("------------------PREFERENCE------------------");
            console.log("----------------------------------------------");
            console.log("----------------------------------------------");
            console.log(response.body.id)
            console.log("----------------------------------------------");
            console.log("----------------------------------------------");
            console.log("----------------------END---------------------");
            console.log("----------------------------------------------");
            console.log("----------------------------------------------");
            res.json({ id: response.body.id })
        }).catch(function (error) {
            console.log(error);
        });
});

app.get('/feedback', function (request, response) {
    response.json({
        Payment: request.query.payment_id,
        Status: request.query.status,
        MerchantOrder: request.query.merchant_order_id
    })
});

/*app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Título del sitio web"
    })
})*/

app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
})