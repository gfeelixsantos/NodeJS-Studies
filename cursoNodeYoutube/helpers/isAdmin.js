module.exports = {
    isAdmin: function(req,res,next){

        if (req.isAuthenticated() && req.user.idAdmin == 1){
            return next()
        }

        req.flash('error_msg', 'Você deve administrador para acessar.')
        res.redirect('/')
    }
}