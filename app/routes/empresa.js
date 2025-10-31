const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const fs = require('fs');
const { validationSets, handleValidationErrors, renderWithErrors } = require('../validations/validations');

router.get('/empresa', function (req, res) {
    res.render('pages/empresa');
});

let empdatapro = require("../data/EmpresaProfile")

router.get("/perfilempresa", (req, res)=>{
    res.render("pages/perfilempresa", {empresa : empdatapro });
});
router.get("/editprofileempresa", (req, res)=>{
    res.render("pages/editprofileempresa", {empresa : empdatapro });
});

router.post("/editar",
    body("nome").isLengith({min:5, max:35}).withMessage("O nome deve possuir entre 5 a 35 carácteres!"),
    body("descricao").isLength({min:50, max:350}).withMessage("A descrição deve ter entre 50 a 250 caracteres!"),
    body("").isEmail().withMessage('O email deve seguir a estrutura email@origem.com!'),
    body("siteempresa").isURL().withMessage('O url não é valido!'),
    body("instagram").isURL().withMessage('O url não é valido!'),
    body("facebook").isURL().withMessage('O url não é valido!'),
    body("linkedin").isURL().withMessage('O url não é valido!'),
    function(req, res){
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("pages/editprofileempresa", {
        erros: errors.array(),
        empresa: req.body
      });
    }
    empdatapro.nome = req.body.nome;
    empdatapro.descricao = req.body.descricao;
    empdatapro.emailempresa = req.body.emailempresa;
    empdatapro.siteempresa = req.body.siteempresa;
    empdatapro.type = req.body.type;
    empdatapro.area = req.body.area;
    empdatapro.redesSociais.instagram = req.body.instagram;
    empdatapro.redesSociais.facebook = req.body.facebook;
    empdatapro.redesSociais.linkedin = req.body.linkedin;

    res.redirect("/empresa/perfilempresa");
  }
)

module.exports = empresaRouter;